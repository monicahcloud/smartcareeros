"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

type ResumeEditorHeaderProps = {
  resumeTitle: string | null;
};

export default function ResumeEditorHeader({
  resumeTitle,
}: ResumeEditorHeaderProps) {
  return (
    <section className="border border-slate-200 bg-white p-8 shadow-sm">
      <Link
        href="/resumes"
        className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500 hover:text-red-600">
        <ArrowLeft className="h-4 w-4" />
        Back To Resumes
      </Link>

      <p className="mb-3 inline-flex items-center gap-2 border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
        <FileText className="h-4 w-4" />
        Resume Editor
      </p>

      <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
        {resumeTitle || "Untitled Resume"}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
        Edit your resume sections, refine your summary, and prepare this
        document for applications.
      </p>
    </section>
  );
}
