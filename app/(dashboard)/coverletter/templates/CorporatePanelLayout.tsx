import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Body } from "../preview/Body";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

export function CorporatePanelLayout() {
  const { contactItems } = useCoverLetterPreview();

  return (
    <>
      <header className="grid grid-cols-[1fr_250px] gap-8 border-b border-slate-200 pb-6">
        <NameTitle />

        <div className="bg-slate-950 p-5 text-white">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-red-400">
            Contact
          </p>

          <div className="space-y-1 text-[10px] font-bold uppercase leading-relaxed text-white/70">
            {contactItems.length > 0 ? (
              contactItems.map((item) => <p key={item}>{item}</p>)
            ) : (
              <>
                <p>email@example.com</p>
                <p>123-456-7890</p>
                <p>Your Location</p>
              </>
            )}
          </div>
        </div>
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
