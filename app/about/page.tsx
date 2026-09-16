import type { Metadata } from "next";
import Header from "../components/Header";
import { stories, RUBRIC } from "../data/stories";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "How we check and score every Florida Man story — the six-part rubric behind Absurdity, Humor, Florida Factor, Unexpectedness, Headline Quality, and Source Quality.",
  alternates: { canonical: "/about" },
};

const RUBRIC_TOTAL = RUBRIC.reduce((sum, row) => sum + row.points, 0);

export default function About() {
  const totalStories = stories.length;

  const avgScore = (
    stories.reduce((sum, story) => sum + story.score, 0) / totalStories
  ).toFixed(1);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-flamingo">About the project</p>

        <h2 className="mt-3 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
          Funny.
          <br />
          <span className="text-flamingo">Verified.</span>
          <br />
          Florida.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-sunset p-6 text-center">
            <p className="text-4xl font-black text-ink">{totalStories}</p>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              Stories archived
            </p>
          </div>

          <div className="rounded-xl bg-flamingo p-6 text-center">
            <p className="text-4xl font-black text-ink">{avgScore}</p>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              Average Florida score
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>
            We dig up the strangest, funniest news stories happening in
            Florida — the ones that make you say &ldquo;there&apos;s no
            way that&apos;s real&rdquo; right before you find out it is.
          </p>

          <p>
            Every story comes from a real news outlet. Before it makes the
            cut, we check that it actually happened in Florida, actually
            happened recently enough to matter, and actually happened the
            way the headline says.
          </p>
        </div>

        <div className="mt-14">
          <p className="text-sm font-medium text-flamingo">How scoring works</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight">
            The Florida Man score
          </h3>

          <p className="mt-4 text-ink-soft">
            Every story gets scored across six categories, and the number
            you see is just those six added up — no hidden math, no fudging
            it after the fact. Humor and absurdity count for the most. And
            if a story involves someone actually getting hurt, that drags
            the score down instead of up — we&apos;re here to laugh at bad
            decisions, not at anyone&apos;s pain.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {RUBRIC.map((row) => (
              <div
                key={row.category}
                className="rounded-xl bg-white p-5 shadow-md shadow-ink/5 ring-1 ring-line"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                  <p className="font-semibold text-ink">{row.category}</p>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-3xl font-black" style={{ color: row.color }}>
                    /{row.points}
                  </p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {row.weight} of total
                  </p>
                </div>

                <p className="mt-2 text-sm text-ink-soft">{row.measures}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-ink px-6 py-5 text-white">
            <div>
              <p className="text-sm font-semibold text-white/70">Florida Man score</p>
              <p className="mt-1 max-w-md text-sm text-white/70">
                Add up all six categories and that&apos;s the number you see
                on every story.
              </p>
            </div>
            <p className="shrink-0 pl-4 text-4xl font-black">/{RUBRIC_TOTAL}</p>
          </div>
        </div>

        <div className="mt-12 border-l-4 border-sunset bg-paper-soft p-6">
          <p className="text-sm font-semibold text-sunset-dark">Our standard</p>

          <p className="mt-2 font-medium text-ink">
            Funny stories are welcome. Fake stories are not.
          </p>
        </div>
      </section>
    </main>
  )
}
