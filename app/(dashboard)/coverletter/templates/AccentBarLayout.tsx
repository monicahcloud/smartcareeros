import React from "react";

import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Photo } from "../preview/Photo";

export function AccentBarLayout() {
  const { primaryColor, showPhoto } = useCoverLetterPreview();

  return (
    <div className="flex gap-8">
      <div
        className="w-2 shrink-0 rounded-full"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="flex-1 space-y-8">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-5">
            <NameTitle />
            <Contact />
          </div>

          {showPhoto && <Photo />}
        </div>

        <Recipient />
        <Body />
        <Signature />
      </div>
    </div>
  );
}
