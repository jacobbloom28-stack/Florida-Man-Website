// scripts/story-agent.mjs
//
// Runs every 2 hours via .github/workflows/story-agents.yml. Does two jobs
// in one Claude API call so both share the same duplicate-detection pass:
//
//   1. Reviews every "pending" entry in app/data/submissions.json (links
//      visitors submitted via /suggest) and decides add/reject.
//   2. Searches the web for a few brand-new real Florida Man stories not
//      already in the archive.
//
// Writes results straight into app/data/stories.ts and
// app/data/submissions.json. Never pushes to main directly — the GitHub
// Action wraps this script's file changes in a pull request so a human
// still looks before anything goes live.

import fs from "node:fs";

const STORIES_PATH = "app/data/stories.ts";
const SUBMISSIONS_PATH = "app/data/submissions.json";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";

function fail(msg) {
  console.error(`[story-agent] ${msg}`);
  setOutput("changes", "false");
  process.exit(1);
}

function setOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  if (value.includes("\n")) {
    const delim = `EOF_${Math.random().toString(36).slice(2)}`;
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}<<${delim}\n${value}\n${delim}\n`);
  } else {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

if (!ANTHROPIC_API_KEY) fail("ANTHROPIC_API_KEY secret is not set — see README for setup.");

let storiesRaw;
let submissions;
try {
  storiesRaw = fs.readFileSync(STORIES_PATH, "utf-8");
  submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_PATH, "utf-8"));
} catch (err) {
  fail(`couldn't read data files: ${err.message}`);
}

// Pull a lightweight index of every existing story (aligned by field order —
// every story has these fields in this order before the optional ones).
const ids = [...storiesRaw.matchAll(/id:\s*"([^"]*)"/g)].map((m) => m[1]);
const titles = [...storiesRaw.matchAll(/title:\s*"([^"]*)"/g)].map((m) => m[1]);
const cities = [...storiesRaw.matchAll(/city:\s*"([^"]*)"/g)].map((m) => m[1]);
const dates = [...storiesRaw.matchAll(/date:\s*"([^"]*)"/g)].map((m) => m[1]);
const urls = [...storiesRaw.matchAll(/sourceUrl:\s*\n?\s*"([^"]*)"/g)].map((m) => m[1]);

const existingStories = ids.map((id, i) => ({
  id,
  title: titles[i],
  city: cities[i],
  date: dates[i],
  sourceUrl: urls[i],
}));
const existingIdSet = new Set(ids);
const existingUrlSet = new Set(urls);

const pending = submissions.filter((s) => s.status === "pending");

if (pending.length === 0) {
  console.log("[story-agent] no pending submissions — still checking for new stories.");
}

const SYSTEM_PROMPT = `You are the automated content-review agent for a "Florida Man of the Day" news site. You run every two hours with two jobs: (1) verify links visitors submitted through the site's suggestion form, and (2) search for brand-new real Florida Man stories to add to the archive.

The site's own published standard: "Every story comes from a real news outlet. Before it makes the cut, we check that it actually happened in Florida, actually happened recently enough to matter, and actually happened the way the headline says." Funny stories are welcome. Fake stories are not.

Be GENEROUS, not strict — accept almost anything that is a real, verifiable news story about a Florida-based incident with some bizarre/funny/absurd/noteworthy quality, even if only mildly funny or fairly minor. Only reject something if:
- you cannot find independent confirmation via web search that it's real, or
- it did not happen in Florida, or
- it is a duplicate of a story already in the archive — same underlying incident, even under a different id, URL, or headline (compare against the existing story list you're given).

If a story involves real injury, serious harm, or a genuinely dark crime with little comedic angle, still ACCEPT it if it's real, Florida-based, and not a duplicate — just set "contentNote" to one short warning sentence instead of rejecting it. Rejection is for unverifiable, non-Florida, or duplicate stories only, not for "too serious."

Score every accepted story honestly on this rubric. Each category is an integer from 0 up to its max, and "score" must equal the exact sum of the six:
- absurdity /25 — how ridiculous or irrational the situation is
- humor /25 — how genuinely funny the incident is
- floridaFactor /20 — how uniquely Florida the story feels
- unexpectedness /15 — how surprising or bizarre the incident or outcome is
- headlineQuality /10 — how strong and entertaining the headline is
- sourceQuality /5 — how well-documented and reliable the source is

Use web_search to verify every submitted URL and every candidate story before deciding — read enough of the actual article content via search results to confirm facts, names, dates, and location. Never invent facts, quotes, dates, sources, or scores. If you can't verify something, reject/skip it rather than guessing.

Write "title" and "description" and "fullStory" in the site's existing voice: short, matter-of-fact, slightly deadpan news-recap style, third person, "Florida Man" or a placeholder like the site's existing headlines. "date" must be the real incident date in "Month D, YYYY" format, matching year/month/day fields split out. "id" must be a new kebab-case slug, short and distinct from every existing id you're given.

Respond with ONLY raw JSON — no markdown code fences, no commentary before or after — in exactly the shape described in the user message.`;

