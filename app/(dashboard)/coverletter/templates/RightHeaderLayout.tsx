import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

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
