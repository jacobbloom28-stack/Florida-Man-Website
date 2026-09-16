import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/90">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-lg font-semibold text-white">Florida Man</p>
            <p className="mt-1 max-w-xs text-sm text-white/50">
              Funny, verified, and unmistakably Florida. A new story every
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
            <Link href="/suggest" className="transition-colors hover:text-citrus">
              Suggest
            </Link>
            <Link href="/about" className="transition-colors hover:text-citrus">
              About
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/35">
            Every story is sourced from real news reporting. Not officially
            affiliated with the State of Florida (thankfully).
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/40">
            <Link href="/privacy" className="transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/70">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
