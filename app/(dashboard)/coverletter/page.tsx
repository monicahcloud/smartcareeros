export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";
import EmptyCoverLettersState from "./EmptyCoverLettersPage";
import CoverLetterCard from "./CoverLetterCard";

export const metadata: Metadata = {
  title: "Cover Letters | Smart CareerOS",
  description:
    "Create, edit, share, and manage AI-assisted cover letters inside Smart CareerOS.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CoverLettersPage() {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const coverLetters = await prisma.coverLetter.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const totalCount = coverLetters.length;

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="relative overflow-hidden border border-slate-200 bg-white p-8 shadow-sm">
        <div className="absolute right-0 top-0 h-40 w-40 bg-red-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              <Sparkles className="h-4 w-4" />
              AI Cover Letter Suite
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
              Cover Letters
            </h1>

            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-500">
              Create professional, editable, printable, and shareable cover
              letters. Start from a template, customize your design, or generate
              one later using a saved profile and job description.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/coverletter/new"
              className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
              <Plus className="h-4 w-4" />
              New Letter
            </Link>

            <Link
              href="/jobdescriptions"
              className="inline-flex h-12 items-center justify-center border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
              Use Job Description
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Created
          </p>
          <p className="mt-2 text-4xl font-black text-black">{totalCount}</p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Templates
          </p>
          <p className="mt-2 text-4xl font-black text-black">15</p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Status
          </p>
          <p className="mt-2 text-lg font-black uppercase text-red-600">
            Ready
          </p>
        </div>
      </section>

      {/* Cover Letter Grid */}
      <section>
        {coverLetters.length === 0 ? (
          <EmptyCoverLettersState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {coverLetters.map((letter) => (
              <CoverLetterCard key={letter.id} coverLetter={letter} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
