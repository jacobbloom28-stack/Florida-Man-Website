import Link from "next/link";
import Header from "../components/Header";
import { stories } from "../data/stories";
import { StoryVisual, getScoreColor } from "../components/StoryVisual";
import { getStoryTimestamp } from "../lib/storyDate";
import React from "react";

export default function Calendar() {
  const dates = Array.from(
    new Set(stories.map((story) => story.date))
  )

  const days = dates
    .map((date) => {
      const storiesForDate = stories.filter(
        (story) => story.date === date
      )

      return storiesForDate.reduce((highest, story) =>
        story.score > highest.score ? story : highest
      )
    })
    .sort((a, b) => getStoryTimestamp(b) - getStoryTimestamp(a))

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF3E7F]">
          Daily Archive
        </p>

        <h2 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight">
          Calendar
        </h2>

        <p className="mt-6 max-w-2xl text-gray-700">
          Every day gets one Florida Man of the Day. Browse the archive and
          see which story won.
        </p>

        <div className="mt-12 border-t-4 border-[#171717]">
          {days.map((day) => (
            <Link
              href={`/story/${day.id}`}
              key={day.id}
              className="flex items-center gap-5 border-b-2 border-[#171717] py-6 transition-colors hover:bg-white"
            >
              <StoryVisual story={day} size="sm" />

              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-[#FF3E7F]">
                  {day.date}
                </p>

                <h3 className="mt-2 text-xl font-black md:text-2xl">
                  {day.contentNote && <span title="Content note">⚠️ </span>}
                  {day.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-gray-600">
                  {day.city}, Florida
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest">
                  Score
                </p>

                <p
                  className="text-3xl font-black"
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
