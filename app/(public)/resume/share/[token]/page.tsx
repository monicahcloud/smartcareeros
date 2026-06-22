/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/app/(dashboard)/resumebuilder/editor/sections/ResumePreview";

interface PageProps {
  params: Promise<{ token: string }>;
}

function normalizeExternalUrl(url?: string | null) {
  if (!url) return null;

  const trimmed = url.trim();

  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default async function SharedResumePage({ params }: PageProps) {
  const { token } = await params;

  const resume = await prisma.resume.findUnique({
    where: {
      shareToken: token,
    },
    include: {
      workExperience: true,
      education: true,
      techSkills: true,
    },
  });

  if (!resume) return notFound();

  const fullName =
    `${resume.firstName || ""} ${resume.lastName || ""}`.trim() || "Candidate";

  const linkedInUrl = normalizeExternalUrl(resume.linkedin);

  const websiteUrl = normalizeExternalUrl(resume.website);

  const sharedDate = new Date(resume.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-slate-100 print:bg-white">
      <section className="border-b bg-white print:hidden">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {resume.photoUrl && resume.showPhoto && (
              <img
                src={resume.photoUrl}
                alt={fullName}
                className="mb-4 h-20 w-20 rounded-full border-4 border-red-50 object-cover shadow-sm"
              />
            )}

            <div className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Professional Resume
            </div>

            <h1 className="mt-4 text-4xl font-black text-slate-900">
              {fullName}
            </h1>

            <p className="mt-1 text-lg text-slate-600">
              {resume.jobTitle || "Professional Candidate"}
            </p>

            <p className="mb-2 max-w-3xl text-sm text-slate-500">
              You are viewing a resume shared directly by the candidate as part
              of a professional employment application.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
              {resume.email && <span>{resume.email}</span>}
              {resume.phone && <span>{resume.phone}</span>}
              {resume.linkedin && <span>{resume.linkedin}</span>}
            </div>

            <div className="mt-6 flex gap-3">
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-full border px-5 text-xs font-black uppercase tracking-widest">
                  View LinkedIn
                </a>
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-full border px-5 text-xs font-black uppercase tracking-widest">
                  View Portfolio
                </a>
              )}
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
              Shared via Smart CareerOS · {sharedDate}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 print:p-0">
        <div className="mx-auto w-fit bg-white shadow-2xl print:shadow-none">
          <ResumePreview
            themeId={resume.themeId ?? "classic-left"}
            data={{
              ...mapToResumeValues(resume),
              photo: undefined,
            }}
          />
        </div>
      </section>
    </main>
  );
}
