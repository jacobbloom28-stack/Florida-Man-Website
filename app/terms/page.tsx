import type { Metadata } from "next";
import Header from "../components/Header";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for using Florida Man of the Day.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-medium text-flamingo">Legal</p>

        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
          Terms &amp; Conditions
        </h1>

        <p className="mt-4 text-sm text-ink-soft">Last updated September 2026.</p>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-xl font-bold text-ink">Using this site</h2>
            <p className="mt-2">
              Florida Man of the Day is a free, satirical archive of real
              news stories about absurd incidents in Florida. By using the
              site, you agree to these terms. If you don&apos;t agree with
              them, the only real remedy we can offer is to not use the site,
              which is a shame, but understandable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">The content on this site</h2>
            <p className="mt-2">
              Every story is sourced from real news reporting, and each story
              links to its original source. We check each story against the
              standard described on the{" "}
              <a
                href="/about"
                className="font-semibold text-sunset-dark underline underline-offset-2"
              >
                About
              </a>{" "}
              page before it&apos;s added, but we&apos;re not the original
              reporters, and we can&apos;t guarantee that every fact in a
              linked source article is correct. If you spot an error in one
              of our summaries, or believe a story shouldn&apos;t be here,
              you&apos;re welcome to point it out through the{" "}
              <a
                href="/suggest"
                className="font-semibold text-sunset-dark underline underline-offset-2"
              >
                Suggest
              </a>{" "}
              page.
            </p>
            <p className="mt-3">
              The Florida Man score shown on every story is our own editorial
              rating (see the rubric on the About page). It&apos;s a
              subjective, for-entertainment assessment of how absurd,
              unexpected, and unmistakably Florida a story is, not a factual
              claim about the story itself.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Submitting a story</h2>
            <p className="mt-2">
              If you submit a story link through the Suggest page, you&apos;re
              confirming that, as far as you know, the link points to real
              news reporting and not to fabricated or defamatory content.
              Submitting a link doesn&apos;t guarantee it will be added:
              every submission goes through the same verification standard
              as the rest of the archive, and most submissions that don&apos;t
              meet it are simply discarded rather than published.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">No warranty</h2>
            <p className="mt-2">
              This site is provided as-is, for entertainment purposes,
              without warranties of any kind. We don&apos;t guarantee the
              site will always be available, error-free, or uninterrupted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Not affiliated with Florida</h2>
            <p className="mt-2">
              This site is an independent, unofficial project. It is not
              affiliated with, endorsed by, or operated on behalf of the
              State of Florida, any Florida government agency, or any news
              outlet whose reporting we link to.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Changes to these terms</h2>
            <p className="mt-2">
              If these terms change, we&apos;ll update this page and the date
              above. Continuing to use the site after a change means you
              accept the updated terms.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
