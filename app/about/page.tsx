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
          <span className="bg-gradient-to-r from-[#FF5A1F] via-[#FF2E7E] to-[#8B5CF6] bg-clip-text text-transparent">
            Verified.
          </span>
          <br />
          Florida.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-sunset/10 p-6 text-center ring-1 ring-sunset/15">
            <p className="text-4xl font-black text-sunset-dark">{totalStories}</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              Stories archived
            </p>
          </div>

          <div className="rounded-2xl bg-flamingo/10 p-6 text-center ring-1 ring-flamingo/15">
            <p className="text-4xl font-black text-flamingo">{avgScore}</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
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

          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-md shadow-ink/5 ring-1 ring-line">
            <table className="w-full min-w-[500px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-paper-soft text-sm font-semibold text-ink">
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Points</th>
                  <th className="px-5 py-3.5">Weight</th>
                  <th className="px-5 py-3.5">What it measures</th>
                </tr>
              </thead>

              <tbody>
                {RUBRIC.map((row) => (
                  <tr key={row.category} className="border-b border-line last:border-b-0">
                    <td className="px-5 py-3.5">
                      <span
                        className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-semibold align-middle">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-ink-soft">/{row.points}</td>
                    <td className="px-5 py-3.5 font-medium text-ink-soft">{row.weight}</td>
                    <td className="px-5 py-3.5 text-ink-soft">{row.measures}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t border-line bg-paper-soft font-semibold">
                  <td className="px-5 py-3.5">Total</td>
                  <td className="px-5 py-3.5">/{RUBRIC_TOTAL}</td>
                  <td className="px-5 py-3.5">100%</td>
                  <td className="px-5 py-3.5 text-ink-soft">
                    Maximum possible score
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 rounded-2xl bg-paper-soft p-6">
            <p className="text-sm font-semibold text-ink">Florida Man score</p>

            <p className="mt-2 text-ink-soft">
              The sum of all six category scores, out of {RUBRIC_TOTAL} — so
              a perfect story earns a {RUBRIC_TOTAL}/{RUBRIC_TOTAL}.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-sunset/10 p-6 ring-1 ring-sunset/20">
          <p className="text-sm font-semibold text-sunset-dark">Our standard</p>

          <p className="mt-2 font-medium text-ink">
            Funny stories are welcome. Fake stories are not.
          </p>
        </div>
      </section>
    </main>
  )
}
