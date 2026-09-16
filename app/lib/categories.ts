import type { Story } from "../data/stories";
import { getAnimalStories } from "./animalStories";

// Shared definitions for every browsable "category" on the site: the
// homepage chips and Browse's `?category=` filter both read from this one
// list, so a category can't drift out of sync between the two places it
// shows up. Most categories are matched against a story's title, city, and
// description (the same fields Browse's free-text search already checks),
// so a category behaves exactly like a pre-filled search rather than a
// second, inconsistent matching system.
export type CategoryId =
  | "animals"
  | "cop-trouble"
  | "substances"
  | "bare-necessities"
  | "petty-heists"
  | "costumes"
  | "fast-food";

export type Category = {
  id: CategoryId;
  label: string;
  chipLabel: string;
  filter: (stories: Story[]) => Story[];
};

function byText(re: RegExp) {
  return (stories: Story[]) =>
    stories.filter((story) => re.test(`${story.title} ${story.city} ${story.description}`));
}

export const CATEGORIES: Category[] = [
  {
    id: "animals",
    label: "Animal stories",
    chipLabel: "Animals",
    filter: getAnimalStories,
  },
  {
    id: "cop-trouble",
    label: "Cop trouble",
    chipLabel: "Cop trouble",
    filter: byText(/police/i),
  },
  {
    id: "substances",
    label: "Substance situations",
    chipLabel: "Substances",
    // Broader than a single "drugs" keyword — most stories name the actual
    // substance (meth, heroin, fentanyl...) rather than saying "drugs".
    filter: byText(
      /\bmeth\b|marijuana|\bdrugs?\b|clonazepam|heroin|cocaine|fentanyl|xanax|oxycodone|alprazolam|benzodiazepine/i
    ),
  },
  {
    id: "bare-necessities",
    label: "Bare necessities",
    chipLabel: "Bare necessities",
    filter: byText(/naked/i),
  },
  {
    id: "petty-heists",
    label: "Petty heists",
    chipLabel: "Petty heists",
    filter: byText(/steal/i),
  },
  {
    id: "costumes",
    label: "Costume chaos",
    chipLabel: "Costumes",
    // Broader than a single "mask" keyword — most costume stories describe
    // the actual getup (tutu, clown, mascot...) instead of saying "mask".
    filter: byText(/costume|mask|tutu|spider-?man|clown|mascot|bunny|inmate uniform|jail uniform/i),
  },
  {
    id: "fast-food",
    label: "Fast food fiascos",
    chipLabel: "Fast food",
    filter: byText(
      /taco bell|mcdonald|wendy's|wal-?mart|waffle house|dunkin|chuck e\.? cheese|publix|burger king|\bkfc\b|pizza hut|sonic drive|starbucks|denny's/i
    ),
  },
];

export function getCategoryById(id: string | null): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
