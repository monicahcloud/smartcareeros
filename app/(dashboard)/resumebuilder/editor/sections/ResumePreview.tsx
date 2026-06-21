"use client";

import ClassicLeftResumeLayout from "@/app/(dashboard)/resumes/templates/ClassicLeftResumeLayout";
import CenteredHeaderResumeLayout from "@/app/(dashboard)/resumes/templates/CenteredHeaderResumeLayout";
import SplitHeaderResumeLayout from "@/app/(dashboard)/resumes/templates/SplitHeaderResumeLayout";
import MinimalResumeLayout from "@/app/(dashboard)/resumes/templates/MinimalResumeLayout";
import ExecutiveResumeLayout from "@/app/(dashboard)/resumes/templates/ExecutiveResumeLayout";
import RightHeaderResumeLayout from "@/app/(dashboard)/resumes/templates/RightHeaderResumeLayout";
import BoxedHeaderResumeLayout from "@/app/(dashboard)/resumes/templates/BoxedHeaderResumeLayout";
import AccentBarResumeLayout from "@/app/(dashboard)/resumes/templates/AccentBarResumeLayout";
import TwoColumnMinimalResumeLayout from "@/app/(dashboard)/resumes/templates/TwoColumnMinimalResumeLayout";
import CorporatePanelResumeLayout from "@/app/(dashboard)/resumes/templates/CorporatePanelResumeLayout";
import ModernSidebarResumeLayout from "@/app/(dashboard)/resumes/templates/ModernSidebarResumeLayout";
import FederalCleanResumeLayout from "@/app/(dashboard)/resumes/templates/FederalCleanResumeLayout";
import BoldToplineResumeLayout from "@/app/(dashboard)/resumes/templates/BoldToplineResumeLayout";
import LetterheadResumeLayout from "@/app/(dashboard)/resumes/templates/LetterheadResumeLayout";
import SimpleProfessionalResumeLayout from "@/app/(dashboard)/resumes/templates/SimpleProfessionalResumeLayout";

import { ResumeData } from "@/app/(dashboard)/resumes/templates/types";
import { ResumeLayout } from "@/app/(dashboard)/resumes/templates/templateRegistry";

type ResumePreviewProps = {
  themeId: ResumeLayout | string;
  data: ResumeData;
};

export default function ResumePreview({ themeId, data }: ResumePreviewProps) {
  switch (themeId) {
    case "classic-left":
      return <ClassicLeftResumeLayout data={data} />;

    case "centered-modern":
    case "centered-header":
      return <CenteredHeaderResumeLayout data={data} />;

    case "split-corporate":
    case "split-header":
      return <SplitHeaderResumeLayout data={data} />;

    case "minimal-clean":
    case "minimal":
      return <MinimalResumeLayout data={data} />;

    case "executive-red":
    case "executive":
      return <ExecutiveResumeLayout data={data} />;

    case "right-aligned-pro":
    case "right-header":
      return <RightHeaderResumeLayout data={data} />;

    case "boxed-modern":
    case "boxed-header":
      return <BoxedHeaderResumeLayout data={data} />;

    case "accent-bar-red":
    case "accent-bar":
      return <AccentBarResumeLayout data={data} />;

    case "two-column-minimal":
      return <TwoColumnMinimalResumeLayout data={data} />;

    case "corporate-panel":
      return <CorporatePanelResumeLayout data={data} />;

    case "modern-sidebar":
      return <ModernSidebarResumeLayout data={data} />;

    case "federal-clean":
      return <FederalCleanResumeLayout data={data} />;

    case "bold-topline":
      return <BoldToplineResumeLayout data={data} />;

    case "letterhead":
      return <LetterheadResumeLayout data={data} />;

    case "simple-professional":
      return <SimpleProfessionalResumeLayout data={data} />;

    default:
      return <ClassicLeftResumeLayout data={data} />;
  }
}
