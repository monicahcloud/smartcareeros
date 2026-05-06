import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Photo } from "../preview/Photo";

export function TwoColumnMinimalLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <div className="grid grid-cols-[210px_1fr] gap-10">
      <aside className="space-y-6 border-r border-slate-200 pr-6">
        <Photo />
        <NameTitle size="small" />
        <div className="h-1 w-16" style={{ backgroundColor: primaryColor }} />

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
            Contact
          </p>
          <Contact />
        </div>
      </aside>

      <main className="space-y-8">
        <Recipient />
        <Body />
        <Signature />
      </main>
    </div>
  );
}
