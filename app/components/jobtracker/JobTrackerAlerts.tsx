"use client";

import { Job } from "@prisma/client";
import { AlertTriangle, CalendarClock, CalendarDays } from "lucide-react";

export default function JobTrackerAlerts({ jobs }: { jobs: Job[] }) {
  const today = new Date();

  const overdue = jobs.filter(
    (job) =>
      job.followUpDate &&
      new Date(job.followUpDate) < today &&
      job.status !== "REJECTED" &&
      job.status !== "WITHDRAWN",
  );

  const dueToday = jobs.filter(
    (job) =>
      job.followUpDate &&
      new Date(job.followUpDate).toDateString() === today.toDateString(),
  );

  const upcoming = jobs.filter((job) => {
    if (!job.followUpDate) return false;

    const followUp = new Date(job.followUpDate);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return followUp > today && followUp <= sevenDaysFromNow;
  });

  const cards = [
    {
      title: "Overdue Follow Ups",
      value: overdue.length,
      description: "Jobs requiring immediate attention.",
      icon: AlertTriangle,
      color:
        overdue.length > 0
          ? "border-red-200 bg-red-50"
          : "border-slate-200 bg-white",
    },
    {
      title: "Due Today",
      value: dueToday.length,
      description: "Follow-ups scheduled for today.",
      icon: CalendarClock,
      color:
        dueToday.length > 0
          ? "border-amber-200 bg-amber-50"
          : "border-slate-200 bg-white",
    },
    {
      title: "Next 7 Days",
      value: upcoming.length,
      description: "Upcoming follow-up reminders.",
      icon: CalendarDays,
      color:
        upcoming.length > 0
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`border p-5 shadow-sm ${card.color}`}>
            <div className="mb-4 flex items-center justify-between">
              <Icon className="h-5 w-5 text-red-600" />

              <span className="text-3xl font-black tracking-tighter text-black">
                {card.value}
              </span>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              {card.title}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
