import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { mapToCoverLetterValues } from "@/lib/utils";
import CoverLetterPreview from "@/app/components/coverletter/CoverLetterPreview";
import PrintButton from "@/app/components/PrintButton";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SharedCoverLetterPage({ params }: PageProps) {
  const { token } = await params;

  const coverLetter = await prisma.coverLetter.findUnique({
    where: {
      shareToken: token,
    },
  });

  if (!coverLetter) return notFound();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 print:bg-white print:p-0">
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <div className="fixed bottom-6 right-6 z-50 print:hidden">
          <PrintButton />
        </div>
      </div>

      <div className="mx-auto w-fit bg-white shadow-2xl print:shadow-none">
        <CoverLetterPreview
          coverLetterData={mapToCoverLetterValues(coverLetter)}
        />
      </div>
    </main>
  );
}
