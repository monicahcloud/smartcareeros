import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Photo } from "../preview/Photo";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

export function CenteredHeaderLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header className="space-y-4 border-b border-slate-200 pb-6 text-center">
        <div className="flex justify-center">
          <Photo />
        </div>

        <NameTitle align="center" />
        <Contact align="center" />

        <div
          className="mx-auto h-1 w-24"
          style={{ backgroundColor: primaryColor }}
        />
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
