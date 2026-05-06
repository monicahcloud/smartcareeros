// components/cover-letter/CoverLetterPreview.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CoverLetterData } from "./type";

import { CoverLetterPreviewProvider } from "./CoverLetterPreviewContext";
import {
  COVER_LETTER_THEME_REGISTRY,
  CoverLetterLayout,
} from "./templates/templateRegistry";
import { ClassicLeftLayout } from "./templates/ClassicLeftLayout";

type CoverLetterPreviewProps = {
  coverLetterData: CoverLetterData;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement | null>;
};

const fontPairs = {
  professional: {
    heading:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    body: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  modern: {
    heading:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    body: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  traditional: {
    heading: "Georgia, Cambria, 'Times New Roman', Times, serif",
    body: "Georgia, Cambria, 'Times New Roman', Times, serif",
  },
};

function RenderCoverLetterLayout({ layout }: { layout: CoverLetterLayout }) {
  switch (layout) {
    case "classic-left":
    default:
      return <ClassicLeftLayout />;
  }
}

export default function CoverLetterPreview({
  coverLetterData,
  className,
  contentRef,
}: CoverLetterPreviewProps) {
  const theme = useMemo(() => {
    return (
      COVER_LETTER_THEME_REGISTRY.find(
        (item) => item.id === coverLetterData.themeId,
      ) || COVER_LETTER_THEME_REGISTRY[0]
    );
  }, [coverLetterData.themeId]);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    const photo = coverLetterData.userPhoto || coverLetterData.userPhotoUrl;

    if (!photo) {
      setPhotoSrc(null);
      return;
    }

    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPhotoSrc(photo);
  }, [coverLetterData.userPhoto, coverLetterData.userPhotoUrl]);

  const primaryColor = coverLetterData.themeColor || theme.defaultColor;

  const fullName =
    `${coverLetterData.firstName || ""} ${coverLetterData.lastName || ""}`.trim() ||
    "Your Name";

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const contactItems = [
    coverLetterData.userEmail,
    coverLetterData.userPhone,
    coverLetterData.userAddress,
    coverLetterData.website,
    coverLetterData.linkedin,
  ].filter(Boolean) as string[];

  return (
    <CoverLetterPreviewProvider
      value={{
        data: coverLetterData,
        primaryColor,
        fullName,
        currentDate,
        photoSrc,
        showPhoto: Boolean(photoSrc && coverLetterData.showPhoto),
        contactItems,
        fonts: fontPairs[theme.fontId],
      }}>
      <div
        ref={contentRef}
        className={cn(
          "cover-letter-paper-container min-h-[297mm] w-[210mm] overflow-hidden bg-white text-slate-900 shadow-xl print:min-h-screen print:w-full print:shadow-none",
          className,
        )}
        style={{ fontFamily: fontPairs[theme.fontId].body }}>
        <div
          className={cn(
            "space-y-8 p-16",
            theme.spacing === "compact" && "space-y-5 p-12",
            theme.spacing === "relaxed" && "space-y-10 p-16",
          )}>
          <RenderCoverLetterLayout layout={theme.layout} />
        </div>
      </div>
    </CoverLetterPreviewProvider>
  );
}
