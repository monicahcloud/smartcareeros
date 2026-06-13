import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { useCoverLetterPreview } from "@/app/components/coverletter/CoverLetterPreviewContext";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";

export function FederalCleanLayout() {
  const { primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header className="border-b-4 pb-5" style={{ borderColor: primaryColor }}>
        <NameTitle />
        <div className="mt-3">
          <Contact />
        </div>
      </header>

      <section className="border border-slate-200 bg-slate-50 p-5">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          Application Recipient
        </p>
        <Recipient />
      </section>

      <Body />
      <Signature />
    </>
  );
}
