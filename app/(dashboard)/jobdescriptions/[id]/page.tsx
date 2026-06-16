// app/(dashboard)/jobdescriptions/[id]/page.tsx
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDescriptionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const job = await prisma.jobDescription.findFirst({
    where: {
      id,
      clerkId,
    },
  });

  if (!job) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/jobdescriptions"
            className="text-xs font-black uppercase tracking-widest text-red-600">
            ← Back to Job Descriptions
          </Link>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            {job.title || "Untitled Job"}
          </h1>

          <p className="mt-2 font-bold text-slate-500">
            {job.company || "Company not listed"}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <form
            action={async () => {
              "use server";

              const { createCoverLetterFromJobDescription } =
                await import("../createCoverLetterFromJobDescription");

              await createCoverLetterFromJobDescription(job.id);
            }}>
            <button
              type="submit"
              className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-black">
              Create Cover Letter
            </button>
          </form>

          <Link
            href={`/resumebuilder/editor?jobDescriptionId=${job.id}`}
            className="border border-slate-300 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-700 hover:border-red-600 hover:text-red-600">
            Create Resume
          </Link>
        </div>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
            Full Job Description
          </h2>

          <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {job.rawText}
          </div>
        </section>
      </div>
    </main>
  );
}
