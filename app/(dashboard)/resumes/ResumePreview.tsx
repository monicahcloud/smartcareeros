/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ClassicLeftResumeLayout from "./templates/ClassicLeftResumeLayout";
import CenteredHeaderResumeLayout from "./templates/CenteredHeaderResumeLayout";
import SplitHeaderResumeLayout from "./templates/SplitHeaderResumeLayout";
import MinimalResumeLayout from "./templates/MinimalResumeLayout";
import ExecutiveResumeLayout from "./templates/ExecutiveResumeLayout";
import RightHeaderResumeLayout from "./templates/RightHeaderResumeLayout";
import BoxedHeaderResumeLayout from "./templates/BoxedHeaderResumeLayout";
import AccentBarResumeLayout from "./templates/AccentBarResumeLayout";
import TwoColumnMinimalResumeLayout from "./templates/TwoColumnMinimalResumeLayout";
import CorporatePanelResumeLayout from "./templates/CorporatePanelResumeLayout";
import ModernSidebarResumeLayout from "./templates/ModernSidebarResumeLayout";
import FederalCleanResumeLayout from "./templates/FederalCleanResumeLayout";
import BoldToplineResumeLayout from "./templates/BoldToplineResumeLayout";
import LetterheadResumeLayout from "./templates/LetterheadResumeLayout";
import SimpleProfessionalResumeLayout from "./templates/SimpleProfessionalResumeLayout";

type ResumeData = {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  summary?: string;
  skills?: string[];
  workExperience?: any[];
  education?: any[];
};

interface ResumePreviewProps {
  themeId: string;
  data?: ResumeData;
}

const MOCK_DATA: ResumeData = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Business Analyst",
  email: "janedoe@email.com",
  phone: "123-456-7890",
  address: "New York, NY",
  summary:
    "Results-driven professional with experience in analytics, reporting, and process improvement.",
  skills: ["Excel", "SQL", "Power BI", "Project Management"],
  workExperience: [
    {
      position: "Business Analyst",
      company: "ABC Corporation",
      location: "New York, NY",
      startDate: "2022",
      endDate: "Present",
      description:
        "Created dashboards and supported business reporting initiatives.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      school: "University Example",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2022",
    },
  ],
};

export default function ResumePreview({
  themeId,
  data = MOCK_DATA,
}: ResumePreviewProps) {
  switch (themeId) {
    case "classic-left":
      return <ClassicLeftResumeLayout data={data} />;

    case "centered-header":
      return <CenteredHeaderResumeLayout data={data} />;

    case "split-header":
      return <SplitHeaderResumeLayout data={data} />;

    case "minimal":
      return <MinimalResumeLayout data={data} />;

    case "executive":
      return <ExecutiveResumeLayout data={data} />;

    case "right-header":
      return <RightHeaderResumeLayout data={data} />;

    case "boxed-header":
      return <BoxedHeaderResumeLayout data={data} />;

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
