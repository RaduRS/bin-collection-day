import { format, isToday, isTomorrow } from "date-fns";
import { type BinColor } from "@/lib/bin-schedule";

interface TimelineRowProps {
  date: Date;
  color: BinColor;
  label: string;
  daysUntil: number;
  isPast?: boolean;
}

function relativePhrase(date: Date, daysUntil: number) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (daysUntil < 0) return `${Math.abs(daysUntil)}d ago`;
  return `in ${daysUntil}d`;
}

export function TimelineRow({
  date,
  color,
  label,
  daysUntil,
  isPast,
}: TimelineRowProps) {
  const isGreen = color === "Green";

  return (
    <div
      className={`group flex items-center justify-between border-t border-[var(--ink)]/15 py-5 transition-opacity ${
        isPast ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="block h-3 w-3 rounded-full ring-1 ring-[var(--ink)]/30"
          style={{
            background: isGreen ? "var(--green)" : "var(--ink)",
          }}
        />
        <div className="flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]/70">
            {label}
          </span>
          <span className="mt-0.5 text-base font-medium text-[var(--ink)]">
            {format(date, "EEEE d MMM")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]/70">
          {color} lid
        </span>
        <span className="mt-0.5 font-mono text-sm text-[var(--ink)]">
          {relativePhrase(date, daysUntil)}
        </span>
      </div>
    </div>
  );
}
