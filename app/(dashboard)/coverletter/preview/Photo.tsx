// components/cover-letter/preview-blocks/PhotoBlock.tsx

import Image from "next/image";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function Photo() {
  const { photoSrc, fullName, showPhoto } = useCoverLetterPreview();

  if (!showPhoto || !photoSrc) return null;

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-slate-200 bg-slate-100">
      <Image
        src={photoSrc}
        alt={fullName}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
