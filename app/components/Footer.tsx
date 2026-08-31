import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-[#171717] bg-[#171717] text-white">
      <div className="h-2 w-full bg-gradient-to-r from-[#00B8A9] via-[#FFC93C] to-[#FF3E7F]" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xl font-black tracking-tight">🐊 FLORIDA MAN</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
              Funny. Verified. Florida.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-wide">
            <Link href="/" className="transition-colors hover:text-[#FFC93C]">
              Today
            </Link>
            <Link href="/browse" className="transition-colors hover:text-[#FFC93C]">
              Browse
            </Link>
            <Link href="/calendar" className="transition-colors hover:text-[#FFC93C]">
              Calendar
            </Link>
            <Link href="/about" className="transition-colors hover:text-[#FFC93C]">
              About
            </Link>
          </nav>
        </div>

        <p className="mt-8 text-xs text-white/40">
          Every story is sourced from real news reporting. Not officially
          affiliated with the State of Florida (thankfully).
        </p>

        <p className="mt-2 text-xs text-white/30">
          Photos via Wikimedia Commons, licensed CC0 / CC BY / CC BY-SA,
          credited on each image: American Alligator (Postdlf), Horse3
          (Joshua Ganderson), Handcuffs 1 (SimmeD), Police car with emergency
          lights on (Scott Davidson), Sunset on coast of Florida (Don
          Miller), Palm Coast Sunset (Andyrkellergmail), American Flamingo
          (Charles J. Sharp), Everglades Swamp (Hein Mück), Shopping Cart
          (Guanaco), Carnival Mask (Heterotrofo).
        </p>
      </div>
    </footer>
  );
}
