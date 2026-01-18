"use client";

import { useState } from "react";
import { getBinSchedule } from "@/lib/bin-schedule";
import { BinCard } from "@/components/BinCard";

export default function Home() {
  // Initialize state directly with the schedule.
  // This ensures data is available immediately on first render.
  const [schedule] = useState(() => getBinSchedule());

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Bin Collection
          </h1>
        </header>

        {/* 
          suppressHydrationWarning is used here because the schedule depends on the current date (new Date()),
          which might slightly differ between the server render time and client render time,
          causing a potential hydration mismatch for the specific dates displayed.
          Since this is a client-first app, we prioritize the client's view.
        */}
        <div className="space-y-4" suppressHydrationWarning>
          {schedule.map((item, index) => (
            <BinCard
              key={index}
              date={item.date}
              color={item.color}
              label={item.label}
              isNext={item.label === "Next Collection"}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
