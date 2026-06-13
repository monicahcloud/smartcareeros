// components/cover-letter/preview-blocks/Contact.tsx

import { cn } from "@/lib/utils";
import { useCoverLetterPreview } from "./CoverLetterPreviewContext";

export function Contact({
  align = "left",
  dark = false,
}: {
  align?: "left" | "center" | "right";
  dark?: boolean;
}) {
  const { contactItems } = useCoverLetterPreview();

  return (
    <div
      className={cn(
        "space-y-1 text-[10px] font-bold uppercase leading-relaxed",
        dark ? "text-white/70" : "text-slate-500",
        align === "center" && "text-center",
        align === "right" && "text-right",
      )}>
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
  );
}
