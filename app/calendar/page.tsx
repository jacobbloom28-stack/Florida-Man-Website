import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { stories, type Story } from "../data/stories";
import { StoryVisual, getScoreColor } from "../components/StoryVisual";
import { getMonthDayOrder } from "../lib/storyDate";
import React from "react";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "A day-by-day calendar of verified Florida Man incidents — see which absurd story won each day in Florida Man history.",
  alternates: { canonical: "/calendar" },
};

export default function Calendar() {
  // Group by calendar day (month + day), ignoring year, so every real day
  // in Florida Man history gets exactly one "of the day" winner. Stories
  // without a specific day on record (year only) can't win a day, so they're
  // excluded rather than guessed at.
  const storiesByDay = new Map<string, Story[]>();

  for (const story of stories) {
    if (!story.month || !story.day) continue;

    const key = `${story.month}-${story.day}`;
    const group = storiesByDay.get(key);

    if (group) {
      group.push(story);
    } else {
      storiesByDay.set(key, [story]);
    }
  }

  const days = Array.from(storiesByDay.values())
    .map((storiesForDay) =>
      storiesForDay.reduce((highest, story) =>
        story.score > highest.score ? story : highest
      )
    )
    .sort((a, b) => getMonthDayOrder(a) - getMonthDayOrder(b))

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-medium text-flamingo">Daily archive</p>

        <h2 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
          Calendar
        </h2>

        <p className="mt-5 max-w-2xl text-ink-soft">
          Every day gets one Florida Man of the Day. Browse the archive and
          see which story won.
        </p>

        <div className="mt-10 divide-y divide-line rounded-2xl bg-white shadow-md shadow-ink/5 ring-1 ring-line">
          {days.map((day) => (
            <Link
              href={`/story/${day.id}`}
              key={day.id}
              className="flex items-center gap-5 px-5 py-5 transition-colors hover:bg-paper-soft"
            >
              <StoryVisual story={day} size="sm" />

              <div className="flex-1">
                <p className="text-sm font-medium text-flamingo">{day.date}</p>

                <h3 className="mt-1.5 text-xl font-semibold leading-tight">
                  {day.contentNote && <span title="Content note">⚠️ </span>}
                  {day.title}
                </h3>

                <p className="mt-1.5 text-sm text-ink-soft">
                  {day.city}, Florida
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-medium text-ink-soft">Score</p>

                <p
                  className="text-2xl font-bold"
                  style={{ color: getScoreColor(day.score) }}
                >
                  {day.score}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
