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
  linkedin?: string;
  gitHub?: string;
  website?: string;
  photoUrl?: string;
  skills?: string[];
  workExperience?: any[];
  education?: any[];
  techSkills?: any[];
  certifications?: any[];
  projects?: any[];
  accomplishments?: any[];
  interests?: any[];
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
  linkedin: "linkedin.com/in/janedoe",
  gitHub: "github.com/janedoe",
  website: "janedoe.dev",

  photoUrl: "/images/mock-profile.jpg",

  summary:
    "Results-driven professional with experience in analytics, reporting, dashboard development, and process improvement. Skilled at transforming complex data into actionable business insights.",

  skills: [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Project Management",
  ],

  techSkills: ["Excel", "SQL", "Power BI", "Tableau", "Python"],

  workExperience: [
    {
      position: "Business Analyst",
      company: "ABC Corporation",
      location: "New York, NY",
      startDate: "2022",
      endDate: "Present",
      description:
        "Created dashboards and automated reporting processes that reduced manual work by 40%. Collaborated with stakeholders to improve business operations.",
    },
    {
      position: "Data Analyst",
      company: "XYZ Company",
      location: "Boston, MA",
      startDate: "2020",
      endDate: "2022",
      description:
        "Performed data analysis and built KPI reports for executive leadership.",
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Systems",
      school: "University Example",
      location: "New York, NY",
      startDate: "2016",
      endDate: "2020",
    },
  ],

  certifications: [
    {
      name: "Microsoft Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issuedDate: "2024",
      expiresDate: "2027",
      credentialUrl: "https://learn.microsoft.com/",
      description:
        "Validated skills in Power BI data modeling and visualization.",
    },
    {
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      issuedDate: "2023",
    },
  ],

  projects: [
    {
      name: "Sales Dashboard",
      role: "Lead Analyst",
      description:
        "Built interactive dashboards providing executive visibility into sales performance.",
      technologies: ["Power BI", "SQL", "Excel"],
      url: "github.com/janedoe/sales-dashboard",
    },
    {
      name: "HR Analytics Portal",
      role: "Business Analyst",
      description:
        "Created employee retention analytics and reporting solution.",
      technologies: ["Python", "Snowflake", "Tableau"],
    },
  ],

  accomplishments: [
    {
      title: "Employee of the Year",
      organization: "ABC Corporation",
      date: "2024",
      description:
        "Recognized for outstanding contributions and process improvements.",
      impact: "Reduced reporting time by 60%",
    },
    {
      title: "Innovation Award",
      organization: "XYZ Company",
      date: "2022",
      description: "Developed automation tools that increased efficiency.",
      impact: "Saved 15 hours per week",
    },
  ],

  interests: ["Hiking", "Chess", "Volunteering", "Travel", "Photography"],
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
