import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

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
