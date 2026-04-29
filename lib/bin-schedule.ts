import {
  addWeeks,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  isWednesday,
  nextWednesday,
  previousWednesday,
  startOfDay,
} from "date-fns";

export type BinColor = "Green" | "Black";

export interface BinDay {
  date: Date;
  color: BinColor;
  label: BinLabel;
  daysUntil: number;
}

export type BinLabel =
  | "Past Collection"
  | "Next Collection"
  | "Following Collection"
  | "Later Collection";

// Reference: Wednesday, Jan 21, 2026 is Green Lid
const REFERENCE_DATE = new Date(2026, 0, 21);
const REFERENCE_COLOR: BinColor = "Green";

export function getBinColor(date: Date): BinColor {
  const weeksDiff = differenceInCalendarWeeks(date, REFERENCE_DATE, {
    weekStartsOn: 3,
  });
  return weeksDiff % 2 === 0
    ? REFERENCE_COLOR
    : REFERENCE_COLOR === "Green"
      ? "Black"
      : "Green";
}

export function getBinSchedule(today: Date = new Date()): BinDay[] {
  const current = startOfDay(today);

  const nextBinDate = isWednesday(current) ? current : nextWednesday(current);
  const pastBinDate = previousWednesday(nextBinDate);
  const followingBinDate = addWeeks(nextBinDate, 1);
  const laterBinDate = addWeeks(nextBinDate, 2);

  const build = (date: Date, label: BinLabel): BinDay => ({
    date,
    color: getBinColor(date),
    label,
    daysUntil: differenceInCalendarDays(date, current),
  });

  return [
    build(pastBinDate, "Past Collection"),
    build(nextBinDate, "Next Collection"),
    build(followingBinDate, "Following Collection"),
    build(laterBinDate, "Later Collection"),
  ];
}
