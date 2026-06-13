import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

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
