"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_LINKS = [
  { href: "/", label: "Today" },
  { href: "/browse", label: "Browse" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🐊</span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-ink">
              Florida Man
            </span>
            <span className="block text-xs text-ink-soft">
              The daily archive of Florida
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 transition-colors ${
                  active
                    ? "bg-gradient-to-r from-sunset/15 to-flamingo/15 text-sunset-dark"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