const userContent = `EXISTING STORIES IN THE ARCHIVE (do not duplicate any of these — check by underlying incident, not just by exact URL or id):
${JSON.stringify(existingStories)}

PENDING USER-SUBMITTED LINKS TO REVIEW:
${JSON.stringify(pending.map((p) => ({ id: p.id, url: p.url, note: p.note })))}

TASK 1 — review every pending submission above. For each, verify the link is a real news story about a genuine Florida-based incident, check it isn't a duplicate of an existing story, score it, and decide add or reject.

TASK 2 — search the web and find 2 to 4 BRAND NEW real Florida Man stories from roughly the last week that are not already in the existing archive and were not already covered by the pending submissions above.

Return ONLY this JSON shape:
{
  "submissionResults": [
    {
      "id": "<the submission's id, copied exactly>",
      "decision": "add" | "reject",
      "reason": "<one short sentence explaining the decision>",
      "story": { <Story object, ONLY if decision is "add"> }
    }
  ],
  "newStories": [ { <Story object> } ]
}

Story object shape (all fields required except contentNote, which is optional):
{
  "id": "kebab-case-slug",
  "date": "Month D, YYYY",
  "year": "YYYY",
  "month": "Month",
  "day": "D",
  "city": "City",
  "score": <integer, sum of the six rubric values>,
  "rubric": { "absurdity": n, "humor": n, "floridaFactor": n, "unexpectedness": n, "headlineQuality": n, "sourceQuality": n },
  "title": "...",
  "description": "... (one sentence, matches the site's existing style)",
  "fullStory": "... (one short paragraph, matches the site's existing style)",
  "source": "Outlet name",
  "sourceUrl": "https://...",
  "contentNote": "... (omit this field entirely unless it's genuinely needed)"
}
Do not include a "photo" field — that gets added manually later.`;

