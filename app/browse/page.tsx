"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import { stories } from "../data/stories";
import { StoryVisual, getScoreColor } from "../components/StoryVisual";
import { getStoryTimestamp, getMonthDayOrder, MONTH_NAMES } from "../lib/storyDate";
import { getCategoryById } from "../lib/categories";
import React from "react";

const SCORE_FILTERS = ["Any score", "90+ Florida Man", "80+ Florida Man", "65+ Florida Man"];
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const SELECT_CLASSES =
  "rounded-xl border border-line bg-white p-3 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-sunset/40";

// A single <select> filter styled consistently with the others. Adding a
// new filter to the toolbar is now "define its options, render one of
// these" instead of copy-pasting a whole <select> block.
function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={SELECT_CLASSES}
    >
      <option>{placeholder}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

const SORT_OPTIONS = {
  "Newest first": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    getStoryTimestamp(b) - getStoryTimestamp(a),
  "Oldest first": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    getStoryTimestamp(a) - getStoryTimestamp(b),
  "Score: high to low": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    b.score - a.score,
  "Score: low to high": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    a.score - b.score,
  "Calendar order": (a: (typeof stories)[number], b: (typeof stories)[number]) =>
    getMonthDayOrder(a) - getMonthDayOrder(b),
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

const PAGE_SIZE = 24;

function BrowseContent() {
  // Pick up a category filter passed in from the homepage chips
  // (?category=animals, ?category=fast-food, etc.)
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const activeCategory = getCategoryById(category);
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [year, setYear] = useState("All years");
  const [month, setMonth] = useState("All months");
  const [day, setDay] = useState("All days");
  const [city, setCity] = useState("All cities");
  const [score, setScore] = useState("Any score");
  const [sort, setSort] = useState<SortOption>(() =>
    searchParams.get("sort") === "calendar" ? "Calendar order" : "Newest first"
  );

  const basePool = useMemo(
    () => (activeCategory ? activeCategory.filter(stories) : stories),
    [activeCategory]
  );

  const years = useMemo(
    () => Array.from(new Set(basePool.map((story) => story.year))).sort(
      (a, b) => Number(b) - Number(a)
    ),
    [basePool]
  );

  const cities = useMemo(
    () => Array.from(new Set(basePool.map((story) => story.city))).sort(),
    [basePool]
  );

  // Memoized so filtering/sorting only reruns when a filter or the pool
  // actually changes, rather than on every render (e.g. while another part
  // of the page re-renders) — matters more as the archive keeps growing.
  const filteredStories = useMemo(
    () =>
      basePool
        .filter((story) => {
          const term = search.toLowerCase();

          const searchMatch =
            search === "" ||
            story.title.toLowerCase().includes(term) ||
            story.city.toLowerCase().includes(term) ||
            story.description.toLowerCase().includes(term);

          const yearMatch = year === "All years" || story.year === year;
          const monthMatch = month === "All months" || story.month === month;
          const dayMatch = day === "All days" || story.day === day;
          const cityMatch = city === "All cities" || story.city === city;

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
        .sort(SORT_OPTIONS[sort]),
    [basePool, search, year, month, day, city, score, sort]
  );

  const filtersActive =
    search ||
    year !== "All years" ||
    month !== "All months" ||
    day !== "All days" ||
    city !== "All cities" ||
    score !== "Any score";

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filters/sort produce a new result set, so a stale page count would
  // otherwise leave the list stuck mid-scroll or hide results that used
  // to be on "page 2" of the previous, larger set. Adjusted during render
  // (React's documented pattern for resetting state when inputs change)
  // rather than in an effect, so it takes effect in the same render pass.
  const filterKey = `${category ?? ""}|${search}|${year}|${month}|${day}|${city}|${score}|${sort}`;
  const [trackedFilterKey, setTrackedFilterKey] = useState(filterKey);
  if (filterKey !== trackedFilterKey) {
    setTrackedFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  const visibleStories = filteredStories.slice(0, visibleCount);
  const remaining = filteredStories.length - visibleStories.length;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-medium text-flamingo">Florida Man archive</p>

        <h2 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
          {activeCategory ? activeCategory.label : "Browse"}
        </h2>

        {activeCategory && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-citrus px-3 py-1 text-sm font-semibold text-ink">
              {activeCategory.chipLabel} — filtered to {activeCategory.label.toLowerCase()}
            </span>

            <Link
              href="/browse"
              className="text-sm font-medium text-sunset hover:text-sunset-dark"
            >
              Clear category →
            </Link>
          </div>
        )}

        <div className="mt-10 rounded-xl bg-white p-5 shadow-md shadow-ink/5 ring-1 ring-line">
          <div className="grid gap-3 md:grid-cols-6">
            <input
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-line bg-white p-3 text-sm font-medium placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-sunset/40"
            />

            <FilterSelect value={year} onChange={setYear} placeholder="All years" options={years} />
            <FilterSelect value={month} onChange={setMonth} placeholder="All months" options={MONTH_NAMES} />
            <FilterSelect value={day} onChange={setDay} placeholder="All days" options={DAY_OPTIONS} />
            <FilterSelect value={city} onChange={setCity} placeholder="All cities" options={cities} />
            <FilterSelect value={score} onChange={setScore} placeholder="Any score" options={SCORE_FILTERS.slice(1)} />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <p className="text-sm text-ink-soft">
              Showing {visibleStories.length} of {filteredStories.length} stories
            </p>

            <div className="flex items-center gap-3">
              <label className="text-sm text-ink-soft">Sort</label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-xl border border-line bg-white p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sunset/40"
              >
                {Object.keys(SORT_OPTIONS).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              {filtersActive && (
                <button
                  onClick={() => {
                    setSearch("");
                    setYear("All years");
                    setMonth("All months");
                    setDay("All days");
                    setCity("All cities");
                    setScore("Any score");
                  }}
                  className="rounded-full bg-citrus px-3.5 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 divide-y divide-line rounded-xl bg-white shadow-md shadow-ink/5 ring-1 ring-line">
          {filteredStories.length === 0 ? (
            <p className="px-6 py-14 text-center font-medium text-ink-soft">
              Couldn&apos;t find one that matches. Try loosening a filter.
            </p>
          ) : (
            visibleStories.map((story) => (
              <Link
                href={`/story/${story.id}`}
                key={story.id}
                className="flex items-center gap-5 px-5 py-5 transition-colors hover:bg-paper-soft"
              >
                <StoryVisual story={story} size="sm" />

                <div className="flex-1">
                  <p className="text-sm font-medium text-flamingo">
                    {story.date} · {story.city}
                  </p>

                  <h3 className="mt-1.5 text-xl font-semibold leading-tight">
                    {story.contentNote && (
                      <span title="Content note">⚠️ </span>
                    )}
                    {story.title}
                  </h3>
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
            ))
          )}
        </div>

        {remaining > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Load {Math.min(PAGE_SIZE, remaining)} more
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function Browse() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-paper" />}>
      <BrowseContent />
    </Suspense>
  );
}
