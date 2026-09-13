import type { CSSProperties } from "react";
import type { Story } from "../data/stories";

type Pattern = "dots" | "rings" | "stripes" | "sunburst";

type Category = {
  test: RegExp;
  emoji: string;
  label: string;
  gradient: string;
  pattern: Pattern;
};

// Bold illustrated cards instead of stock photography — a saturated,
// multi-stop Florida-sunset gradient per category plus a light CSS-only
// texture overlay (no images, no external requests, no per-instance id
// collisions from repeated <svg><pattern> defs across a list of cards).
const CATEGORIES: Category[] = [
  {
    test: /\balligators?\b|\bgators?\b|\bcrocs?\b|crocodile/i,
    emoji: "🐊",
    label: "Gator alert",
    gradient: "from-[#0EA5A0] via-[#00D2A6] to-[#14E8B0]",
    pattern: "rings",
  },
  {
    test: /horse|snake|hamster wheel/i,
    emoji: "🐴",
    label: "Wild animal",
    gradient: "from-[#D97706] via-[#F59E0B] to-[#FCD34D]",
    pattern: "dots",
  },
  {
    test: /spider-?man|bunny|tutu|mask|costume/i,
    emoji: "🎭",
    label: "Costume chaos",
    gradient: "from-[#9333EA] via-[#C026D3] to-[#FF2E7E]",
    pattern: "stripes",
  },
  {
    test: /naked|nude|prosthetic/i,
    emoji: "🍑",
    label: "Bare necessities",
    gradient: "from-[#FF2E7E] via-[#FF6B4A] to-[#FFC400]",
    pattern: "sunburst",
  },
  {
    test: /gun|machete|knife|armed|weapon/i,
    emoji: "🔪",
    label: "Armed & alarming",
    gradient: "from-[#B91C1C] via-[#EF4444] to-[#FF5A1F]",
    pattern: "stripes",
  },
  {
    test: /\bmeth\b|marijuana|\bdrugs?\b|clonazepam/i,
    emoji: "💊",
    label: "Substance situation",
    gradient: "from-[#6D28D9] via-[#9333EA] to-[#C026D3]",
    pattern: "dots",
  },
  {
    test: /lawn mower|scooter|helicopter|\btrucks?\b|\bmph\b|\bcars?\b|vehicle/i,
    emoji: "🚗",
    label: "Vehicular villainy",
    gradient: "from-[#FF5A1F] via-[#FF8A00] to-[#FFC400]",
    pattern: "sunburst",
  },
  {
    test: /steal\w*|stolen|theft|burglary|\brob\w*|\bcoins?\b|avocado/i,
    emoji: "💰",
    label: "Petty heist",
    gradient: "from-[#FFC400] via-[#FF8A00] to-[#FF5A1F]",
    pattern: "dots",
  },
  {
    test: /police|officers?|deput\w*|\bcops?\b|\b911\b|bomb|carjack/i,
    emoji: "🚨",
    label: "Cop trouble",
    gradient: "from-[#0072FF] via-[#3E8EFF] to-[#FF2E7E]",
    pattern: "sunburst",
  },
  {
    test: /ocean|atlantic|boat|water/i,
    emoji: "🌊",
    label: "High seas",
    gradient: "from-[#00B4E0] via-[#00C2A8] to-[#0EA5A0]",
    pattern: "rings",
  },
];

const DEFAULT_CATEGORY: Category = {
  test: /.*/,
  emoji: "🌴",
  label: "Florida Man",
  gradient: "from-[#FF5A1F] via-[#FF2E7E] to-[#8B5CF6]",
  pattern: "sunburst",
};

type StoryLike = Pick<Story, "title" | "description" | "fullStory">;

export function getStoryVisual(story: StoryLike) {
  const text = `${story.title} ${story.description} ${story.fullStory}`;
  return CATEGORIES.find((category) => category.test.test(text)) ?? DEFAULT_CATEGORY;
}

// Score is out of 100 — the literal sum of a story's six rubric categories.
export function getScoreColor(score: number) {
  if (score >= 90) return "#FF2E7E";
  if (score >= 80) return "#FF5A1F";
  if (score >= 65) return "#FFC400";
  if (score >= 50) return "#00C2A8";
  return "#9AA1A8";
}

export function getScoreTextColor(score: number) {
  return score >= 65 && score < 80 ? "#1a1523" : "#ffffff";
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

// A tiled CSS-only texture (no <svg><pattern> defs, so no id collisions when
// dozens of these render at once on the browse/calendar list) layered behind
// the big emoji to give each illustrated card some visual texture instead of
// a flat gradient.
function CardTexture({ pattern }: { pattern: Pattern }) {
  const style: CSSProperties =
    pattern === "dots"
      ? {
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 2px, transparent 2.5px)",
          backgroundSize: "16px 16px",
        }
      : pattern === "rings"
        ? {
            backgroundImage:
              "radial-gradient(circle, transparent 52%, rgba(255,255,255,0.3) 53% 58%, transparent 59%)",
            backgroundSize: "30px 30px",
          }
        : pattern === "stripes"
          ? {
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 6px, transparent 6px, transparent 16px)",
            }
          : {
              backgroundImage:
                "repeating-conic-gradient(rgba(255,255,255,0.25) 0deg 6deg, transparent 6deg 18deg)",
            };

  return <div aria-hidden="true" className="absolute inset-0" style={style} />;
}

const SIZES = {
  sm: { box: "h-16 w-16 rounded-xl", emoji: "text-3xl", label: false },
  md: { box: "aspect-square w-full rounded-2xl", emoji: "text-6xl", label: true },
  lg: { box: "aspect-[4/3] w-full rounded-3xl", emoji: "text-8xl", label: true },
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
      <CardTexture pattern={visual.pattern} />

      <span className={`relative ${sizing.emoji} drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]`}>
        {visual.emoji}
      </span>

      {sizing.label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {visual.label}
        </span>
      )}
    </div>
  );
}
