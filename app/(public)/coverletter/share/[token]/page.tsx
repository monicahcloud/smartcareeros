/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { mapToCoverLetterValues } from "@/lib/utils";
import CoverLetterPreview from "@/app/components/coverletter/CoverLetterPreview";
// import PrintButton from "@/app/components/PrintButton";

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

export default async function SharedCoverLetterPage({ params }: PageProps) {
  const { token } = await params;

  const coverLetter = await prisma.coverLetter.findUnique({
    where: {
      shareToken: token,
    },
  });

  if (!coverLetter) return notFound();

  const fullName =
    `${coverLetter.firstName || ""} ${coverLetter.lastName || ""}`.trim() ||
    "Candidate";
  const linkedInUrl = normalizeExternalUrl(coverLetter.linkedin);
  const websiteUrl = normalizeExternalUrl(coverLetter.website);
  const sharedDate = new Date(coverLetter.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <main className="min-h-screen bg-slate-100 print:bg-white">
      <section className="border-b bg-white print:hidden">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {coverLetter.userPhotoUrl && coverLetter.showPhoto && (
              <img
                src={coverLetter.userPhotoUrl}
                alt={fullName}
                className="mb-4 h-20 w-20 rounded-full border-4 border-red-50 object-cover shadow-sm"
              />
            )}

            <div className="mb-3 inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Professional Cover Letter
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              {fullName}
            </h1>

            <p className="mt-1 text-lg font-medium text-slate-600">
              {coverLetter.jobTitle || "Professional Candidate"}
            </p>

            <p className=" max-w-3xl mb-2 text-sm  text-slate-500">
              You are viewing a cover letter shared directly by the candidate as
              part of a professional employment application.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
              {coverLetter.userEmail && <span>{coverLetter.userEmail}</span>}
              {coverLetter.userPhone && <span>{coverLetter.userPhone}</span>}
              {coverLetter.linkedin && <span>{coverLetter.linkedin}</span>}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {/* <PrintButton coverLetterId={coverLetter.id} /> */}

              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                  View LinkedIn
                </a>
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
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
          <CoverLetterPreview
            coverLetterData={mapToCoverLetterValues(coverLetter)}
          />
        </div>
      </section>
    </main>
  );
}
