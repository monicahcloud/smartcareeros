import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { Photo } from "../preview/Photo";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function RightHeaderLayout() {
  const { showPhoto } = useCoverLetterPreview();

  return (
    <>
      <header className="flex items-start justify-between gap-6 border-b border-slate-200 pb-6">
        {showPhoto && <Photo />}

        <div className="ml-auto text-right">
          <NameTitle align="right" />

          <div className="mt-3">
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
