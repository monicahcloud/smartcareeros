import { Body } from "../preview/Body";;
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";
import { Photo } from "../preview/Photo";

export function ModernSidebarLayout() {
  const { data, fullName, contactItems } = useCoverLetterPreview();

  return (
    <div className="grid grid-cols-[230px_1fr] gap-8">
      <aside className="bg-slate-950 p-6 text-white">
        <div className="mb-6">
          <Photo/>
        </div>

        <h1 className="text-3xl font-black uppercase leading-none">
          {fullName}
        </h1>

        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
          {data.jobTitle || "Professional Title"}
        </p>

        <div className="mt-8 space-y-2 text-[10px] font-bold uppercase leading-relaxed text-white/60">
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
      </aside>

      <main className="space-y-8">
        <Recipient />
        <Body />
        <Signature />
      </main>
    </div>
  );
}
