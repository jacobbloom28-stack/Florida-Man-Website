type Tile = {
  emoji: string;
  gradient: string;
  rotate: string;
};

const LEFT_TILES: Tile[] = [
  { emoji: "🐊", gradient: "from-[#0EA5A0] to-[#14E8B0]", rotate: "-rotate-6" },
  { emoji: "🌴", gradient: "from-[#FF5A1F] to-[#FF2E7E]", rotate: "rotate-3" },
];

const RIGHT_TILES: Tile[] = [
  { emoji: "☀️", gradient: "from-[#FFC400] to-[#FF8A00]", rotate: "rotate-6" },
  { emoji: "🦩", gradient: "from-[#FF2E7E] to-[#8B5CF6]", rotate: "-rotate-3" },
];

// Decorative sticker rail pinned to the viewport edge on very wide screens
// only — bold illustrated tiles (not muted stock photography) matching the
// rest of the site's "no boring photos" visual language.
export function FloridaRail({ side }: { side: "left" | "right" }) {
  const tiles = side === "left" ? LEFT_TILES : RIGHT_TILES;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/4 z-0 hidden 2xl:flex 2xl:flex-col 2xl:gap-6 ${
        side === "left" ? "left-8" : "right-8"
      }`}
    >
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br text-5xl shadow-lg shadow-ink/15 ring-1 ring-white/40 ${tile.gradient} ${tile.rotate}`}
        >
          {tile.emoji}
        </div>
      ))}
    </div>
  );
}
