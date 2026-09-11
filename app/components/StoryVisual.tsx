import Image from "next/image";
import type { Story } from "../data/stories";

type Photo = {
  url: string;
  credit: string;
};

type Category = {
  test: RegExp;
  emoji: string;
  label: string;
  gradient: string;
  photo?: Photo;
};

// Real, CC-licensed photos from Wikimedia Commons — generic scene photography
// (gators, cruisers, coastline) rather than mugshots of the real people
// involved, since those aren't ours to republish.
const CATEGORIES: Category[] = [
  {
    test: /\balligators?\b|\bgators?\b|\bcrocs?\b|crocodile/i,
    emoji: "🐊",
    label: "Gator alert",
    gradient: "from-[#0B8F7E] to-[#14C2A8]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/03/American_Alligator.jpg",
      credit: "Postdlf / Wikimedia Commons (CC BY-SA 3.0)",
    },
  },
  {
    test: /horse|snake|hamster wheel/i,
    emoji: "🐴",
    label: "Wild animal",
    gradient: "from-[#A9782F] to-[#E3A93F]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Horse3.jpg",
      credit: "Joshua Ganderson / Wikimedia Commons (CC BY 2.0)",
    },
  },
  {
    test: /spider-?man|bunny|tutu|mask|costume/i,
    emoji: "🎭",
    label: "Costume chaos",
    gradient: "from-[#8B5CF6] to-[#EF3F7B]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Carnival_mask.jpg",
      credit: "Heterotrofo / Wikimedia Commons (CC0)",
    },
  },
  { test: /naked|nude|prosthetic/i, emoji: "🍑", label: "Bare necessities", gradient: "from-[#EF3F7B] to-[#FFBE3D]" },
  {
    test: /gun|machete|knife|armed|weapon/i,
    emoji: "🔪",
    label: "Armed & alarming",
    gradient: "from-[#C81E3A] to-[#FF5A36]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Handcuffs_1.jpg",
      credit: "SimmeD / Wikimedia Commons (CC BY-SA 4.0)",
    },
  },
  { test: /\bmeth\b|marijuana|\bdrugs?\b|clonazepam/i, emoji: "💊", label: "Substance situation", gradient: "from-[#6D28D9] to-[#9333EA]" },
  { test: /lawn mower|scooter|helicopter|\btrucks?\b|\bmph\b|\bcars?\b|vehicle/i, emoji: "🚗", label: "Vehicular villainy", gradient: "from-[#FF5A36] to-[#FFBE3D]" },
  {
    test: /steal\w*|stolen|theft|burglary|\brob\w*|\bcoins?\b|avocado/i,
    emoji: "💰",
    label: "Petty heist",
    gradient: "from-[#FFBE3D] to-[#FF8A3D]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Shopping_cart.jpg",
      credit: "Guanaco / Wikimedia Commons (CC0)",
    },
  },
  {
    test: /police|officers?|deput\w*|\bcops?\b|\b911\b|bomb|carjack/i,
    emoji: "🚨",
    label: "Cop trouble",
    gradient: "from-[#2563EB] to-[#EF3F7B]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Police_car_with_emergency_lights_on.jpg",
      credit: "Scott Davidson / Wikimedia Commons (CC BY 2.0)",
    },
  },
  {
    test: /ocean|atlantic|boat|water/i,
    emoji: "🌊",
    label: "High seas",
    gradient: "from-[#0EA5C7] to-[#0FA895]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sunset_on_coast_of_Florida.jpg",
      credit: "Don Miller / Wikimedia Commons (CC BY 2.0)",
    },
  },
];

const DEFAULT_CATEGORY: Category = {
  test: /.*/,
  emoji: "🌴",
  label: "Florida Man",
  gradient: "from-[#FF5A36] to-[#EF3F7B]",
  photo: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Palm_Coast_Sunset.jpg",
    credit: "Andyrkellergmail / Wikimedia Commons (CC BY-SA 4.0)",
  },
};

type StoryLike = Pick<Story, "title" | "description" | "fullStory">;

export function getStoryVisual(story: StoryLike) {
  const text = `${story.title} ${story.description} ${story.fullStory}`;
  return CATEGORIES.find((category) => category.test.test(text)) ?? DEFAULT_CATEGORY;
}

// Score is out of 100 — the literal sum of a story's six rubric categories.
export function getScoreColor(score: number) {
  if (score >= 90) return "#EF3F7B";
  if (score >= 80) return "#FF5A36";
  if (score >= 65) return "#FFBE3D";
  if (score >= 50) return "#0FA895";
  return "#9AA1A8";
}

export function getScoreTextColor(score: number) {
  return score >= 65 && score < 80 ? "#17191c" : "#ffffff";
}

export function getScoreLabel(score: number) {
  if (score >= 90) return "Legendary";
  if (score >= 80) return "Certified wild";
  if (score >= 65) return "Pretty wild";
  if (score >= 50) return "Classic Florida";
  return "Not actually funny";
}

// The circular score + rating readout shown on both the homepage feature
// card and the story page. Pulled out once so score styling only has one
// place to change, and any future page (browse cards, calendar) can reuse
// it instead of re-deriving the same markup.
export function ScoreBadge({
  score,
  label = "Florida Man score",
  shrink = false,
}: {
  score: number;
  label?: string;
  shrink?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-20 w-20 flex-col items-center justify-center rounded-full shadow-lg shadow-ink/10 ring-4 ring-paper ${
          shrink ? "shrink-0" : ""
        }`}
        style={{ backgroundColor: getScoreColor(score) }}
      >
        <p
          className="text-2xl font-bold leading-none"
          style={{ color: getScoreTextColor(score) }}
        >
          {score}
        </p>
        <p
          className="text-[10px] font-medium opacity-80"
          style={{ color: getScoreTextColor(score) }}
        >
          / 100
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <p className="font-semibold text-ink">{getScoreLabel(score)}</p>
      </div>
    </div>
  );
}

const SIZES = {
  sm: { box: "h-16 w-16 rounded-xl", emoji: "text-3xl", label: false, credit: false },
  md: { box: "aspect-square w-full rounded-2xl", emoji: "text-6xl", label: true, credit: false },
  lg: { box: "aspect-[4/3] w-full rounded-3xl", emoji: "text-8xl", label: true, credit: true },
} as const;

export function StoryVisual({
  story,
  size = "md",
}: {
  story: StoryLike;
  size?: keyof typeof SIZES;
}) {
  const visual = getStoryVisual(story);
  const sizing = SIZES[size];

  return (
    <div
      className={`relative flex ${sizing.box} shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br shadow-md shadow-ink/10 ring-1 ring-ink/5 ${visual.gradient}`}
    >
      {visual.photo ? (
        <>
          <Image
            src={visual.photo.url}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br opacity-35 ${visual.gradient}`}
          />
        </>
      ) : (
        <span className={`relative ${sizing.emoji} drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]`}>
          {visual.emoji}
        </span>
      )}

      {sizing.label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {visual.label}
        </span>
      )}

      {sizing.credit && visual.photo && (
        <span className="absolute right-2 top-2 rounded-full bg-ink/50 px-2 py-0.5 text-[10px] text-white/80">
          📷 {visual.photo.credit}
        </span>
      )}
    </div>
  );
}
