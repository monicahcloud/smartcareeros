import React from "react";

import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function AccentBarLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <div className="flex gap-8">
      <div className="w-2 shrink-0" style={{ backgroundColor: primaryColor }} />

      <div className="flex-1 space-y-8">
        <NameTitle />
        <Contact />
        <Recipient />
        <Body />
        <Signature />
      </div>
    </div>
  );
}
