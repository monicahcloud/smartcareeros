export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  BriefcaseBusiness,
  FileText,
  PenSquare,
  Plus,
  Sparkles,
  Upload,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";
import DeleteResumeButton from "@/app/components/resumes/DeleteResumeButton";

export const metadata: Metadata = {
  title: "Resumes | Smart CareerOS",
  description:
    "Create, upload, edit, print, and manage professional resumes inside Smart CareerOS.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResumesPage() {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const totalCount = resumes.length;
  const uploadedCount = resumes.filter((resume) => resume.isUploaded).length;

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="relative overflow-hidden border border-slate-200 bg-white p-8 shadow-sm">
        <div className="absolute right-0 top-0 h-40 w-40 bg-red-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              <Sparkles className="h-4 w-4" />
              AI Resume Suite
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
              Resumes
            </h1>

            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-500">
              Create professional, editable, printable, and role-specific
              resumes. Start from scratch, upload an existing resume, or manage
              multiple versions for different opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resumes/new"
              className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
              <Plus className="h-4 w-4" />
              New Resume
            </Link>

            <Link
              href="/resumes/upload"
              className="inline-flex h-12 items-center justify-center gap-2 border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
              <Upload className="h-4 w-4" />
              Upload Resume
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
            Choose from modern, federal, chronological, functional, and
            combination resume layouts.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 inline-flex bg-red-50 p-3 text-red-600">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-black">
            Role-Based Versions
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Manage different resume versions for different jobs, industries, and
            application strategies.
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
            Update sections, rewrite content, adjust details, and preview your
            resume before downloading or printing.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Total Resumes
          </p>
          <p className="mt-2 text-4xl font-black text-black">{totalCount}</p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Uploaded
          </p>
          <p className="mt-2 text-4xl font-black text-black">{uploadedCount}</p>
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

      {/* Resume Grid */}
      <section>
        {resumes.length === 0 ? (
          <section className="border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              No resumes yet
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-black">
              Start your first resume
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Build a resume from scratch or upload an existing one to begin
              organizing your career documents.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/resumes/new"
                className="inline-flex h-12 items-center justify-center bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
                Create A Resume
              </Link>

              <Link
                href="/resumes/upload"
                className="inline-flex h-12 items-center justify-center border border-slate-200 px-6 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600">
                Upload Resume
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {resumes.map((resume) => (
              <article
                key={resume.id}
                className="border border-slate-200 bg-white p-6 shadow-sm transition hover:border-red-600 hover:shadow-md">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  {resume.resumeType || "Resume"}
                </p>

                <h3 className="text-xl font-black uppercase tracking-tight text-black">
                  {resume.resumeTitle || "Untitled Resume"}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Last updated{" "}
                  {new Date(resume.updatedAt).toLocaleDateString("en-US")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/resumebuilder/editor?resumeId=${resume.id}`}
                    className="inline-flex h-10 flex-1 items-center justify-center bg-black px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
                    Edit
                  </Link>

                  <Link
                    href={`/resumes/${resume.id}`}
                    className="inline-flex h-10 items-center justify-center border border-slate-200 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
                    View
                  </Link>
                  <DeleteResumeButton resumeId={resume.id} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
