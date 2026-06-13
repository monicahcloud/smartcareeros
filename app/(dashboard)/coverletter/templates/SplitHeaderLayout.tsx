import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Photo } from "@/app/components/coverletter/Photo";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function SplitHeaderLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header className="grid grid-cols-[1fr_auto] items-end gap-8 border-b border-slate-200 pb-6">
        <div>
          <p
            className="mb-3 text-xs font-black uppercase tracking-[0.24em]"
            style={{ color: primaryColor }}>
            Cover Letter
          </p>

          <NameTitle />
        </div>

        <div className="flex items-center gap-4">
          <Photo />
          <Contact align="right" />
        </div>
      </header>

      <div className="grid grid-cols-[220px_1fr] gap-10">
        <aside className="bg-slate-50 p-5">
          <Recipient />
        </aside>

        <main className="space-y-8">
          <Body />
          <Signature />
        </main>
      </div>
    </>
  );
}
