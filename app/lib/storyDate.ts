import type { Story } from "../data/stories";

const MONTHS: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

// Story dates are stored as separate, sometimes-incomplete year/month/day
// text fields (some older stories only have a year). This resolves them to
// a sortable timestamp, defaulting missing month/day to the start of the
// period so imprecise dates still sort sensibly relative to precise ones.
export function getStoryTimestamp(story: Pick<Story, "year" | "month" | "day">) {
  const year = parseInt(story.year, 10) || 0;
  const month = MONTHS[story.month] ?? 0;
  const day = parseInt(story.day, 10) || 1;

  return new Date(year, month, day).getTime();
}
