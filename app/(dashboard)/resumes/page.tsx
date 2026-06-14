import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { FileText, Upload } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ResumesPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Resume Builder
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
              Resume Workspace
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Create, upload, edit, and manage resumes for different roles,
              industries, and application strategies.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resumebuilder"
              className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
              <FileText className="h-4 w-4" />
              Create A Resume
            </Link>

            {/* <Link
              href="/resumes/upload"
              className="inline-flex h-12 items-center justify-center gap-2 border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
              <Upload className="h-4 w-4" />
              Upload Resume
            </Link> */}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Total Resumes
          </p>
          <p className="mt-2 text-4xl font-black text-black">
            {resumes.length}
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Uploaded
          </p>
          <p className="mt-2 text-4xl font-black text-black">
            {resumes.filter((resume) => resume.isUploaded).length}
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Created In CareerOS
          </p>
          <p className="mt-2 text-4xl font-black text-black">
            {resumes.filter((resume) => !resume.isUploaded).length}
          </p>
        </div>
      </section>

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
              href="/resumebuilder"
              className="inline-flex h-12 items-center justify-center bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
              Create A Resume
            </Link>

            {/* <Link
              href="/resumes/upload"
              className="inline-flex h-12 items-center justify-center border border-slate-200 px-6 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:border-red-600 hover:text-red-600">
              Upload Resume
            </Link> */}
          </div>
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

              <div className="mt-6 flex gap-3">
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
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
