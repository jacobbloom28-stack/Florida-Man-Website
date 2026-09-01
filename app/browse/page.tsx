"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import { stories } from "../data/stories";
import { StoryVisual, getScoreColor } from "../components/StoryVisual";
import { getStoryTimestamp } from "../lib/storyDate";

const SORT_OPTIONS = {
  "Newest First": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    getStoryTimestamp(b) - getStoryTimestamp(a),
  "Oldest First": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    getStoryTimestamp(a) - getStoryTimestamp(b),
  "Score: High to Low": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    b.score - a.score,
  "Score: Low to High": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    a.score - b.score,
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

function BrowseContent() {
  // Pick up a category filter passed in from the homepage chips (?search=gator)
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [year, setYear] = useState("All Years");
  const [month, setMonth] = useState("All Months");
  const [day, setDay] = useState("All Days");
  const [city, setCity] = useState("All Cities");
  const [score, setScore] = useState("Any Score");
  const [sort, setSort] = useState<SortOption>("Newest First");

  const years = useMemo(
    () => Array.from(new Set(stories.map((story) => story.year))).sort(
      (a, b) => Number(b) - Number(a)
    ),
    []
  );

  const cities = useMemo(
    () => Array.from(new Set(stories.map((story) => story.city))).sort(),
    []
  );

  const filteredStories = stories
    .filter((story) => {
      const term = search.toLowerCase();

      const searchMatch =
        search === "" ||
        story.title.toLowerCase().includes(term) ||
        story.city.toLowerCase().includes(term) ||
        story.description.toLowerCase().includes(term);

      const yearMatch = year === "All Years" || story.year === year;
      const monthMatch = month === "All Months" || story.month === month;
      const dayMatch = day === "All Days" || story.day === day;
      const cityMatch = city === "All Cities" || story.city === city;

      let scoreMatch = true;

      if (score === "90+ Florida Man") {
        scoreMatch = story.score >= 90;
      } else if (score === "80+ Florida Man") {
        scoreMatch = story.score >= 80;
      } else if (score === "65+ Florida Man") {
        scoreMatch = story.score >= 65;
      }

      return (
        searchMatch &&
        yearMatch &&
        monthMatch &&
        dayMatch &&
        cityMatch &&
        scoreMatch
      );
    })
    .sort(SORT_OPTIONS[sort]);

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF3E7F]">
          Florida Man Archive
        </p>

        <h2 className="mt-3 text-6xl font-black uppercase leading-none tracking-tight">
          Browse
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-6">
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold focus:outline-none focus:ring-2 focus:ring-[#FF3E7F]"
          />

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold"
          >
            <option>All Years</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold"
          >
            <option>All Months</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold"
          >
            <option>All Days</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold"
          >
            <option>All Cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="border-2 border-[#171717] bg-white p-3 font-bold"
          >
            <option>Any Score</option>
            <option>90+ Florida Man</option>
            <option>80+ Florida Man</option>
            <option>65+ Florida Man</option>
          </select>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-gray-600">
            {filteredStories.length} of {stories.length} stories
          </p>

          <div className="flex items-center gap-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-600">
              Sort
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border-2 border-[#171717] bg-white p-2 text-sm font-bold"
            >
              {Object.keys(SORT_OPTIONS).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            {(search ||
              year !== "All Years" ||
              month !== "All Months" ||
              day !== "All Days" ||
              city !== "All Cities" ||
              score !== "Any Score") && (
              <button
                onClick={() => {
                  setSearch("");
                  setYear("All Years");
                  setMonth("All Months");
                  setDay("All Days");
                  setCity("All Cities");
                  setScore("Any Score");
                }}
                className="border-2 border-[#171717] bg-[#FFC93C] px-3 py-1 text-xs font-black uppercase tracking-widest"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 border-t-4 border-[#171717]">
          {filteredStories.length === 0 ? (
            <p className="py-12 text-center font-bold">
              No Florida Man stories found.
            </p>
          ) : (
            filteredStories.map((story) => (
              <Link
                href={`/story/${story.id}`}
                key={story.id}
                className="flex items-center gap-5 border-b-2 border-[#171717] py-6 transition-colors hover:bg-white"
              >
                <StoryVisual story={story} size="sm" />

                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-[#FF3E7F]">
                    {story.date} · {story.city}
                  </p>

                  <h3 className="mt-2 text-2xl font-black hover:underline">
                    {story.contentNote && (
                      <span title="Content note">⚠️ </span>
                    )}
                    {story.title}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest">
                    Score
                  </p>

                  <p
                    className="text-3xl font-black"
                    style={{ color: getScoreColor(story.score) }}
                  >
                    {story.score}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default function Browse() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f5f1e8]" />}>
      <BrowseContent />
    </Suspense>
  );
}
