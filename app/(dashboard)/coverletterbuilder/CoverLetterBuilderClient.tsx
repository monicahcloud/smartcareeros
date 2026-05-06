/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import CoverLetterPreview from "../coverletter/CoverLetterPreview";

type CoverLetterBuilderClientProps = {
  userId: string;
  clerkId: string;
  initialThemeId: string;
  initialCoverLetter: any | null;
};

export default function CoverLetterBuilderClient({
  initialThemeId,
  initialCoverLetter,
}: CoverLetterBuilderClientProps) {
  const [coverLetterData, setCoverLetterData] = useState({
    id: initialCoverLetter?.id || undefined,
    firstName: initialCoverLetter?.firstName || "",
    lastName: initialCoverLetter?.lastName || "",
    jobTitle: initialCoverLetter?.jobTitle || "",
    userEmail: initialCoverLetter?.userEmail || "",
    userPhone: initialCoverLetter?.userPhone || "",
    userAddress: initialCoverLetter?.userAddress || "",
    website: initialCoverLetter?.website || "",
    linkedin: initialCoverLetter?.linkedin || "",
    gitHub: initialCoverLetter?.gitHub || "",
    recipientName: initialCoverLetter?.recipientName || "",
    companyName: initialCoverLetter?.companyName || "",
    companyAddress: initialCoverLetter?.companyAddress || "",
    companyPhone: initialCoverLetter?.companyPhone || "",
    companyEmail: initialCoverLetter?.companyEmail || "",
    body:
      initialCoverLetter?.body ||
      `<p>I am writing to express my interest in this opportunity. With my background, skills, and commitment to delivering strong results, I am confident in my ability to contribute value to your organization.</p><p>I would welcome the opportunity to discuss how my experience aligns with your needs.</p>`,
    themeId: initialCoverLetter?.themeId || initialThemeId,
    themeColor: initialCoverLetter?.themeColor || "#DC2626",
    showPhoto: initialCoverLetter?.showPhoto ?? false,
    userPhotoUrl: initialCoverLetter?.userPhotoUrl || "",
    signatureUrl: initialCoverLetter?.signatureUrl || "",
    signatureColor: initialCoverLetter?.signatureColor || "#DC2626",
  });

  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-100 lg:grid-cols-[480px_1fr]">
      <section className="border-r border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-black">
          Cover Letter Builder
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Edit your details and preview your letter in real time.
        </p>

        <div className="mt-8 space-y-4">
          <input
            value={coverLetterData.firstName}
            onChange={(e) =>
              setCoverLetterData({
                ...coverLetterData,
                firstName: e.target.value,
              })
            }
            placeholder="First Name"
            className="h-11 w-full border border-slate-200 px-4 text-sm"
          />

          <input
            value={coverLetterData.lastName}
            onChange={(e) =>
              setCoverLetterData({
                ...coverLetterData,
                lastName: e.target.value,
              })
            }
            placeholder="Last Name"
            className="h-11 w-full border border-slate-200 px-4 text-sm"
          />

          <input
            value={coverLetterData.jobTitle}
            onChange={(e) =>
              setCoverLetterData({
                ...coverLetterData,
                jobTitle: e.target.value,
              })
            }
            placeholder="Job Title"
            className="h-11 w-full border border-slate-200 px-4 text-sm"
          />

          <input
            value={coverLetterData.companyName}
            onChange={(e) =>
              setCoverLetterData({
                ...coverLetterData,
                companyName: e.target.value,
              })
            }
            placeholder="Company Name"
            className="h-11 w-full border border-slate-200 px-4 text-sm"
          />

          <textarea
            value={coverLetterData.body}
            onChange={(e) =>
              setCoverLetterData({
                ...coverLetterData,
                body: e.target.value,
              })
            }
            placeholder="Cover letter body"
            rows={10}
            className="w-full border border-slate-200 p-4 text-sm leading-6"
          />
        </div>
      </section>

      <section className="flex justify-center overflow-auto p-8">
        <CoverLetterPreview coverLetterData={coverLetterData} />
      </section>
    </main>
  );
}
