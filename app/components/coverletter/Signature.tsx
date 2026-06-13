import Image from "next/image";

import { useCoverLetterPreview } from "./CoverLetterPreviewContext";

export function Signature() {
  const { data, fullName, primaryColor } = useCoverLetterPreview();

  return (
    <footer className="space-y-2 pt-2">
      <p className="text-sm text-slate-600">Sincerely,</p>

      {data.signatureUrl ? (
        <Image
          src={data.signatureUrl}
          alt="Signature"
          width={180}
          height={72}
          className="h-16 w-auto object-contain"
          unoptimized
        />
      ) : (
        <p
          className="text-3xl"
          style={{
            fontFamily: `"Dancing Script", cursive`,
            color: data.signatureColor || primaryColor,
          }}>
          {fullName}
        </p>
      )}

      <p className="text-sm font-bold text-slate-900">{fullName}</p>
    </footer>
  );
}
