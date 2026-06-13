import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function LetterheadLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header className="text-center">
        <NameTitle align="center" />

        <div className="mt-4">
          <Contact align="center" />
        </div>

        <div
          className="mx-auto mt-5 h-0.5 w-full"
          style={{ backgroundColor: primaryColor }}
        />
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
