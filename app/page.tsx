import Link from "next/link";
import Header from "./components/Header";
import { stories } from "./data/stories";
import {
  StoryVisual,
  ScoreBadge,
  getScoreColor,
} from "./components/StoryVisual";
import { getStoryOfTheDay } from "./lib/storyOfTheDay";
import React from "react";

// Re-render at most every 30 minutes (in Florida's timezone) instead of
// either freezing "today" at build time or fully recomputing this page
// (stats over the whole archive, category matching for the card) on every
// single request via force-dynamic. 30 minutes is far tighter than the
// once-a-day cadence "today" actually needs, so freshness never suffers,
// but repeat visitors inside that window get an instant cached response
// instead of the server redoing the same work.
export const revalidate = 1800;

const CHIPS = [
  { label: "🐾 Animals", href: "/browse?category=animals", tint: "bg-palm text-ink" },
  { label: "🚨 Cop trouble", href: "/browse?category=cop-trouble", tint: "bg-sky text-ink" },
  { label: "💊 Substances", href: "/browse?category=substances", tint: "bg-grape text-ink" },
  { label: "🍑 Bare necessities", href: "/browse?category=bare-necessities", tint: "bg-flamingo text-ink" },
  { label: "💰 Petty heists", href: "/browse?category=petty-heists", tint: "bg-citrus text-ink" },
  { label: "🎭 Costumes", href: "/browse?category=costumes", tint: "bg-sunset text-ink" },
  { label: "🌮 Fast food", href: "/browse?category=fast-food", tint: "bg-lagoon text-ink" },
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

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="relative mb-12 flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5A1F] via-[#FF2E7E] to-[#8B5CF6] px-6 py-16 text-center shadow-xl shadow-flamingo/25 md:min-h-[460px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-conic-gradient(rgba(255,255,255,0.3) 0deg 4deg, transparent 4deg 12deg)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 text-[240px] leading-none opacity-20 md:text-[340px]"
          >
            🌴
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 text-[160px] leading-none opacity-20 md:text-[220px]"
          >
            ☀️
          </div>

          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm">
              {formattedToday}
            </p>

            <h2 className="text-6xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] md:text-8xl">
              Florida Man
              <br />
              <span className="text-citrus">of the day</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base font-medium text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
              {isOnThisDay
                ? `Yes, this really happened in Florida — on ${todayDate.month} ${todayDate.day}, back in ${today.year}.`
                : `We don't have a story on record for ${todayDate.month} ${todayDate.day} yet — here's one of our favorites in the meantime.`}
            </p>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mb-14 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-xl bg-sunset p-3 text-center sm:p-5">
            <p className="text-2xl font-black text-ink sm:text-3xl">{totalStories}</p>
            <p className="mt-1 text-xs font-semibold text-ink/70">
              Stories so far
            </p>
          </div>
          <div className="rounded-xl bg-flamingo p-3 text-center sm:p-5">
            <p className="text-2xl font-black text-ink sm:text-3xl">{avgScore}</p>
            <p className="mt-1 text-xs font-semibold text-ink/70">
              Average Florida score
            </p>
          </div>
          <div className="rounded-xl bg-lagoon p-3 text-center sm:p-5">
            <p className="truncate text-2xl font-black text-ink sm:text-3xl">
              {topCity}
            </p>
            <p className="mt-1 text-xs font-semibold text-ink/70">
              Most chaotic city
            </p>
          </div>
        </div>

        <article className="mx-auto grid max-w-4xl gap-8 rounded-3xl bg-white p-6 shadow-xl shadow-flamingo/10 ring-1 ring-line md:grid-cols-[260px_1fr] md:p-10">
          <div>
            <StoryVisual story={today} size="lg" />
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-5">
              <span className="rounded-full bg-citrus px-3 py-1 text-sm font-bold text-ink">
                {isOnThisDay ? `On this day — ${today.year}` : "Featured story"}
              </span>

              <span className="flex items-center gap-1.5 text-sm font-semibold text-lagoon">
                <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
                100% real
              </span>
            </div>

            <p className="mb-2 text-sm font-semibold text-flamingo">
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
                className="rounded-full bg-gradient-to-r from-sunset to-flamingo px-6 py-3 text-sm font-bold text-white shadow-lg shadow-flamingo/30 transition-transform hover:-translate-y-0.5"
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

              <span className="rounded-full bg-lagoon px-3 py-1 text-sm font-bold text-ink">
                {otherStories.length} stories
              </span>
            </div>

            <div className="divide-y divide-line rounded-xl bg-white shadow-md shadow-ink/5 ring-1 ring-line">
              {otherStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/story/${story.id}`}
                  className="flex items-center gap-5 px-5 py-5 transition-colors hover:bg-paper-soft"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sunset to-flamingo text-sm font-bold text-white">
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
          <p className="mb-4 text-sm font-semibold text-ink-soft">
            Or dive into a category
          </p>

          <div className="flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${chip.tint}`}
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/browse"
              className="rounded-full bg-gradient-to-r from-ink to-[#3d2f52] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              See the whole archive →
            </Link>

            <Link
              href="/browse?sort=calendar"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink ring-1 ring-line transition-colors hover:bg-paper-soft"
            >
              Browse in calendar order
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl border-l-4 border-citrus bg-paper-soft p-6">
          <p className="text-sm font-bold text-sunset-dark">About the ranking</p>

          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            We rank stories on humor, absurdity, how unmistakably Florida
            they feel, and whether the source actually checks out. If it
            didn&apos;t really happen, it doesn&apos;t make the cut.
          </p>

          <Link
            href="/about"
            className="mt-3 inline-block text-sm font-bold text-sunset hover:text-sunset-dark"
          >
            See the full scoring breakdown →
          </Link>
        </section>
      </section>
    </main>
  );
}
