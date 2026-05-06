import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

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
