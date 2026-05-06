"use client";

import { useRouter } from "next/navigation";
import CoverLetterPreview from "./CoverLetterPreview";
import { CoverLetterThemeToken } from "./templates/templateRegistry";
import { Card, CardContent } from "@/components/ui/card";

const MOCK_DATA = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Product Manager",
  userEmail: "janedoe@email.com",
  userPhone: "123-456-7890",
  userAddress: "New York, NY",
  recipientName: "Hiring Manager",
  companyName: "Innovative Tech Solutions",
  body: `
    <p>I am excited to apply for this opportunity and bring my experience in leadership, collaboration, and problem-solving to your team.</p>
    <p>Throughout my career, I have consistently delivered high-quality outcomes while adapting quickly to evolving business needs.</p>
    <p>I would welcome the opportunity to further discuss how my background aligns with your organization’s goals.</p>
  `,
  themeId: "classic-left",
  themeColor: "#DC2626",
};

export default function CoverLetterTemplateCard({
  theme,
}: {
  theme: CoverLetterThemeToken;
}) {
  const router = useRouter();

  function handleSelect() {
    router.push(`/coverletterbuilder/editor?themeId=${theme.id}`);
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group text-left transition-transform hover:-translate-y-2">
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all group-hover:border-red-500 group-hover:shadow-2xl">
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/30" />

            <div className="pointer-events-none absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.34]">
              <CoverLetterPreview
                coverLetterData={{
                  ...MOCK_DATA,
                  themeId: theme.id,
                  themeColor: theme.defaultColor,
                }}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  {theme.name}
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {theme.category}
                </p>
              </div>

              <div
                className="h-5 w-5 border border-slate-200"
                style={{ backgroundColor: theme.defaultColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
