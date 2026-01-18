import {
  addWeeks,
  differenceInCalendarWeeks,
  isMonday,
  nextMonday,
  previousMonday,
  startOfDay,
} from "date-fns";

export type BinColor = "Green" | "Black";

interface BinDay {
  date: Date;
  color: BinColor;
  label: string; // 'Past', 'Next', 'Next Next', etc.
}

// Reference: Monday, Jan 19, 2026 is Green Lid
const REFERENCE_DATE = new Date(2026, 0, 19); // Month is 0-indexed
const REFERENCE_COLOR: BinColor = "Green";

export function getBinColor(date: Date): BinColor {
  const weeksDiff = differenceInCalendarWeeks(date, REFERENCE_DATE, {
    weekStartsOn: 1,
  });
  // If weeks diff is even, same color. If odd, different color.
  return weeksDiff % 2 === 0
    ? REFERENCE_COLOR
    : REFERENCE_COLOR === "Green"
      ? "Black"
      : "Green";
}

export function getBinSchedule(today: Date = new Date()): BinDay[] {
  const current = startOfDay(today);

  let nextBinDate: Date;

  if (isMonday(current)) {
    nextBinDate = current;
  } else {
    nextBinDate = nextMonday(current);
  }

  const pastBinDate = previousMonday(nextBinDate);
  const nextNextBinDate = addWeeks(nextBinDate, 1);
  const nextNextNextBinDate = addWeeks(nextBinDate, 2);

  return [
    {
      date: pastBinDate,
      color: getBinColor(pastBinDate),
      label: "Past Collection",
    },
    {
      date: nextBinDate,
      color: getBinColor(nextBinDate),
      label: "Next Collection",
    },
    {
      date: nextNextBinDate,
      color: getBinColor(nextNextBinDate),
      label: "Following Collection",
    },
    {
      date: nextNextNextBinDate,
      color: getBinColor(nextNextNextBinDate),
      label: "Later Collection",
    },
  ];
}
