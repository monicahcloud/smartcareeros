/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import CoverLetterPreview from "./CoverLetterPreview";

export default function CoverLetterCard({ coverLetter }: { coverLetter: any }) {
  const previewData = {
    id: coverLetter.id,
    firstName: coverLetter.firstName,
    lastName: coverLetter.lastName,
    jobTitle: coverLetter.jobTitle,
    userEmail: coverLetter.userEmail,
    userPhone: coverLetter.userPhone,
    userAddress: coverLetter.userAddress,
    website: coverLetter.website,
    linkedin: coverLetter.linkedin,
    gitHub: coverLetter.gitHub,
    recipientName: coverLetter.recipientName,
    companyName: coverLetter.companyName,
    companyAddress: coverLetter.companyAddress,
    companyPhone: coverLetter.companyPhone,
    companyEmail: coverLetter.companyEmail,
    body: coverLetter.body,
    themeId: coverLetter.themeId,
    themeColor: coverLetter.themeColor,
    showPhoto: coverLetter.showPhoto,
    userPhotoUrl: coverLetter.userPhotoUrl,
    signatureUrl: coverLetter.signatureUrl,
    signatureColor: coverLetter.signatureColor,
  };

  return (
    <article className="group relative border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
      {/* Preview */}
      <div className="relative mb-5 aspect-[210/297] overflow-hidden border border-slate-100 bg-slate-50">
        <div className="absolute right-3 top-3 z-20 bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-red-600 shadow-sm backdrop-blur">
          {coverLetter.themeId || "Standard"}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.34]">
          <CoverLetterPreview coverLetterData={previewData} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
      </div>

      {/* Info */}
      <div>
        <h3 className="truncate text-lg font-black uppercase tracking-tight text-black">
          {coverLetter.companyName || coverLetter.jobTitle || "Untitled Letter"}
        </h3>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Last edited {new Date(coverLetter.updatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-2">
        <Link
          href={`/coverletter/${coverLetter.id}/edit`}
          className="flex-1 bg-black px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
          Edit
        </Link>

        <Link
          href={`/coverletter/${coverLetter.id}`}
          className="border border-slate-200 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-slate-500 transition hover:border-red-600 hover:text-red-600">
          View
        </Link>

        {coverLetter.shareToken && (
          <Link
            href={`/share/coverletter/${coverLetter.shareToken}`}
            className="border border-slate-200 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-slate-500 transition hover:border-red-600 hover:text-red-600">
            Share
          </Link>
        )}
      </div>
    </article>
  );
}
