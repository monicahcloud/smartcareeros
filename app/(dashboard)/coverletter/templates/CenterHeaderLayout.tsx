import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

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
