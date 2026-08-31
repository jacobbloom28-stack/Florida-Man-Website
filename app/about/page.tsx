import React from "react";
import Header from "../components/Header";
import { FloridaRail } from "../components/FloridaRail";
import { stories } from "../data/stories";

const RUBRIC = [
  {
    category: "Absurdity",
    points: 25,
    weight: "25%",
    color: "#FF6B35",
    measures: "How ridiculous or irrational the situation is",
  },
  {
    category: "Humor",
    points: 25,
    weight: "25%",
    color: "#FFC93C",
    measures: "How genuinely funny the incident is",
  },
  {
    category: "Florida Factor",
    points: 20,
    weight: "20%",
    color: "#00B8A9",
    measures: "How uniquely Florida the story feels",
  },
  {
    category: "Unexpectedness",
    points: 15,
    weight: "15%",
    color: "#7B2FF7",
    measures: "How surprising or bizarre the incident or outcome is",
  },
  {
    category: "Headline Quality",
    points: 10,
    weight: "10%",
    color: "#FF3E7F",
    measures: "How strong and entertaining the headline is",
  },
  {
    category: "Source Quality",
    points: 5,
    weight: "5%",
    color: "#0F9B6E",
    measures: "How well documented and reliable the source is",
  },
];

const RUBRIC_TOTAL = RUBRIC.reduce((sum, row) => sum + row.points, 0);

export default function About() {
  const totalStories = stories.length;

  const avgScore = (
    stories.reduce((sum, story) => sum + story.score, 0) / totalStories
  ).toFixed(1);

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
      <Header />
      <FloridaRail side="left" />
      <FloridaRail side="right" />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF3E7F]">
          About the Project
        </p>

        <h2 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight">
          Funny.
          <br />
          <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF3E7F] to-[#7B2FF7] bg-clip-text text-transparent">
            Verified.
          </span>
          <br />
          Florida.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="border-2 border-[#171717] bg-white p-6 text-center">
            <p className="text-4xl font-black text-[#FF6B35]">{totalStories}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-widest">
              Stories Archived
            </p>
          </div>

          <div className="border-2 border-[#171717] bg-white p-6 text-center">
            <p className="text-4xl font-black text-[#FF3E7F]">{avgScore}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-widest">
              Average Florida Score
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-8 text-lg leading-relaxed">
          <p>
            Florida Man of the Day finds the strangest and funniest verified
            news stories happening in Florida.
          </p>

          <p>
            Stories come from real news organizations. Each story gets checked
            for its Florida connection, publication date, source reliability,
            and factual consistency.
          </p>
        </div>

        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF3E7F]">
            How Scoring Works
          </p>

          <h3 className="mt-2 text-3xl font-black uppercase tracking-tight">
            The Florida Man Score
          </h3>

          <p className="mt-4 text-gray-700">
            Every story is scored out of {RUBRIC_TOTAL} points across six
            categories. The total is divided by 10 and rounded to one decimal
            place to produce the Florida Man Score shown on each story.
          </p>

          <div className="mt-6 overflow-x-auto border-2 border-[#171717] bg-white">
            <table className="w-full min-w-[500px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#171717] bg-[#e8e1d2] text-xs font-black uppercase tracking-widest">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Points</th>
                  <th className="px-4 py-3">Weight</th>
                  <th className="px-4 py-3">What it measures</th>
                </tr>
              </thead>

              <tbody>
                {RUBRIC.map((row) => (
                  <tr
                    key={row.category}
                    className="border-b-2 border-[#171717] last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <span
                        className="mr-2 inline-block h-3 w-3 rounded-full align-middle"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-black align-middle">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold">/{row.points}</td>
                    <td className="px-4 py-3 font-bold">{row.weight}</td>
                    <td className="px-4 py-3 text-gray-700">{row.measures}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-[#171717] font-black">
                  <td className="px-4 py-3 uppercase tracking-widest">
                    Total
                  </td>
                  <td className="px-4 py-3">/{RUBRIC_TOTAL}</td>
                  <td className="px-4 py-3">100%</td>
                  <td className="px-4 py-3 text-gray-700">
                    Maximum possible score
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 border-2 border-[#171717] bg-[#e8e1d2] p-6">
            <p className="text-xs font-black uppercase tracking-widest">
              Florida Man Score
            </p>

            <p className="mt-2 font-bold">
              Total points ÷ 10, rounded to one decimal place — so a perfect
              {" "}{RUBRIC_TOTAL}/{RUBRIC_TOTAL} story earns a 10.0.
            </p>
          </div>
        </div>

        <div className="mt-12 border-2 border-[#171717] bg-[#e8e1d2] p-6">
          <p className="text-xs font-black uppercase tracking-widest">
            Our standard
          </p>

          <p className="mt-3 font-bold">
            Funny stories are welcome. Fake stories are not.
          </p>
        </div>
      </section>
    </main>
  )
}
