import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";
import { Photo } from "../preview/Photo";
import { useCoverLetterPreview } from "../CoverLetterPreviewContext";

export function BoxedHeaderLayout() {
  const { data, fullName, primaryColor, showPhoto } = useCoverLetterPreview();

  return (
    <>
      <header
        className="flex items-center justify-between gap-6 p-6 text-white"
        style={{ backgroundColor: primaryColor }}>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">
            {fullName}
          </h1>

          <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
            {data.jobTitle || "Professional Title"}
          </p>
        </div>

        {showPhoto && (
          <div className="shrink-0 bg-white/10 p-1">
            <Photo />
          </div>
        )}
      </header>

      <Contact />
      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
