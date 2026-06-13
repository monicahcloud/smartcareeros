import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

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
