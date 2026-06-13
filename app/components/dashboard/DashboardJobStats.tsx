import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Footprints } from "lucide-react";

export default async function DashboardJobStats() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const jobs = await prisma.job.findMany({
    where: { userId: user.id },
    select: { status: true },
  });

  const stats = [
    {
      title: "Saved Jobs",
      value: jobs.filter((job) => job.status === "SAVED").length,
    },
    {
      title: "Started",
      value: jobs.filter((job) => job.status === "APPLICATION_STARTED").length,
    },
    {
      title: "Applied",
      value: jobs.filter((job) => job.status === "APPLIED").length,
    },
    {
      title: "Interviews",
      value: jobs.filter((job) =>
        ["INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETED"].includes(job.status),
      ).length,
    },
    {
      title: "Offers",
      value: jobs.filter((job) =>
        ["OFFER_RECEIVED", "HIRED"].includes(job.status),
      ).length,
    },
    {
      title: "Closed",
      value: jobs.filter((job) =>
        ["REJECTED", "WITHDRAWN"].includes(job.status),
      ).length,
    },
  ];

  return (
    <section className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
            <Footprints className="h-4 w-4" />
            Job Tracker
          </div>

          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
            Your Application Pipeline
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            A quick look at where your opportunities stand right now.
          </p>
        </div>

        <Link
          href="/jobtracker"
          className="inline-flex h-10 items-center justify-center bg-red-600 px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
          View Tracker
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              {stat.title}
            </p>

            <p className="mt-3 text-3xl font-black tracking-tighter text-black">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
