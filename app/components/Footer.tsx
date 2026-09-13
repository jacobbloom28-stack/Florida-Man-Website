import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/90">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold text-white">
              <span>🐊</span> Florida Man
            </p>
            <p className="mt-1 max-w-xs text-sm text-white/50">
              Funny, verified, and unmistakably Florida — a new story every
              day.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/70">
            <Link href="/" className="transition-colors hover:text-citrus">
              Today
            </Link>
            <Link href="/browse" className="transition-colors hover:text-citrus">
              Browse
            </Link>
            <Link href="/calendar" className="transition-colors hover:text-citrus">
              Calendar
            </Link>
            <Link href="/about" className="transition-colors hover:text-citrus">
              About
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/35">
            Every story is sourced from real news reporting. Not officially
            affiliated with the State of Florida (thankfully).
          </p>
        </div>
      </div>
    </footer>
  );
}
