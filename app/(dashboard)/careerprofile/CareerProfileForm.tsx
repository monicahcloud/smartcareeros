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
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Profile Details
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
            Core Career Information
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Start with the information that will be reused across your resumes,
            cover letters, and interview preparation.
          </p>
        </div>

        <div className="space-y-4 border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {steps.map((step, index) => (
              <button
                key={step.key}
                type="button"
                onClick={() => setCurrentStep(step.key)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
                  currentStep === step.key
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}>
                {index + 1}. {step.title}
              </button>
            ))}
          </div>

          <div className="min-h-[560px]">{renderCurrentStep()}</div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStepIndex === 0}
              className="h-12 border border-slate-200 px-6 text-xs font-black uppercase tracking-[0.16em] text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
              Back
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="h-12 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
                {isPending ? "Saving..." : "Save"}
              </button>

              {currentStepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="h-12 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending}
                  className="h-12 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600 disabled:opacity-60">
                  Finish
                </button>
              )}
            </div>
          </div>
          {/* <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="h-12 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
            {isPending ? "Saving..." : "Save Career Profile"}
          </button> */}
        </div>
      </div>

      <ProfilePreview form={form} />
    </section>
  );
}
