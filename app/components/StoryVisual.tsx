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
    label: "Gator Alert",
    gradient: "from-[#0F9B6E] to-[#00B8A9]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/03/American_Alligator.jpg",
      credit: "Postdlf / Wikimedia Commons (CC BY-SA 3.0)",
    },
  },
  {
    test: /horse|snake|hamster wheel/i,
    emoji: "🐴",
    label: "Wild Animal",
    gradient: "from-[#8C5A2B] to-[#D9A441]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Horse3.jpg",
      credit: "Joshua Ganderson / Wikimedia Commons (CC BY 2.0)",
    },
  },
  {
    test: /spider-?man|bunny|tutu|mask|costume/i,
    emoji: "🎭",
    label: "Costume Chaos",
    gradient: "from-[#7B2FF7] to-[#FF3E7F]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Carnival_mask.jpg",
      credit: "Heterotrofo / Wikimedia Commons (CC0)",
    },
  },
  { test: /naked|nude|prosthetic/i, emoji: "🍑", label: "Bare Necessities", gradient: "from-[#FF3E7F] to-[#FFC93C]" },
  {
    test: /gun|machete|knife|armed|weapon/i,
    emoji: "🔪",
    label: "Armed & Alarming",
    gradient: "from-[#B91C1C] to-[#FF6B35]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Handcuffs_1.jpg",
      credit: "SimmeD / Wikimedia Commons (CC BY-SA 4.0)",
    },
  },
  { test: /\bmeth\b|marijuana|\bdrugs?\b|clonazepam/i, emoji: "💊", label: "Substance Situation", gradient: "from-[#5B21B6] to-[#7B2FF7]" },
  { test: /lawn mower|scooter|helicopter|\btrucks?\b|\bmph\b|\bcars?\b|vehicle/i, emoji: "🚗", label: "Vehicular Villainy", gradient: "from-[#FF6B35] to-[#FFC93C]" },
  {
    test: /steal\w*|stolen|theft|burglary|\brob\w*|\bcoins?\b|avocado/i,
    emoji: "💰",
    label: "Petty Heist",
    gradient: "from-[#FFC93C] to-[#FF6B35]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Shopping_cart.jpg",
      credit: "Guanaco / Wikimedia Commons (CC0)",
    },
  },
  {
    test: /police|officers?|deput\w*|\bcops?\b|\b911\b|bomb|carjack/i,
    emoji: "🚨",
    label: "Cop Trouble",
    gradient: "from-[#1D4ED8] to-[#FF3E7F]",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Police_car_with_emergency_lights_on.jpg",
      credit: "Scott Davidson / Wikimedia Commons (CC BY 2.0)",
    },
  },
  {
    test: /ocean|atlantic|boat|water/i,
    emoji: "🌊",
    label: "High Seas",
    gradient: "from-[#0891B2] to-[#00B8A9]",
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
  gradient: "from-[#FF6B35] to-[#FF3E7F]",
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
  if (score >= 90) return "#FF3E7F";
  if (score >= 80) return "#FF6B35";
  if (score >= 65) return "#FFC93C";
  if (score >= 50) return "#00B8A9";
  return "#6B7280";
}

export function getScoreTextColor(score: number) {
  return score >= 65 && score < 80 ? "#171717" : "#ffffff";
}

export function getScoreLabel(score: number) {
  if (score >= 90) return "Legendary";
  if (score >= 80) return "Certified Wild";
  if (score >= 65) return "Pretty Wild";
  if (score >= 50) return "Classic Florida";
  return "Not Actually Funny";
}

const SIZES = {
  sm: { box: "h-16 w-16", emoji: "text-3xl", label: "", credit: false },
  md: { box: "aspect-square w-full", emoji: "text-6xl", label: "text-[10px]", credit: false },
  lg: { box: "aspect-[4/3] w-full", emoji: "text-8xl", label: "text-xs", credit: true },
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
      className={`relative flex ${sizing.box} shrink-0 items-center justify-center overflow-hidden border-4 border-[#171717] bg-gradient-to-br ${visual.gradient} shadow-[6px_6px_0px_#171717]`}
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
            className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-30`}
          />
        </>
      ) : (
        <span className={`relative ${sizing.emoji} drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)]`}>
          {visual.emoji}
        </span>
      )}

      {sizing.label && (
        <span
          className={`absolute inset-x-0 bottom-0 truncate bg-black/70 px-2 py-1 text-center ${sizing.label} font-black uppercase tracking-widest text-white`}
        >
          {visual.label}
        </span>
      )}

      {sizing.credit && visual.photo && (
        <span className="absolute right-1 top-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white/80">
          📷 {visual.photo.credit}
        </span>
      )}
    </div>
  );
}
