// components/cover-letter/CoverLetterPreview.tsx

"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { CoverLetterData } from "../../(dashboard)/coverletter/type";

import { CoverLetterPreviewProvider } from "./CoverLetterPreviewContext";
import {
  COVER_LETTER_THEME_REGISTRY,
  CoverLetterLayout,
} from "../../(dashboard)/coverletter/templates/templateRegistry";
import { ClassicLeftLayout } from "../../(dashboard)/coverletter/templates/ClassicLeftLayout";
import { CenteredHeaderLayout } from "../../(dashboard)/coverletter/templates/CenterHeaderLayout";
import { SplitHeaderLayout } from "../../(dashboard)/coverletter/templates/SplitHeaderLayout";
import { MinimalLayout } from "../../(dashboard)/coverletter/templates/MinimalLayout";
import { ExecutiveLayout } from "../../(dashboard)/coverletter/templates/ExecutiveLayout";
import { RightHeaderLayout } from "../../(dashboard)/coverletter/templates/RightHeaderLayout";
import { BoxedHeaderLayout } from "../../(dashboard)/coverletter/templates/BoxedHeaderLayout";
import { TwoColumnMinimalLayout } from "../../(dashboard)/coverletter/templates/TwoColumnMinimalLayout";
import { CorporatePanelLayout } from "../../(dashboard)/coverletter/templates/CorporatePanelLayout";
import { ModernSidebarLayout } from "../../(dashboard)/coverletter/templates/ModernSidebarLayout";
import { FederalCleanLayout } from "../../(dashboard)/coverletter/templates/FederalCleanLayout";
import { BoldToplineLayout } from "../../(dashboard)/coverletter/templates/BoldTopLineLayout";
import { LetterheadLayout } from "../../(dashboard)/coverletter/templates/LetterHeadLayout";
import { SimpleProfessionalLayout } from "../../(dashboard)/coverletter/templates/SimpleProfessionalLayout";
import { AccentBarLayout } from "../../(dashboard)/coverletter/templates/AccentBarLayout";

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
    case "centered-header":
      return <CenteredHeaderLayout />;
    case "split-header":
      return <SplitHeaderLayout />;
    case "minimal":
      return <MinimalLayout />;
    case "executive":
      return <ExecutiveLayout />;
    case "right-header":
      return <RightHeaderLayout />;
    case "boxed-header":
      return <BoxedHeaderLayout />;
    case "accent-bar":
      return <AccentBarLayout />;
    case "two-column-minimal":
      return <TwoColumnMinimalLayout />;
    case "corporate-panel":
      return <CorporatePanelLayout />;
    case "modern-sidebar":
      return <ModernSidebarLayout />;
    case "federal-clean":
      return <FederalCleanLayout />;
    case "bold-topline":
      return <BoldToplineLayout />;
    case "letterhead":
      return <LetterheadLayout />;
    case "simple-professional":
      return <SimpleProfessionalLayout />;
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

  const photoSrc = useMemo(() => {
    const photo = coverLetterData.userPhoto || coverLetterData.userPhotoUrl;

    if (!photo) return null;

    if (typeof photo === "string") return photo;

    return URL.createObjectURL(photo);
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
