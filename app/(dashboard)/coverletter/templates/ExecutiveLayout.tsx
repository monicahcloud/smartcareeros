import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Photo } from "../preview/Photo";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

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
