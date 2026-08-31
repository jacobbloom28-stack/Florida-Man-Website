import Image from "next/image";

type Tile = {
  url: string;
  rotate: string;
  credit: string;
};

const LEFT_TILES: Tile[] = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/American_Alligator.jpg",
    rotate: "-rotate-6",
    credit: "Postdlf (CC BY-SA 3.0)",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/72/American_flamingo_%28Phoenicopterus_ruber%29.JPG",
    rotate: "rotate-3",
    credit: "Charles J. Sharp (CC BY-SA 4.0)",
  },
];

const RIGHT_TILES: Tile[] = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Palm_Coast_Sunset.jpg",
    rotate: "rotate-6",
    credit: "Andyrkellergmail (CC BY-SA 4.0)",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Everglades_swamp.JPG",
    rotate: "-rotate-3",
    credit: "Hein Mück (CC BY-SA 3.0)",
  },
];

// Decorative real-Florida photo strip pinned to the viewport edge on very
// wide screens only — purely visual flavor, never overlaps main content.
export function FloridaRail({ side }: { side: "left" | "right" }) {
  const tiles = side === "left" ? LEFT_TILES : RIGHT_TILES;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/4 z-0 hidden 2xl:flex 2xl:flex-col 2xl:gap-6 ${
        side === "left" ? "left-8" : "right-8"
      }`}
    >
      {tiles.map((tile) => (
        <div
          key={tile.url}
          className={`relative h-28 w-24 overflow-hidden rounded-lg border-4 border-[#171717] bg-white shadow-[5px_5px_0px_#171717] ${tile.rotate}`}
        >
          <Image
            src={tile.url}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
