import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import { FloridaRail } from "./components/FloridaRail";
import { stories } from "./data/stories";
import {
  StoryVisual,
  ScoreBadge,
  getScoreColor,
} from "./components/StoryVisual";
import { getStoryOfTheDay } from "./lib/storyOfTheDay";
import React from "react";

// Recompute on every request (in Florida's timezone) instead of freezing
// "today" at build time, so the featured story actually changes daily.
export const dynamic = "force-dynamic";

const CHIPS = [
  { label: "🐾 Animals", href: "/browse?category=animals" },
  { label: "🚨 Cop trouble", href: "/browse?search=police" },
  { label: "💊 Substances", href: "/browse?search=drugs" },
  { label: "🍑 Bare necessities", href: "/browse?search=naked" },
  { label: "💰 Petty heists", href: "/browse?search=steal" },
  { label: "🎭 Costumes", href: "/browse?search=mask" },
];

export default function Home() {
  const { story: today, isOnThisDay, others: otherStories, today: todayDate } =
    getStoryOfTheDay(stories);

  const formattedToday = `${todayDate.month} ${todayDate.day}, ${todayDate.year}`;

  const totalStories = stories.length;

  // Single pass over the archive for all three stats below — as the story
  // count grows this stays O(n) instead of two reduces plus a full sort of
  // every distinct city just to find the most common one.
  let scoreSum = 0;
  let topCity = stories[0].city;
  let topCityCount = 0;
  const cityCounts: Record<string, number> = {};

  for (const story of stories) {
    scoreSum += story.score;

    const count = (cityCounts[story.city] ?? 0) + 1;
    cityCounts[story.city] = count;

    if (count > topCityCount) {
      topCityCount = count;
      topCity = story.city;
    }
  }

  const avgScore = (scoreSum / totalStories).toFixed(1);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />
      <FloridaRail side="left" />
      <FloridaRail side="right" />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative mb-12 flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center shadow-xl shadow-ink/15 md:min-h-[460px]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Sunset_on_coast_of_Florida.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/70 to-ink/90" />

          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
              {formattedToday}
            </p>

            <h2 className="text-6xl font-bold leading-[0.95] tracking-tight text-white md:text-8xl">
              Florida Man
              <br />
              <span className="bg-gradient-to-r from-[#FF9457] via-[#FFBE3D] to-[#3FE3C7] bg-clip-text text-transparent">
                of the day
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base font-medium text-white/75">
              {isOnThisDay
                ? `An actual Florida Man incident on record for ${todayDate.month} ${todayDate.day} — this one happened in ${today.year}.`
                : `No verified Florida Man incident on record for ${todayDate.month} ${todayDate.day} yet — here's a featured pick while the archive grows.`}
            </p>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mb-14 grid max-w-3xl grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white p-5 text-center shadow-md shadow-ink/5 ring-1 ring-line">
            <p className="text-3xl font-bold text-sunset">{totalStories}</p>
            <p className="mt-1 text-xs font-medium text-ink-soft">
              Verified stories
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md shadow-ink/5 ring-1 ring-line">
            <p className="text-3xl font-bold text-flamingo">{avgScore}</p>
            <p className="mt-1 text-xs font-medium text-ink-soft">
              Avg. Florida score
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md shadow-ink/5 ring-1 ring-line">
            <p className="truncate text-3xl font-bold text-lagoon">
              {topCity}
            </p>
            <p className="mt-1 text-xs font-medium text-ink-soft">
              Most chaotic city
            </p>
          </div>
        </div>

        <article className="mx-auto grid max-w-4xl gap-8 rounded-3xl bg-white p-6 shadow-xl shadow-ink/10 ring-1 ring-line md:grid-cols-[260px_1fr] md:p-10">
          <div>
            <StoryVisual story={today} size="lg" />
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-5">
              <span className="rounded-full bg-citrus/25 px-3 py-1 text-sm font-medium text-ink">
                {isOnThisDay ? `On this day — ${today.year}` : "Featured story"}
              </span>

              <span className="flex items-center gap-1.5 text-sm font-medium text-lagoon">
                <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
                Verified story
              </span>
            </div>

            <p className="mb-2 text-sm font-medium text-flamingo">
              {today.city}, Florida
            </p>

            <h3 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {today.title}
            </h3>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {today.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
              <ScoreBadge score={today.score} label="Florida Man rating" />

              <Link
                href={`/story/${today.id}`}
                className="rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sunset/30 transition-transform hover:-translate-y-0.5 hover:bg-sunset-dark"
              >
                Read the full story →
              </Link>
            </div>
          </div>
        </article>

        {otherStories.length > 0 && (
          <section className="mx-auto mt-16 max-w-4xl">
            <div className="mb-6 flex items-end justify-between">
              <h3 className="text-2xl font-bold tracking-tight">
                Also on this day
              </h3>

              <span className="rounded-full bg-lagoon/15 px-3 py-1 text-sm font-medium text-lagoon">
                {otherStories.length} stories
              </span>
            </div>

            <div className="divide-y divide-line rounded-2xl bg-white shadow-md shadow-ink/5 ring-1 ring-line">
              {otherStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/story/${story.id}`}
                  className="flex items-center gap-5 px-5 py-5 transition-colors hover:bg-paper-soft"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-soft text-sm font-semibold text-ink-soft">
                    {index + 2}
                  </div>

                  <StoryVisual story={story} size="sm" />

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold leading-tight md:text-xl">
                      {story.title}
                    </h4>

                    <p className="mt-1.5 text-sm text-ink-soft">
                      {story.city}, Florida
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-ink-soft">Score</p>

                    <p
                      className="text-2xl font-bold"
                      style={{ color: getScoreColor(story.score) }}
                    >
                      {story.score}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category chips — jump into the archive */}
        <section className="mx-auto mt-16 max-w-4xl">
          <p className="mb-4 text-sm font-medium text-ink-soft">
            Explore by category
          </p>

          <div className="flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm shadow-ink/5 ring-1 ring-line transition-colors hover:bg-citrus/15"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/browse"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Browse full archive →
            </Link>

            <Link
              href="/calendar"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-paper-soft"
            >
              View calendar
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-2xl bg-paper-soft p-6">
          <p className="text-sm font-semibold text-ink">About the ranking</p>

          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Stories are ranked using a combination of humor, absurdity,
            Florida relevance, and source reliability. Only verified news
            reports can become Florida Man of the Day.
          </p>

          <Link
            href="/about"
            className="mt-3 inline-block text-sm font-semibold text-sunset hover:text-sunset-dark"
          >
            See the full scoring breakdown →
          </Link>
        </section>
      </section>
    </main>
  );
}
