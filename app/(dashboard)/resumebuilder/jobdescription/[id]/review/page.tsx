import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GenerateTailoredResumeButton from "@/app/components/resumebuilder/GenerateTailoredResumeButton";
import AnalyzeJobDescriptionButton from "@/app/components/resumebuilder/AnalyzeJobDescriptionButton";

export default async function JobDescriptionReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const jobDescription = await prisma.jobDescription.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!jobDescription) {
    notFound();
  }

  const parsedData = jobDescription.parsedData as {
    tailoredSummary?: string;
  } | null;

  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <Link
          href="/resumebuilder/jobdescription"
          className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500 hover:text-red-600">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Job Description Review
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Review Before Generating
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Confirm the role details before generating a tailored resume draft.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Role
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
              {jobDescription.title || "Untitled Role"}
            </h2>

            <p className="mt-2 text-sm font-bold text-slate-600">
              {jobDescription.company || "Company not provided"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {jobDescription.location || "Location not provided"}
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              AI Preparation
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>✓ Extract role keywords</p>
              <p>✓ Identify required skills</p>
              <p>✓ Match experience language</p>
              <p>✓ Prepare tailored resume direction</p>
            </div>
            <AnalyzeJobDescriptionButton jobDescriptionId={jobDescription.id} />

            <GenerateTailoredResumeButton
              jobDescriptionId={jobDescription.id}
            />
          </div>
          <div className="space-y-6">
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              ... AI Preparation Card ...
            </div>

            {parsedData?.tailoredSummary && (
              <div className="border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  AI Resume Summary
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {parsedData.tailoredSummary}
                </p>
              </div>
            )}
          </div>
          {jobDescription.keywords.length > 0 && (
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Keywords
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {jobDescription.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {jobDescription.requiredSkills.length > 0 && (
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Required Skills
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {jobDescription.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {jobDescription.preferredSkills.length > 0 && (
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Preferred Skills
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {jobDescription.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {jobDescription.responsibilities.length > 0 && (
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Responsibilities
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                {jobDescription.responsibilities.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Pasted Job Description
          </p>

          <div className="max-h-[650px] overflow-y-auto whitespace-pre-line border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {jobDescription.rawText}
          </div>
        </div>
      </section>
    </main>
  );
}
