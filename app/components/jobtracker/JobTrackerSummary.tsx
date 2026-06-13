"use client";

import {
  Bookmark,
  BriefcaseBusiness,
  CalendarCheck,
  Trophy,
} from "lucide-react";

export default function JobTrackerSummary({ jobs }: { jobs: Job[] }) {
  const savedCount = jobs.filter((job) => job.status === "SAVED").length;

  const appliedCount = jobs.filter((job) =>
    ["APPLICATION_STARTED", "APPLIED"].includes(job.status),
  ).length;

  const interviewCount = jobs.filter((job) =>
    ["INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETED"].includes(job.status),
  ).length;

  const offerCount = jobs.filter((job) =>
    ["OFFER_RECEIVED", "HIRED"].includes(job.status),
  ).length;

  const summaryCards = [
    {
      title: "Saved Jobs",
      value: savedCount,
      description: "Opportunities you are considering.",
      icon: Bookmark,
    },
    {
      title: "Applications",
      value: appliedCount,
      description: "Started or submitted applications.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Interviews",
      value: interviewCount,
      description: "Active interview opportunities.",
      icon: CalendarCheck,
    },
    {
      title: "Offers",
      value: offerCount,
      description: "Offers received or accepted.",
      icon: Trophy,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center bg-red-50">
                <Icon className="h-5 w-5 text-red-600" />
              </div>

              <span className="text-4xl font-black tracking-tighter text-black">
                {card.value}
              </span>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              {card.title}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
