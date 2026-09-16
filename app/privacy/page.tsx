import type { Metadata } from "next";
import Header from "../components/Header";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Florida Man of the Day collects when you use the site, and what it doesn't.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-medium text-flamingo">Legal</p>

        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-ink-soft">Last updated September 2026.</p>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-xl font-bold text-ink">The short version</h2>
            <p className="mt-2">
              There are no accounts on this site, no login, and no tracking
              or advertising scripts. The only information we ever receive
              from you is what you choose to type into the story link(s) and
              optional note fields on the{" "}
              <a
                href="/suggest"
                className="font-semibold text-sunset-dark underline underline-offset-2"
              >
                Suggest
              </a>{" "}
              page, and standard web server logs that any hosted site
              generates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">
              What we collect from the Suggest form
            </h2>
            <p className="mt-2">
              When you submit a story link, we store the URL(s) you paste and
              any optional note you add in a private queue, so an automated
              review process can check the story before anything is added to
              the site. We don&apos;t ask for your name, email, or any other
              identifying information, and the form doesn&apos;t require an
              account. Submissions that pass verification become part of the
              public story archive; submissions that don&apos;t pass are
              simply discarded.
            </p>
            <p className="mt-3">
              The form also includes a hidden field used to catch automated
              spam submissions. Real visitors never see or need to interact
              with it, and it isn&apos;t used to identify or track you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">
              What we don&apos;t do
            </h2>
            <p className="mt-2">
              We don&apos;t use cookies for tracking, analytics scripts, ad
              networks, or any third-party service that profiles visitors
              across sites. We don&apos;t sell or share data with anyone,
              because we don&apos;t collect enough of it to sell in the first
              place.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Server logs</h2>
            <p className="mt-2">
              Like any website, ours is hosted by an infrastructure provider
              that automatically logs basic technical information for every
              request (such as IP address, browser type, and the page
              requested) for security and reliability purposes. This is
              standard web hosting behavior, not something specific to this
              site, and we don&apos;t separately access or analyze it for
              tracking purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Children&apos;s privacy</h2>
            <p className="mt-2">
              This site isn&apos;t directed at children, and we don&apos;t
              knowingly collect information from anyone under 13.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Changes to this policy</h2>
            <p className="mt-2">
              If what we collect ever changes, we&apos;ll update this page
              and the date above.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
