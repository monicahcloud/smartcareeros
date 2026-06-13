// components/cover-letter/preview-blocks/BodyBlock.tsx

import { useCoverLetterPreview } from "./CoverLetterPreviewContext";

const fallbackBody = `<p>I am writing to express my interest in this opportunity. With a strong background in delivering results, problem-solving, and collaborating across teams, I am confident in my ability to contribute meaningful value to your organization.</p><p>Throughout my experience, I have developed the ability to manage priorities, communicate clearly, and deliver high-quality outcomes. I would welcome the opportunity to discuss how my background aligns with your needs.</p>`;

export function Body() {
  const { data } = useCoverLetterPreview();

  return (
    <article
      className="prose prose-slate max-w-none text-[14px] leading-relaxed text-slate-800"
      dangerouslySetInnerHTML={{
        __html: data.body || fallbackBody,
      }}
    />
  );
}
