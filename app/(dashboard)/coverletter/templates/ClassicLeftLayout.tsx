// components/cover-letter/layouts/ClassicLeftLayout.tsx

import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Photo } from "../preview/Photo";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

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
