import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import { FloridaRail } from "./components/FloridaRail";
import { stories } from "./data/stories";
import {
  StoryVisual,
  getScoreColor,
  getScoreLabel,
  getScoreTextColor,
} from "./components/StoryVisual";
import { getStoryOfTheDay } from "./lib/storyOfTheDay";
import React from "react";

// Recompute on every request (in Florida's timezone) instead of freezing
// "today" at build time, so the featured story actually changes daily.
export const dynamic = "force-dynamic";

const CHIPS = [
  { label: "🐾 Animals", href: "/browse?category=animals" },
  { label: "🚨 Cop Trouble", href: "/browse?search=police" },
  { label: "💊 Substances", href: "/browse?search=drugs" },
  { label: "🍑 Bare Necessities", href: "/browse?search=naked" },
  { label: "💰 Petty Heists", href: "/browse?search=steal" },
  { label: "🎭 Costumes", href: "/browse?search=mask" },
];

export default function Home() {
  const { story: today, isOnThisDay, others: otherStories, today: todayDate } =
    getStoryOfTheDay(stories);

  const formattedToday = `${todayDate.month} ${todayDate.day}, ${todayDate.year}`;

  const totalStories = stories.length;

  const avgScore = (
    stories.reduce((sum, story) => sum + story.score, 0) / totalStories
  ).toFixed(1);

  const cityCounts = stories.reduce<Record<string, number>>((acc, story) => {
    acc[story.city] = (acc[story.city] ?? 0) + 1;
    return acc;
  }, {});

  const topCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
      <Header />
      <FloridaRail side="left" />
      <FloridaRail side="right" />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-12">
        <div className="relative mb-10 flex min-h-[380px] items-center justify-center overflow-hidden border-4 border-[#171717] px-6 py-16 text-center shadow-[8px_8px_0px_#171717] md:min-h-[460px]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Sunset_on_coast_of_Florida.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/60 via-[#171717]/70 to-[#171717]/90" />

          <div className="relative z-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#FFC93C]">
              {formattedToday}
            </p>

            <h2 className="text-6xl font-black uppercase leading-none tracking-tight text-white md:text-8xl">
              Florida Man
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FFC93C] to-[#00B8A9] bg-clip-text text-transparent">
                of the Day
              </span>
            </h2>

            <div className="mx-auto mt-6 h-1.5 w-24 bg-gradient-to-r from-[#FF3E7F] via-[#FFC93C] to-[#00B8A9]" />

            <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-white/80">
              {isOnThisDay
                ? `An actual Florida Man incident on record for ${todayDate.month} ${todayDate.day} — this one happened in ${today.year}.`
                : `No verified Florida Man incident on record for ${todayDate.month} ${todayDate.day} yet — here's a featured pick while the archive grows.`}
            </p>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-3 divide-x-2 divide-[#171717] border-2 border-[#171717] bg-white text-center">
          <div className="p-4">
            <p className="text-3xl font-black text-[#FF6B35]">{totalStories}</p>
            <p className="text-[10px] font-black uppercase tracking-widest">
              Verified Stories
            </p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-black text-[#FF3E7F]">{avgScore}</p>
            <p className="text-[10px] font-black uppercase tracking-widest">
              Avg. Florida Score
            </p>
          </div>
          <div className="p-4">
            <p className="truncate text-3xl font-black text-[#00B8A9]">
              {topCity}
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest">
              Most Chaotic City
            </p>
          </div>
        </div>

        <article className="mx-auto grid max-w-4xl gap-8 border-4 border-[#171717] bg-white p-6 shadow-[10px_10px_0px_#171717] md:grid-cols-[260px_1fr] md:p-10">
          <div>
            <StoryVisual story={today} size="lg" />
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between border-b-2 border-[#171717] pb-4">
              <span className="border-2 border-[#171717] bg-[#FFC93C] px-2 py-1 text-xs font-black uppercase tracking-widest">
                {isOnThisDay ? `On This Day — ${today.year}` : "Featured Story"}
              </span>

              <span className="text-sm font-bold text-[#00B8A9]">
                ✓ Verified Story
              </span>
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#FF3E7F]">
              {today.city}, Florida
            </p>

            <h3 className="text-4xl font-black leading-tight md:text-5xl">
              {today.title}
            </h3>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
              {today.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t-2 border-[#171717] pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#171717]"
                  style={{ backgroundColor: getScoreColor(today.score) }}
                >
                  <p
                    className="text-2xl font-black leading-none"
                    style={{ color: getScoreTextColor(today.score) }}
                  >
                    {today.score}
                  </p>
                  <p
                    className="text-[9px] font-black uppercase tracking-widest"
                    style={{ color: getScoreTextColor(today.score) }}
                  >
                    /100
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest">
                    Florida Man Rating
                  </p>
                  <p className="text-sm font-bold text-gray-600">
                    {getScoreLabel(today.score)}
                  </p>
                </div>
              </div>

              <Link
                href={`/story/${today.id}`}
                className="border-2 border-[#171717] bg-gradient-to-r from-[#FF3E7F] to-[#FF6B35] px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0px_#171717] transition-transform hover:-translate-y-0.5"
              >
                Read Story
              </Link>
            </div>
          </div>
        </article>

        {otherStories.length > 0 && (
          <section className="mx-auto mt-16 max-w-4xl">
            <div className="mb-6 flex items-end justify-between border-b-4 border-[#171717] pb-3">
              <h3 className="text-2xl font-black uppercase">
                Also On This Day
              </h3>

              <span className="border-2 border-[#171717] bg-[#00B8A9] px-2 py-1 text-sm font-black text-white">
                {otherStories.length} stories
              </span>
            </div>

            <div className="divide-y-2 divide-[#171717] border-b-2 border-[#171717]">
              {otherStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/story/${story.id}`}
                  className="flex items-center gap-5 py-6 transition-colors hover:bg-white"
                >
                  <div className="text-3xl font-black text-[#FF3E7F]">
                    {index + 2}
                  </div>

                  <StoryVisual story={story} size="sm" />

                  <div className="flex-1">
                    <h4 className="text-xl font-black leading-tight md:text-2xl">
                      {story.title}
                    </h4>

                    <p className="mt-2 text-sm font-semibold text-gray-600">
                      {story.city}, Florida
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-widest">
                      Score
                    </p>

                    <p
                      className="text-2xl font-black"
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
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-600">
            Explore by category
          </p>

          <div className="flex flex-wrap gap-3">
            {CHIPS.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="border-2 border-[#171717] bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0px_#171717] transition-transform hover:-translate-y-0.5 hover:bg-[#FFC93C]"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/browse"
              className="border-2 border-[#171717] bg-[#171717] px-6 py-3 text-sm font-black uppercase tracking-wide text-white"
            >
              Browse Full Archive →
            </Link>

            <Link
              href="/calendar"
              className="border-2 border-[#171717] bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#171717]"
            >
              View Calendar →
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl border-2 border-[#171717] bg-[#e8e1d2] p-6">
          <p className="text-xs font-black uppercase tracking-widest">
            About the ranking
          </p>

          <p className="mt-3 text-sm leading-relaxed">
            Stories are ranked using a combination of humor, absurdity,
            Florida relevance, and source reliability. Only verified news
            reports can become Florida Man of the Day.
          </p>

          <Link
            href="/about"
            className="mt-3 inline-block text-sm font-black uppercase tracking-widest text-[#FF3E7F] hover:underline"
          >
            See the full scoring breakdown →
          </Link>
        </section>
      </section>
    </main>
  );
}
