import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function BoldToplineLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <div className="h-3 w-full" style={{ backgroundColor: primaryColor }} />

      <header className="pt-5">
        <NameTitle />
        <div className="mt-3">
          <Contact />
        </div>
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
