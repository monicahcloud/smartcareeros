import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

export default async function ResumeEditorNewPage({
  searchParams,
}: {
  searchParams: Promise<{
    resumeId?: string;
    resumeType?: string;
  }>;
}) {
  const { resumeId, resumeType } = await searchParams;
  const { userId: clerkId } = await auth();

  if (!clerkId || !resumeId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="space-y-8">
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
          {resume.resumeTitle || "Untitled Resume"}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Edit your resume sections, refine your summary, and prepare this
          document for applications.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Resume Type
            </p>

            <p className="mt-2 text-lg font-black uppercase text-black">
              {resumeType || resume.resumeType || "Corporate"}
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Professional Summary
            </p>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {resume.summary || "No summary added yet."}
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Editor Sections
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>✓ Personal Information</p>
              <p>✓ Professional Summary</p>
              <p>✓ Work Experience</p>
              <p>✓ Education</p>
              <p>✓ Skills</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Resume Preview
          </p>

          <div className="min-h-[650px] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              {resume.resumeTitle || "Untitled Resume"}
            </h2>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Summary
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-700">
                {resume.summary || "No summary added yet."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
