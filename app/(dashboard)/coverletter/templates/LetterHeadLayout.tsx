import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

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
