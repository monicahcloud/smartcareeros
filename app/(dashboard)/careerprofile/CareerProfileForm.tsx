"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveCareerProfile } from "./actions";
import {
  AccomplishmentItem,
  CareerProfileFormState,
  CertificationItem,
  EducationItem,
  FederalDetails,
  ProjectItem,
  WorkExperience,
} from "./types";
import BasicInfoSection from "./sections/BasicInfoSection";
import ProfilePreview from "./sections/ProfilePreview";
import SkillsSection from "./sections/SkillsSection";
import TechSkillsSection from "./sections/TechSkillsSection";
import WorkExperienceSection from "./sections/WorkExperienceSection";
import EducationSection from "./sections/EducationSection";
import CertificationSection from "./sections/CertificationSection";
import AccomplishmentSection from "./sections/AccomplishmentsSection";
import ProjectsSection from "./sections/ProjectsSection";
import FederalDetailsSection from "./sections/FederalDetailsSection";
import CareerProfileHeader from "@/app/components/careerprofile/CareerProfileHeader";
import CareerProfileBreadcrumbs from "@/app/components/careerprofile/CareerProfileBreadcrumbs";
import CareerProfileFooter from "@/app/components/careerprofile/CareerProfileFooter";

type CareerProfileFormProps = {
  profile: {
    fullName: string | null;
    headline: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    website: string | null;
    linkedin: string | null;
    gitHub: string | null;
    summary: string | null;
    skills: unknown;
    techSkills: unknown;
    workExperience: unknown;
    education: unknown;
    certifications: unknown;
    projects: unknown;
    accomplishments: unknown;
    federalDetails: unknown;
  } | null;
};

const emptyFederalDetails: FederalDetails = {
  citizenship: "",
  veteranPreference: "",
  securityClearance: "",
  federalEmploymentStatus: "",
  currentGsGrade: "",
  desiredGsGrade: "",
  workSchedule: "",
  availability: "",
  willingToRelocate: "",
  supervisorContactPermission: "",
};

function buildInitialForm(
  profile: CareerProfileFormProps["profile"],
): CareerProfileFormState {
  return {
    fullName: profile?.fullName || "",
    headline: profile?.headline || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    website: profile?.website || "",
    linkedin: profile?.linkedin || "",
    gitHub: profile?.gitHub || "",
    summary: profile?.summary || "",

    skills: Array.isArray(profile?.skills) ? (profile.skills as string[]) : [],

    techSkills: Array.isArray(profile?.techSkills)
      ? (profile.techSkills as string[])
      : [],

    workExperience: Array.isArray(profile?.workExperience)
      ? (profile.workExperience as WorkExperience[])
      : [],

    education: Array.isArray(profile?.education)
      ? (profile.education as EducationItem[])
      : [],

    certifications: Array.isArray(profile?.certifications)
      ? (profile.certifications as CertificationItem[])
      : [],

    projects: Array.isArray(profile?.projects)
      ? (profile.projects as ProjectItem[])
      : [],

    accomplishments: Array.isArray(profile?.accomplishments)
      ? (profile.accomplishments as AccomplishmentItem[])
      : [],

    federalDetails:
      profile?.federalDetails &&
      typeof profile.federalDetails === "object" &&
      !Array.isArray(profile.federalDetails)
        ? (profile.federalDetails as FederalDetails)
        : emptyFederalDetails,
  };
}

export default function CareerProfileForm({ profile }: CareerProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<CareerProfileFormState>(() =>
    buildInitialForm(profile),
  );
  function handleSave() {
    startTransition(async () => {
      try {
        await saveCareerProfile(form);

        toast.success("Career profile saved.");
      } catch (error) {
        console.error(error);
        toast.error("Could not save career profile.");
      }
    });
  }
  const steps = [
    { key: "basic", title: "Basic Info" },
    { key: "skills", title: "Skills" },
    { key: "experience", title: "Experience" },
    { key: "education", title: "Education" },
    { key: "certifications", title: "Certifications" },
    { key: "projects", title: "Projects" },
    { key: "accomplishments", title: "Accomplishments" },
    { key: "federal", title: "Federal Details" },
  ] as const;

  type StepKey = (typeof steps)[number]["key"];

  const [currentStep, setCurrentStep] = useState<StepKey>("basic");

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  function goNext() {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) setCurrentStep(nextStep.key);
  }

  function goBack() {
    const previousStep = steps[currentStepIndex - 1];
    if (previousStep) setCurrentStep(previousStep.key);
  }
  function renderCurrentStep() {
    switch (currentStep) {
      case "basic":
        return <BasicInfoSection form={form} setForm={setForm} />;

      case "skills":
        return (
          <>
            <SkillsSection form={form} setForm={setForm} />
            <TechSkillsSection form={form} setForm={setForm} />
          </>
        );

      case "experience":
        return <WorkExperienceSection form={form} setForm={setForm} />;

      case "education":
        return <EducationSection form={form} setForm={setForm} />;

      case "certifications":
        return <CertificationSection form={form} setForm={setForm} />;

      case "projects":
        return <ProjectsSection form={form} setForm={setForm} />;

      case "accomplishments":
        return <AccomplishmentSection form={form} setForm={setForm} />;

      case "federal":
        return <FederalDetailsSection form={form} setForm={setForm} />;

      default:
        return null;
    }
  }

  return (
    <>
      <CareerProfileHeader />
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="space-y-4 border border-slate-200 bg-white p-6 shadow-sm">
            <CareerProfileBreadcrumbs
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />

            <div className="min-h-[560px]">{renderCurrentStep()}</div>

            <CareerProfileFooter
              currentStepIndex={currentStepIndex}
              totalSteps={steps.length}
              isPending={isPending}
              onBack={goBack}
              onNext={goNext}
              onSave={handleSave}
            />
          </div>
        </div>

        <ProfilePreview form={form} />
      </section>
    </>
  );
}
