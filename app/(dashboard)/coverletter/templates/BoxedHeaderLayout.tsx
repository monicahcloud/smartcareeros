import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function BoxedHeaderLayout() {
  const { data, fullName, primaryColor } = useCoverLetterPreview();

  return (
    <>
      <header
        className="p-6 text-white"
        style={{ backgroundColor: primaryColor }}>
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {fullName}
        </h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
          {data.jobTitle || "Professional Title"}
        </p>
      </header>

      <Contact />
      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
