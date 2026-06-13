import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function ExecutiveLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header className="border-l-4 pl-6" style={{ borderColor: primaryColor }}>
        <div className="flex items-start justify-between gap-8">
          <NameTitle />

          <div className="flex items-start gap-4">
            <Photo />
            <Contact align="right" />
          </div>
        </div>
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
