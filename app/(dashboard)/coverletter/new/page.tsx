// app/(dashboard)/coverletter/new/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, FileText, BriefcaseBusiness, PenSquare } from "lucide-react";
import { COVER_LETTER_THEME_REGISTRY } from "../templates/templateRegistry";
import CoverLetterTemplateCard from "../CoverLetterTemplateCard";

export const metadata: Metadata = {
  title: "New Cover Letter | Smart CareerOS",
  description:
    "Choose a professional cover letter template and begin building your next application.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewCoverLetterPage() {
  return (
    <main className="space-y-12">
      {/* HERO */}
      <section className="relative overflow-hidden border border-slate-200 bg-white px-8 py-12 shadow-sm">
        <div className="absolute right-0 top-0 h-56 w-56 bg-red-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              <Sparkles className="h-4 w-4" />
              AI-Assisted Cover Letters
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
              Create a new cover letter
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Start with a professionally designed template, customize colors,
              edit content, and generate tailored letters later using your saved
              resumes and uploaded job descriptions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/coverletter"
              className="inline-flex h-12 items-center justify-center border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.18em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
              Back
            </Link>

            <Link
              href="/jobsearch"
              className="inline-flex h-12 items-center justify-center bg-black px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-600">
              Job Search
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid gap-5 md:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex bg-red-50 p-3 text-red-600">
            <FileText className="h-5 w-5" />
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-black">
            Professional Templates
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Choose from multiple modern, executive, minimalist, and federal
            layout styles.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex bg-red-50 p-3 text-red-600">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-black">
            Job Description Matching
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Generate targeted cover letters later using uploaded job postings
            and saved resume data.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex bg-red-50 p-3 text-red-600">
            <PenSquare className="h-5 w-5" />
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-black">
            Fully Editable
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Change fonts, colors, spacing, sections, and content in real time
            with live preview support.
          </p>
        </div>
      </section>

      {/* TEMPLATE SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-red-600">
              Template Gallery
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-tighter text-black">
              Choose your starting design
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-slate-500">
            Every template is printable, shareable, ATS-friendly, and optimized
            for professional applications.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {COVER_LETTER_THEME_REGISTRY.map((theme) => (
            <CoverLetterTemplateCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>
    </main>
  );
}
