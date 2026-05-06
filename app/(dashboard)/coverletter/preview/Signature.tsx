// components/cover-letter/preview-blocks/SignatureBlock.tsx

import Image from "next/image";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function Signature() {
  const { data, fullName, primaryColor } = useCoverLetterPreview();

  return (
    <footer className="space-y-2 pt-2">
      <p className="text-sm text-slate-600">Sincerely,</p>

      {data.signatureUrl ? (
        <Image
          src={data.signatureUrl}
          alt="Signature"
          width={160}
          height={64}
          className="h-16 w-auto object-contain"
          unoptimized
        />
      ) : (
        <p
          className="font-serif text-2xl italic"
          style={{ color: data.signatureColor || primaryColor }}>
          {fullName}
        </p>
      )}

      <p className="text-sm font-bold text-slate-900">{fullName}</p>
    </footer>
  );
}
