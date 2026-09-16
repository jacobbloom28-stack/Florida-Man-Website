"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_LINKS = [
  { href: "/", label: "Today" },
  { href: "/browse", label: "Browse" },
  { href: "/suggest", label: "Suggest" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🐊</span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-ink">
              Florida Man
            </span>
            <span className="hidden text-xs text-ink-soft sm:block">
              Florida&apos;s daily dose of chaos
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 text-sm font-medium sm:gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-2.5 py-2 transition-colors sm:px-3.5 ${
                  active
                    ? "bg-sunset text-ink"
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
