import { NextResponse } from "next/server";

// Visitors submit story links here. There's no database on this site, so
// submissions are stored the same way everything else is: as a JSON file
// in the git repo (app/data/submissions.json), written via GitHub's
// Contents API. A scheduled agent reads that file every few hours,
// verifies each pending link against the site's normal standard, and
// appends the good ones to app/data/stories.ts — see app/about for the
// verification standard, and the "Story Suggestion Reviewer" scheduled
// task for the automation itself.
//
// Requires a GITHUB_TOKEN env var (fine-grained PAT, "Contents:
// read and write" only, scoped to this one repo) set in the Vercel
// project. Without it, submissions are refused with a 503 rather than
// silently discarded.

export const runtime = "nodejs";

const GITHUB_REPO = process.env.GITHUB_SUGGEST_REPO ?? "jacobbloom28-stack/Florida-Man-Website";
const GITHUB_BRANCH = process.env.GITHUB_SUGGEST_BRANCH ?? "main";
const SUBMISSIONS_PATH = "app/data/submissions.json";
const MAX_URLS_PER_REQUEST = 5;
const MAX_NOTE_LENGTH = 280;
const MAX_PENDING_QUEUE = 500; // guardrail against unbounded spam growth

type Submission = {
  id: string;
  url: string;
  note: string;
  submittedAt: string;
  status: "pending" | "added" | "rejected";
};

function isLikelyNewsUrl(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
  if (raw.length > 500) return false;
  return true;
}

export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("[suggest] GITHUB_TOKEN is not configured");
    return NextResponse.json(
      { error: "Submissions aren't being accepted right now. Try again soon." },
      { status: 503 }
    );
  }

  let body: { urls?: unknown; note?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawUrls = Array.isArray(body.urls) ? body.urls : [];
  const note =
    typeof body.note === "string" ? body.note.trim().slice(0, MAX_NOTE_LENGTH) : "";

  const cleanUrls = Array.from(
    new Set(
      rawUrls
        .filter((u): u is string => typeof u === "string")
        .map((u) => u.trim())
        .filter(Boolean)
    )
  ).filter(isLikelyNewsUrl);

  if (cleanUrls.length === 0) {
    return NextResponse.json(
      { error: "Paste at least one valid story link." },
      { status: 400 }
    );
  }

  const urls = cleanUrls.slice(0, MAX_URLS_PER_REQUEST);

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${SUBMISSIONS_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    // 1. Read the current queue (and its sha, required to update the file).
    let existing: Submission[] = [];
    let sha: string | undefined;

    const getRes = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, { headers });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      const decoded = Buffer.from(data.content, "base64").toString("utf-8");
      try {
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        existing = [];
      }
    } else if (getRes.status !== 404) {
      const errText = await getRes.text();
      console.error("[suggest] GitHub GET failed", getRes.status, errText);
      return NextResponse.json(
        { error: "Couldn't reach the story queue. Try again in a bit." },
        { status: 502 }
      );
    }

    if (existing.length >= MAX_PENDING_QUEUE) {
      return NextResponse.json(
        { error: "The suggestion queue is full right now. Try again later." },
        { status: 429 }
      );
    }

    // Skip links already in the queue (pending or already reviewed).
    const existingUrls = new Set(existing.map((s) => s.url));
    const now = new Date().toISOString();
    const newEntries: Submission[] = urls
      .filter((url) => !existingUrls.has(url))
      .map((url) => ({
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `sub-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        url,
        note,
        submittedAt: now,
        status: "pending",
      }));

    if (newEntries.length === 0) {
      // Every link was already in the queue — treat it as a success from
      // the visitor's point of view, nothing more to do.
      return NextResponse.json({ ok: true, count: 0, duplicate: true });
    }

    const updated = [...existing, ...newEntries];
    const content = Buffer.from(JSON.stringify(updated, null, 2) + "\n", "utf-8").toString(
      "base64"
    );

    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `New story suggestion${newEntries.length > 1 ? "s" : ""} via /suggest (${newEntries.length})`,
        content,
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error("[suggest] GitHub PUT failed", putRes.status, errText);
      return NextResponse.json(
        { error: "Couldn't save that submission. Try again in a bit." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, count: newEntries.length });
  } catch (err) {
    console.error("[suggest] unexpected error", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again in a bit." },
      { status: 500 }
    );
  }
}
