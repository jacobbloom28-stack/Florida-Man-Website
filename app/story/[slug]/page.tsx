import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import { stories, storyIndexById, RUBRIC, getCategoryBreakdown } from "../../data/stories";
import {
  StoryVisual,
  ScoreBadge,
  getScoreColor,
} from "../../components/StoryVisual";
import { getStoryTimestamp } from "../../lib/storyDate";
import { SITE_NAME, SITE_URL } from "../../lib/siteConfig";
import { jsonLdScript } from "../../lib/jsonLd";
import React from "react";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const storyIndex = storyIndexById.get(slug);
  const story = storyIndex !== undefined ? stories[storyIndex] : undefined;

  if (!story) {
    return { title: "Story Not Found" };
  }

  const url = `/story/${story.id}`;
  const publishedTime = new Date(getStoryTimestamp(story)).toISOString();

  return {
    title: story.title,
    description: story.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.description,
      url,
      publishedTime,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const storyIndex = storyIndexById.get(slug) ?? -1;
  const story = stories[storyIndex];

  if (!story) {
    return (
      <main className="min-h-screen bg-paper text-ink">
        <Header />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-bold">We couldn&apos;t find that story</h1>

          <p className="mt-3 text-ink-soft">
            Either the link&apos;s wrong, or this one was too wild even for our archive.
          </p>

          <Link href="/browse" className="mt-4 inline-block font-medium text-sunset hover:text-sunset-dark">
            Back to browse
          </Link>
        </section>
      </main>
    );
  }

  const previousStory = stories[storyIndex - 1];
  const nextStory = stories[storyIndex + 1];
  const categoryScores = getCategoryBreakdown(story);

  const relatedStories = stories
    .filter((s) => s.id !== story.id && s.city === story.city)
    .slice(0, 3);

  const filler = stories
    .filter((s) => s.id !== story.id && !relatedStories.includes(s))
    .sort((a, b) => b.score - a.score);

  const moreStories = [...relatedStories, ...filler].slice(0, 3);

  const storyUrl = `${SITE_URL}/story/${story.id}`;
  const publishedTime = new Date(getStoryTimestamp(story)).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.description,
    datePublished: publishedTime,
    dateModified: publishedTime,
    image: [`${storyUrl}/opengraph-image`],
    url: storyUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": storyUrl },
    articleSection: story.city,
    isBasedOn: story.sourceUrl,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/browse"
          className="text-sm font-medium text-ink-soft hover:text-ink"
        >
          ← Back to browse
        </Link>

        <div className="mt-8 grid gap-8 rounded-3xl bg-white p-6 shadow-xl shadow-ink/10 ring-1 ring-line md:grid-cols-[240px_1fr] md:p-8">
          <StoryVisual story={story} size="lg" />

          <div>
            <p className="text-sm font-medium text-flamingo">
              {story.date} · {story.city}, Florida
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {story.title}
            </h2>

            <div className="mt-6 border-t border-line pt-6">
              <ScoreBadge score={story.score} shrink />
            </div>
          </div>
        </div>

        <div className="mt-10 text-lg leading-8">
          {story.contentNote && (
            <div className="mb-6 rounded-2xl bg-flamingo/10 px-5 py-4 ring-1 ring-flamingo/25">
              <p className="flex items-center gap-2 text-sm font-semibold text-flamingo">
                ⚠️ Content note
              </p>
              <p className="mt-1.5 text-base text-ink">{story.contentNote}</p>
            </div>
          )}

          <p className="font-medium text-ink">{story.description}</p>

          {story.fullStory && (
            <p className="mt-6 text-ink-soft">{story.fullStory}</p>
          )}

          <div className="mt-10 rounded-2xl bg-paper-soft p-6">
            <p className="text-sm font-semibold text-ink">Score breakdown</p>

            <div className="mt-5 space-y-4">
              {RUBRIC.map((row) => {
                const value = categoryScores[row.category] ?? 0;
                const pct = (value / row.points) * 100;

                return (
                  <div key={row.category}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm font-medium">
                      <span>{row.category}</span>
                      <span style={{ color: row.color }}>
                        {value}/{row.points}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: row.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">Original source</p>

            <a
              href={story.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold text-lagoon hover:underline"
            >
              {story.source} ↗
            </a>
          </div>
        </div>

        {(previousStory || nextStory) && (
          <div className="mt-12 grid gap-4 pt-8 sm:grid-cols-2">
            {previousStory && (
              <Link
                href={`/story/${previousStory.id}`}
                className="rounded-2xl bg-white p-4 shadow-md shadow-ink/5 ring-1 ring-line transition-transform hover:-translate-y-0.5"
              >
                <p className="text-xs font-medium text-lagoon">← Previous</p>
                <p className="mt-1 font-semibold leading-snug">
                  {previousStory.title}
                </p>
              </Link>
            )}

            {nextStory && (
              <Link
                href={`/story/${nextStory.id}`}
                className="rounded-2xl bg-white p-4 text-right shadow-md shadow-ink/5 ring-1 ring-line transition-transform hover:-translate-y-0.5 sm:col-start-2"
              >
                <p className="text-xs font-medium text-flamingo">Next →</p>
                <p className="mt-1 font-semibold leading-snug">
                  {nextStory.title}
                </p>
              </Link>
            )}
          </div>
        )}

        {moreStories.length > 0 && (
          <section className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight">
              More Florida Man stories
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {moreStories.map((s) => (
                <Link
                  key={s.id}
                  href={`/story/${s.id}`}
                  className="block rounded-2xl bg-white p-4 shadow-md shadow-ink/5 ring-1 ring-line transition-transform hover:-translate-y-0.5"
                >
                  <StoryVisual story={s} size="md" />

                  <p className="mt-3 text-xs font-medium text-flamingo">
                    {s.city}
                  </p>

                  <p className="mt-1 font-semibold leading-snug">{s.title}</p>

                  <p
                    className="mt-2 text-sm font-bold"
                    style={{ color: getScoreColor(s.score) }}
                  >
                    {s.score}/100
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
