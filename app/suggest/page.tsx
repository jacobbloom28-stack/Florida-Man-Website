"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Header from "../components/Header";
import React from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function SuggestPage() {
  const [urlsText, setUrlsText] = useState("");
  const [note, setNote] = useState("");
  // Honeypot: real visitors never see or fill this field (hidden off-screen
  // below). Anything that fills it in is almost certainly a bot, so we
  // quietly no-op the submit instead of telling automated scripts why.
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const urls = urlsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (website.trim()) {
      // Honeypot tripped — pretend it worked, do nothing.
      setState("success");
      setMessage("Thanks! We'll take a look.");
      return;
    }

    if (urls.length === 0) {
      setState("error");
      setMessage("Paste at least one link first.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, note }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState("error");
        setMessage(
          data?.error ?? "Something went wrong submitting that. Try again in a bit."
        );
        return;
      }

      setState("success");
      setMessage(
        data?.count > 1
          ? `Got all ${data.count} links. We check every submission the same way we check everything else — verified ones show up on the site automatically.`
          : "Got it. We check every submission the same way we check everything else — verified ones show up on the site automatically."
      );
      setUrlsText("");
      setNote("");
    } catch {
      setState("error");
      setMessage("Something went wrong submitting that. Try again in a bit.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-paper text-ink">
      <Header />

      <section className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <p className="text-sm font-medium text-flamingo">Got a story?</p>

        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
          Suggest a Florida Man story
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Found a real news story too absurd not to share? Paste the link
          below. Every suggestion goes through the same{" "}
          <Link href="/about" className="font-semibold text-sunset-dark underline underline-offset-2">
            verification and scoring
          </Link>{" "}
          as everything else on this site — real reporting only, nothing
          tragic. Stories that pass show up on the site automatically, no
          account or sign-up needed.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="urls" className="block text-sm font-semibold text-ink">
              Story link(s)
            </label>
            <p className="mt-1 text-sm text-ink-soft">
              One per line. News articles only — no aggregator sites.
            </p>
            <textarea
              id="urls"
              required
              rows={5}
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              placeholder={"https://www.local10.com/news/...\nhttps://www.wftv.com/news/..."}
              className="mt-2 w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-sunset/40"
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-ink">
              Anything we should know? <span className="font-normal text-ink-soft">(optional)</span>
            </label>
            <input
              id="note"
              type="text"
              maxLength={280}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. this happened two blocks from my house"
              className="mt-2 w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-sunset/40"
            />
          </div>

          {/* Honeypot field — hidden from real visitors via CSS, not `hidden`,
              since some bots skip fields they detect are hidden that way. */}
          <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-full bg-gradient-to-r from-sunset to-flamingo px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sunset/20 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {state === "loading" ? "Submitting…" : "Submit"}
          </button>

          {message && (
            <p
              className={`text-sm font-medium ${
                state === "error" ? "text-flamingo" : "text-palm"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>

        <p className="mt-10 text-xs leading-relaxed text-ink-soft/70">
          We don&apos;t contact you about submissions and there&apos;s no way
          to check status here — verified stories just appear on the site
          (browse or check back on their date). Unverified ones quietly
          don&apos;t.
        </p>
      </section>
    </main>
  );
}
