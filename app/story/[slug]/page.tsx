import Link from "next/link";
import Header from "../../components/Header";
import { stories } from "../../data/stories";
import {
  StoryVisual,
  getScoreColor,
  getScoreLabel,
  getScoreTextColor,
} from "../../components/StoryVisual";
import React from "react";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const storyIndex = stories.findIndex((story) => story.id === slug);
  const story = stories[storyIndex];

  if (!story) {
    return (
      <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
        <Header />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-black">
            Story not found
          </h1>

          <Link
            href="/browse"
            className="mt-4 block font-bold underline"
          >
            Back to Browse
          </Link>
        </section>
      </main>
    );
  }

  const previousStory = stories[storyIndex - 1];
  const nextStory = stories[storyIndex + 1];

  const relatedStories = stories
    .filter((s) => s.id !== story.id && s.city === story.city)
    .slice(0, 3);

  const filler = [...stories]
    .filter((s) => s.id !== story.id && !relatedStories.includes(s))
    .sort((a, b) => b.score - a.score);

  const moreStories = [...relatedStories, ...filler].slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#171717]">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/browse"
          className="text-sm font-black uppercase tracking-widest hover:underline"
        >
          ← Back to Browse
        </Link>

        <div className="mt-10 grid gap-8 md:grid-cols-[240px_1fr]">
          <StoryVisual story={story} size="lg" />

          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#FF3E7F]">
              {story.date} · {story.city}, Florida
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
              {story.title}
            </h2>

            <div className="mt-8 flex items-center gap-4 border-y-2 border-[#171717] py-6">
              <div
                className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-[#171717]"
                style={{ backgroundColor: getScoreColor(story.score) }}
              >
                <p
                  className="text-2xl font-black leading-none"
                  style={{ color: getScoreTextColor(story.score) }}
                >
                  {story.score}
                </p>
                <p
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: getScoreTextColor(story.score) }}
                >
                  /10
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-widest">
                  Florida Man Score
                </p>
                <p className="text-sm font-bold text-gray-600">
                  {getScoreLabel(story.score)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-lg leading-8">
          {story.contentNote && (
            <div className="mb-6 border-2 border-[#B91C1C] bg-[#FEE2E2] px-4 py-3 text-base text-[#7F1D1D]">
              <p className="text-xs font-black uppercase tracking-widest">
                ⚠️ Content Note
              </p>
              <p className="mt-1 font-semibold">{story.contentNote}</p>
            </div>
          )}

          <p className="font-semibold">{story.description}</p>

          {story.fullStory && (
            <p className="mt-6 text-gray-700">{story.fullStory}</p>
          )}

          <div className="mt-10 border-t-2 border-[#171717] pt-6">
            <p className="text-xs font-black uppercase tracking-widest">
              Original Source
            </p>

            <a
              href={story.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-black text-[#00B8A9] underline hover:no-underline"
            >
              {story.source} ↗
            </a>
          </div>
        </div>

        {(previousStory || nextStory) && (
          <div className="mt-12 grid gap-4 border-t-4 border-[#171717] pt-8 sm:grid-cols-2">
            {previousStory && (
              <Link
                href={`/story/${previousStory.id}`}
                className="border-2 border-[#171717] bg-white p-4 shadow-[4px_4px_0px_#171717] transition-transform hover:-translate-y-0.5"
              >
                <p className="text-xs font-black uppercase tracking-widest text-[#00B8A9]">
                  ← Previous
                </p>
                <p className="mt-1 font-black leading-snug">
                  {previousStory.title}
                </p>
              </Link>
            )}

            {nextStory && (
              <Link
                href={`/story/${nextStory.id}`}
                className="border-2 border-[#171717] bg-white p-4 text-right shadow-[4px_4px_0px_#171717] transition-transform hover:-translate-y-0.5 sm:col-start-2"
              >
                <p className="text-xs font-black uppercase tracking-widest text-[#FF3E7F]">
                  Next →
                </p>
                <p className="mt-1 font-black leading-snug">
                  {nextStory.title}
                </p>
              </Link>
            )}
          </div>
        )}

        {moreStories.length > 0 && (
          <section className="mt-16">
            <h3 className="border-b-4 border-[#171717] pb-3 text-2xl font-black uppercase">
              More Florida Man Stories
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {moreStories.map((s) => (
                <Link
                  key={s.id}
                  href={`/story/${s.id}`}
                  className="block border-2 border-[#171717] bg-white p-4 shadow-[4px_4px_0px_#171717] transition-transform hover:-translate-y-0.5"
                >
                  <StoryVisual story={s} size="md" />

                  <p className="mt-3 text-xs font-black uppercase tracking-widest text-[#FF3E7F]">
                    {s.city}
                  </p>

                  <p className="mt-1 font-black leading-snug">{s.title}</p>

                  <p
                    className="mt-2 text-sm font-black"
                    style={{ color: getScoreColor(s.score) }}
                  >
                    {s.score}/10
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
