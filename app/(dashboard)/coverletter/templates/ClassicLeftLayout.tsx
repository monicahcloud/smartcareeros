// components/cover-letter/layouts/ClassicLeftLayout.tsx
import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function ClassicLeftLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header
        className="flex items-start justify-between gap-8 border-b-2 pb-5"
        style={{ borderColor: primaryColor }}>
        <div className="flex items-center gap-6">
          <NameTitle />
        </div>

        <Contact align="right" />
        <Photo />
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
