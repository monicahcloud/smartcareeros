"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveResumeBasics } from "./actions";
import {
  AccomplishmentItem,
  CertificationItem,
  EducationItem,
  ProjectItem,
  ResumeFormState,
  WorkExperienceItem,
} from "./types";
import BasicInfoSection from "../sections/BasicInfoSection";
import SkillsSection from "../sections/SkillsSection";
import ResumePreview from "../sections/ResumePreview";
import ResumeEditorHeader from "@/app/components/resumebuilder/editor/ResumeEditorHeader";
import ResumeEditorBreadcrumbs from "@/app/components/resumebuilder/editor/ResumeEditorBreadcrumbs";
import ResumeEditorFooter from "@/app/components/resumebuilder/editor/ResumeEditorFooter";
import WorkExperienceSection from "../sections/WorkExperienceSection";
import EducationSection from "../sections/EducationSection";
import CertificationsSection from "../sections/CertificationsSection";
import ProjectsSection from "../sections/ProjectsSection";
import AccomplishmentsSection from "../sections/AccomplishmentsSection";

type ResumeEditorProps = {
  resumeToEdit: {
    id: string;
    resumeTitle: string | null;
    resumeType: string | null;
    summary: string | null;
    jobTitle?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    skills?: string[];
    techSkills?: Array<
      | string
      | {
          id?: string;
          resumeId?: string;
          name?: string | null;
          rating?: number | null;
          createdAt?: Date | string;
          updatedAt?: Date | string;
        }
    >;
    workExperience?: WorkExperienceItem[];
    education?: EducationItem[];
    certifications?: CertificationItem[];
    projects?: ProjectItem[];
    accomplishments?: AccomplishmentItem[];
  };
};

const steps = [
  { key: "basic", title: "Basic Info" },
  { key: "skills", title: "Skills" },
  { key: "experience", title: "Experience" },
  { key: "education", title: "Education" },
  { key: "certifications", title: "Certifications" },
  { key: "projects", title: "Projects" },
  { key: "accomplishments", title: "Accomplishments" },
  { key: "review", title: "Review" },
] as const;

type StepKey = (typeof steps)[number]["key"];

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<StepKey>("basic");

  const [form, setForm] = useState<ResumeFormState>({
    resumeTitle: resumeToEdit.resumeTitle || "",
    jobTitle: resumeToEdit.jobTitle || "",
    firstName: resumeToEdit.firstName || "",
    lastName: resumeToEdit.lastName || "",
    email: resumeToEdit.email || "",
    phone: resumeToEdit.phone || "",
    address: resumeToEdit.address || "",
    summary: resumeToEdit.summary || "",
    skills: resumeToEdit.skills || [],
    techSkills: Array.isArray(resumeToEdit.techSkills)
      ? resumeToEdit.techSkills
          .map((skill) =>
            typeof skill === "string" ? skill : skill.name || "",
          )
          .filter(Boolean)
      : [],
    workExperience: resumeToEdit.workExperience || [],
    education: resumeToEdit.education || [],
    certifications: resumeToEdit.certifications || [],
    projects: resumeToEdit.projects || [],
    accomplishments: resumeToEdit.accomplishments || [],
  });

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  function goNext() {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) setCurrentStep(nextStep.key);
  }

  function goBack() {
    const previousStep = steps[currentStepIndex - 1];
    if (previousStep) setCurrentStep(previousStep.key);
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await saveResumeBasics({
          resumeId: resumeToEdit.id,
          ...form,
        });

        toast.success("Resume saved.");
      } catch (error) {
        console.error(error);
        toast.error("Could not save resume.");
      }
    });
  }

  function renderCurrentStep() {
    switch (currentStep) {
      case "basic":
        return <BasicInfoSection form={form} setForm={setForm} />;

      case "skills":
        return <SkillsSection form={form} setForm={setForm} />;
      case "experience":
        return <WorkExperienceSection form={form} setForm={setForm} />;

      case "education":
        return <EducationSection form={form} setForm={setForm} />;

      case "certifications":
        return <CertificationsSection form={form} setForm={setForm} />;

      case "projects":
        return <ProjectsSection form={form} setForm={setForm} />;

      case "accomplishments":
        return <AccomplishmentsSection form={form} setForm={setForm} />;

      case "review":
        return <ResumePreview form={form} />;

      default:
        return null;
    }
  }

  return (
    <main className="grid min-h-screen gap-6 bg-slate-50 p-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6">
        <ResumeEditorHeader resumeTitle={form.resumeTitle} />

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <ResumeEditorBreadcrumbs
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <div className="min-h-[560px] py-6">{renderCurrentStep()}</div>

          <ResumeEditorFooter
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            isPending={isPending}
            onBack={goBack}
            onNext={goNext}
            onSave={handleSave}
          />
        </div>
      </section>

      <ResumePreview form={form} />
    </main>
  );
}
