import type { Story } from "../data/stories";

// Florida runs on Eastern time regardless of where this is hosted, so "today"
// is resolved there rather than the server's local timezone.
export function getFloridaToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(new Date());

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  return {
    year: map.year,
    month: map.month,
    day: String(Number(map.day)), // strip any leading zero to match story.day
  };
}

export function getStoryOfTheDay(stories: Story[]) {
  const today = getFloridaToday();

  // A story that actually happened on this month/day, in any year —
  // "on this day in Florida Man history."
  const onThisDayMatches = stories.filter(
    (story) => story.month === today.month && story.day === today.day
  );

  if (onThisDayMatches.length > 0) {
    const winner = onThisDayMatches.reduce((best, story) =>
      story.score > best.score ? story : best
    );

    return {
      story: winner,
      isOnThisDay: true as const,
      others: onThisDayMatches.filter((story) => story.id !== winner.id),
      today,
    };
  }

  // No verified incident on record for this exact date yet — fall back to a
  // deterministic pick so the page still has a featured story, and it only
  // changes once a day (not on every request).
  const startOfYear = Date.UTC(Number(today.year), 0, 0);
  const now = new Date(
    `${today.month} ${today.day}, ${today.year} 12:00:00 UTC`
  );
  const dayOfYear = Math.floor((now.getTime() - startOfYear) / 86_400_000);
  const fallback = stories[dayOfYear % stories.length];

  return {
    story: fallback,
    isOnThisDay: false as const,
    others: [],
    today,
  };
}
