import BasicInfoSection from "./sections/BasicInfoSection";
import PersonalInfoSection from "./sections/PersonalInfoForm";
import WorkExperienceSection from "./sections/WorkExperienceSection";
import EducationSection from "./sections/EducationSection";
import CertificationsSection from "./sections/CertificationsSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import TechnicalSkillsSection from "./sections/TechnicalSkillsForm";
import AccomplishmentsSection from "./sections/AccomplishmentsSection";
import InterestSection from "./sections/InterestSection";
import SummarySection from "./sections/SummaryForm";

import type { ResumeFormState } from "./[id]/types";

export type ResumeSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export type ResumeStep = {
  key: string;
  title: string;
  component: React.ComponentType<ResumeSectionProps>;
};

export const allSteps: ResumeStep[] = [
  {
    key: "general",
    title: "General",
    component: BasicInfoSection,
  },
  {
    key: "personal",
    title: "Personal Info",
    component: PersonalInfoSection,
  },
  {
    key: "experience",
    title: "Experience",
    component: WorkExperienceSection,
  },
  {
    key: "education",
    title: "Education",
    component: EducationSection,
  },
  {
    key: "certifications",
    title: "Certifications",
    component: CertificationsSection,
  },
  {
    key: "projects",
    title: "Projects",
    component: ProjectsSection,
  },
  {
    key: "skills",
    title: "Skills",
    component: SkillsSection,
  },
  {
    key: "technical",
    title: "Technical Skills",
    component: TechnicalSkillsSection,
  },
  {
    key: "accomplishments",
    title: "Accomplishments",
    component: AccomplishmentsSection,
  },
  {
    key: "interests",
    title: "Interests",
    component: InterestSection,
  },
  {
    key: "summary",
    title: "Summary",
    component: SummarySection,
  },
];

export function getSteps(resumeType?: string): ResumeStep[] {
  if (resumeType?.toUpperCase() === "FEDERAL") {
    return allSteps.map((step) =>
      step.key === "experience"
        ? {
            ...step,
            title: "Federal Experience",
          }
        : step,
    );
  }

  return allSteps;
}
