// components/cover-letter/preview-blocks/NameTitle.tsx

import { cn } from "@/lib/utils";
import { useCoverLetterPreview } from "./CoverLetterPreviewContext";

export function NameTitle({
  align = "left",
  size = "large",
  dark = false,
}: {
  align?: "left" | "center" | "right";
  size?: "small" | "large";
  dark?: boolean;
}) {
  const { data, fullName, primaryColor, fonts } = useCoverLetterPreview();

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "right" && "text-right",
      )}>
      <h1
        className={cn(
          "font-black uppercase tracking-tight",
          size === "large" ? "text-4xl" : "text-3xl",
          dark && "text-white",
        )}
        style={{
          color: dark ? undefined : primaryColor,
          fontFamily: fonts.heading,
        }}>
        {fullName}
      </h1>

      <p
        className={cn(
          "mt-2 text-xs font-bold uppercase tracking-[0.2em]",
          dark ? "text-red-400" : "text-slate-500",
        )}>
        {data.jobTitle || "Professional Title"}
      </p>
    </div>
  );
}
