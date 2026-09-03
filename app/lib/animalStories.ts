import type { Story } from "../data/stories";

// Every story that centers on a real animal encounter, picked by hand rather
// than keyword-matched — a text search for "cat" or "fox" also catches
// unrelated things like a "Fox News" byline or "Manatee County" as a place
// name, so this list is the source of truth for what counts.
export const ANIMAL_STORY_IDS = [
  "horse-blames-break-in",
  "gator-convenience-store-beer",
  "manatee-riding",
  "gator-in-yoga-pants-traffic-stop",
  "cat-shot-bb-gun-chickens",
  "dog-slam-headbutt-patrol-car",
  "diaper-monkey-car-theft",
  "dog-was-driving",
  "peacocks-killed-cooked-spite",
  "spider-monkey-home-depot-attack",
  "bees-swarm-police-chase",
  "raccoon-in-backpack-bike-stop",
  "deer-run-over-tiktok-video",
  "emu-handcuffed-highway-chase",
  "poops-on-dead-possum-rush-hour",
  "chihuahua-thrown-off-balcony",
];

export function getAnimalStories(stories: Story[]) {
  const idSet = new Set(ANIMAL_STORY_IDS);
  return stories.filter((story) => idSet.has(story.id));
}
