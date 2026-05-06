// components/cover-letter/preview-blocks/RecipientBlock.tsx

import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function Recipient() {
  const { data, currentDate } = useCoverLetterPreview();

  return (
    <section className="space-y-1 text-[13px] leading-relaxed">
      <p className="mb-3 font-bold text-slate-900">{currentDate}</p>
      <p className="font-bold text-slate-900">
        {data.recipientName || "Hiring Manager"}
      </p>
      <p className="font-medium text-slate-700">
        {data.companyName || "Company Name"}
      </p>
      {data.companyAddress && (
        <p className="text-slate-500">{data.companyAddress}</p>
      )}
    </section>
  );
}
