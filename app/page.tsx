"use client";

import { useState } from "react";
import { format, getISOWeek, isToday, isTomorrow } from "date-fns";
import { getBinSchedule } from "@/lib/bin-schedule";
import { BinIllustration } from "@/components/BinIllustration";
import { TimelineRow } from "@/components/BinCard";

function countdownPhrase(daysUntil: number, date: Date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return `In ${daysUntil} days`;
}

export default function Home() {
  const [schedule] = useState(() => getBinSchedule());
  const next = schedule.find((s) => s.label === "Next Collection")!;
  const past = schedule.find((s) => s.label === "Past Collection")!;
  const upcoming = schedule.filter((s) => s.label !== "Past Collection");

  const dayName = format(next.date, "EEEE");
  const dateStamp = format(next.date, "dd.MM.yyyy");

  return (
    <main
      data-bin={next.color}
      className="relative min-h-dvh overflow-hidden"
      suppressHydrationWarning
    >
      {/* Atmosphere layers */}
      <div className="tint-wash" aria-hidden />
      <div className="grain" aria-hidden />

      {/* Editorial masthead */}
      <header className="relative mx-auto flex max-w-2xl items-center justify-between px-6 pt-8 sm:px-10">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            Bin&nbsp;Day &nbsp;/&nbsp; Vol.&nbsp;1
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          {format(new Date(), "EEE dd MMM")}
        </span>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-2xl px-6 pt-10 sm:px-10 sm:pt-16">
        <p
          className="rise font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-soft)]"
          style={{ animationDelay: "60ms" }}
        >
          Next collection — {next.color} lid
        </p>

        <h1
          className="drift font-display mt-4 text-[clamp(4.5rem,18vw,9.5rem)] font-light leading-[0.85] tracking-[-0.04em] text-[var(--ink)]"
          style={{ animationDelay: "140ms" }}
        >
          {dayName.slice(0, -3)}
          <span
            className="font-display-italic"
            style={{ color: "var(--accent-deep)" }}
          >
            {dayName.slice(-3)}.
          </span>
        </h1>

        <div
          className="rise mt-8 flex items-end justify-between gap-6"
          style={{ animationDelay: "260ms" }}
        >
          <div className="flex-1">
            <p className="font-display text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
              {countdownPhrase(next.daysUntil, next.date)}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
              {dateStamp} · wk {getISOWeek(next.date)}
            </p>
          </div>
          <BinIllustration
            color={next.color}
            className="h-32 w-auto shrink-0 sm:h-40"
          />
        </div>
      </section>

      {/* Hairline + pull-quote about the previous collection */}
      <section
        className="rise relative mx-auto mt-14 max-w-2xl px-6 sm:px-10"
        style={{ animationDelay: "380ms" }}
      >
        <div className="rule border-t pt-5">
          <p className="font-display-italic text-lg leading-snug text-[var(--ink-soft)] sm:text-xl">
            “Last out — the {past.color.toLowerCase()} lid on{" "}
            {format(past.date, "EEEE")}.”
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="rise relative mx-auto mt-12 max-w-2xl px-6 pb-20 sm:px-10"
        style={{ animationDelay: "460ms" }}
      >
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            The schedule
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)]/60">
            Wednesdays
          </span>
        </div>
        <div className="border-b border-[var(--ink)]/15">
          {upcoming.map((item) => (
            <TimelineRow
              key={item.date.toISOString()}
              date={item.date}
              color={item.color}
              label={item.label}
              daysUntil={item.daysUntil}
            />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]/60">
          Put them out the night before
        </p>
      </section>
    </main>
  );
}
