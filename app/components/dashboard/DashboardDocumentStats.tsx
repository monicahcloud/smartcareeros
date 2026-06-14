import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Paperclip } from "lucide-react";

export default async function DashboardDocumentStats() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const [resumeCount, coverLetterCount, careerProfile] = await Promise.all([
    prisma.resume.count({
      where: { userId: user.id },
    }),

    prisma.coverLetter.count({
      where: { userId: user.id },
    }),

    prisma.careerProfile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
    }),
  ]);

  const stats = [
    {
      title: "Career Profile",
      value: careerProfile ? "✓" : "—",
      description: careerProfile ? "Completed" : "Needs attention",
    },
    {
      title: "Resumes",
      value: resumeCount,
      description: "Resume documents created",
    },
    {
      title: "Cover Letters",
      value: coverLetterCount,
      description: "Cover letters created",
    },
    {
      title: "Interview Sessions",
      value: 0,
      description: "AI practice interviews",
    },
  ];

  return (
    <section className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
            <Paperclip className="h-4 w-4" />
            Career Documents
          </div>

          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
            Career Assets
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Track your resumes, cover letters, and career documents all in one
            place.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/careerprofile"
            className="inline-flex h-10 items-center justify-center border border-slate-200 px-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600">
            Career Profile
          </Link>
          <Link
            href="/resumes"
            className="inline-flex h-10 items-center justify-center border border-slate-200 px-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600">
            Resumes
          </Link>

          <Link
            href="/coverletter"
            className="inline-flex h-10 items-center justify-center bg-red-600 px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
            Cover Letters
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              {stat.title}
            </p>

            <p className="mt-3 text-4xl font-black tracking-tighter text-black">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-slate-500">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
