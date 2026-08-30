"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Today" },
  { href: "/browse", label: "Browse" },
  { href: "/calendar", label: "Calendar" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b-4 border-[#171717] bg-[#f5f1e8]">
      <div className="h-2 w-full bg-gradient-to-r from-[#FF3E7F] via-[#FFC93C] to-[#00B8A9]" />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="block">
          <h1 className="text-2xl font-black tracking-tight">🐊 FLORIDA MAN</h1>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#171717]/60">
            The Daily Archive of Florida
          </p>
        </Link>

        <nav className="flex gap-6 text-sm font-bold">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 uppercase tracking-wide transition-colors ${
                  active ? "text-[#FF3E7F]" : "hover:text-[#00B8A9]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#FF3E7F]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