async function callClaude() {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
      tools: [{ type: "web_search_20250305", name: "web_search" }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 1000)}`);
  }
  return res.json();
}

let data;
try {
  data = await callClaude();
} catch (err) {
  fail(`Claude API call failed: ${err.message}`);
}

const textBlocks = (data.content || []).filter((b) => b.type === "text");
const finalText = textBlocks.map((b) => b.text).join("\n").trim();

let result;
try {
  const cleaned = finalText.replace(/^```(?:json)?\n?/, "").replace(/```$/, "").trim();
  result = JSON.parse(cleaned);
} catch (err) {
  fail(`couldn't parse Claude's response as JSON: ${err.message}\n--- raw response ---\n${finalText.slice(0, 2000)}`);
}

const submissionResults = Array.isArray(result.submissionResults) ? result.submissionResults : [];
const newStories = Array.isArray(result.newStories) ? result.newStories : [];

function isValidStory(s) {
  return (
    s &&
    typeof s.id === "string" &&
    typeof s.title === "string" &&
    typeof s.sourceUrl === "string" &&
    s.rubric &&
    typeof s.score === "number"
  );
}

function esc(str) {
  return String(str ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function formatStory(s) {
  const r = s.rubric;
  const lines = [
    `    {`,
    `      id: "${esc(s.id)}",`,
    `      date: "${esc(s.date)}",`,
    `      year: "${esc(s.year)}",`,
    `      month: "${esc(s.month)}",`,
    `      day: "${esc(s.day)}",`,
    `      city: "${esc(s.city)}",`,
    `      score: ${s.score},`,
    `      rubric: { absurdity: ${r.absurdity}, humor: ${r.humor}, floridaFactor: ${r.floridaFactor}, unexpectedness: ${r.unexpectedness}, headlineQuality: ${r.headlineQuality}, sourceQuality: ${r.sourceQuality} },`,
    `      title: "${esc(s.title)}",`,
    `      description:`,
    `        "${esc(s.description)}",`,
    `      fullStory:`,
    `        "${esc(s.fullStory)}",`,
    `      source: "${esc(s.source)}",`,
    `      sourceUrl:`,
    `        "${esc(s.sourceUrl)}",`,
  ];
  if (s.contentNote) lines.push(`      contentNote: "${esc(s.contentNote)}",`);
  lines.push(`    },`);
  return lines.join("\n");
}

// Defensive de-dup pass in code, on top of whatever Claude decided — belt
// and suspenders against accidental repeats across runs.
const toAdd = [];
const summaryLines = [];

for (const r of submissionResults) {
  const sub = submissions.find((s) => s.id === r.id);
  if (!sub || sub.status !== "pending") continue;

  if (r.decision === "add" && isValidStory(r.story)) {
    if (existingIdSet.has(r.story.id) || existingUrlSet.has(r.story.sourceUrl)) {
      sub.status = "rejected";
      sub.note = "Rejected: duplicate of an existing story (caught by de-dup check).";
      summaryLines.push(`- Rejected (duplicate): ${sub.url}`);
      continue;
    }
    existingIdSet.add(r.story.id);
    existingUrlSet.add(r.story.sourceUrl);
    toAdd.push(r.story);
    sub.status = "added";
    sub.note = `Added as "${r.story.id}": ${r.reason ?? ""}`.trim();
    summaryLines.push(`- ✅ Added from submission: **${r.story.title}** (${sub.url})`);
  } else {
    sub.status = "rejected";
    sub.note = r.reason ? `Rejected: ${r.reason}` : "Rejected: could not verify.";
    summaryLines.push(`- ❌ Rejected submission: ${sub.url} — ${r.reason ?? "unverified"}`);
  }
}

for (const s of newStories) {
  if (!isValidStory(s)) continue;
  if (existingIdSet.has(s.id) || existingUrlSet.has(s.sourceUrl)) continue;
  existingIdSet.add(s.id);
  existingUrlSet.add(s.sourceUrl);
  toAdd.push(s);
  summaryLines.push(`- 🆕 New story found: **${s.title}** (${s.source})`);
}

let hasChanges = false;

if (toAdd.length > 0) {
  const marker = "export const stories: Story[] = [";
  const idx = storiesRaw.indexOf(marker);
  if (idx === -1) fail(`couldn't find "${marker}" in ${STORIES_PATH} — schema may have changed.`);
  const insertAt = idx + marker.length;
  const block = "\n" + toAdd.map(formatStory).join("\n") + "\n";
  storiesRaw = storiesRaw.slice(0, insertAt) + block + storiesRaw.slice(insertAt);
  fs.writeFileSync(STORIES_PATH, storiesRaw, "utf-8");
  hasChanges = true;
}

if (submissionResults.length > 0) {
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2) + "\n", "utf-8");
  hasChanges = true;
}

if (!hasChanges) {
  console.log("[story-agent] nothing to add this run.");
  setOutput("changes", "false");
  process.exit(0);
}

const summary =
  `Story agent run — ${new Date().toISOString()}\n\n` +
  (summaryLines.length ? summaryLines.join("\n") : "No changes.") +
  `\n\n${toAdd.length} new stor${toAdd.length === 1 ? "y" : "ies"} added, ` +
  `${submissionResults.filter((r) => r.decision === "add").length} from submissions.`;

console.log(summary);
setOutput("changes", "true");
setOutput("summary", summary);
