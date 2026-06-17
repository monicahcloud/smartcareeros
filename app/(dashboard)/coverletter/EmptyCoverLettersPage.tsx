import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function EmptyCoverLettersState() {
  return (
    <div className="border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-red-50 text-red-600">
        <FileText className="h-8 w-8" />
      </div>

      <p className="text-sm font-black uppercase tracking-[0.28em] text-slate-400">
        No Cover Letters Yet
      </p>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-black">
        Create your first professional cover letter.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
        Choose from 15 templates, change the theme color, edit the content, and
        prepare a clean printable version for your next application.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/coverletter/new"
          className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
          <Plus className="h-4 w-4" />
          Create Cover Letter
        </Link>

        <Link
          href="/jobdescriptions"
          className="inline-flex h-12 items-center justify-center border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
          Tailor From Job Description
        </Link>
      </div>
    </div>
  );
}
