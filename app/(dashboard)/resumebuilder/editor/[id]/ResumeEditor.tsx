"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye } from "lucide-react";

import {
  Certification,
  Education,
  JobDescription,
  Project,
  Resume,
  TechSkill,
  WorkExperience,
} from "@prisma/client";

import { cn } from "@/lib/utils";
import { ResumeFormState } from "./types";

import BasicInfoSection from "../sections/BasicInfoSection";
import SkillsSection from "../sections/SkillsSection";
import WorkExperienceSection from "../sections/WorkExperienceSection";
import EducationSection from "../sections/EducationSection";
import CertificationsSection from "../sections/CertificationsSection";
import ProjectsSection from "../sections/ProjectsSection";
import AccomplishmentsSection from "../sections/AccomplishmentsSection";
import ResumePreview from "../sections/ResumePreview";

import ResumeEditorBreadcrumbs from "@/app/components/resumebuilder/editor/ResumeEditorBreadcrumbs";
import ResumeEditorFooter from "@/app/components/resumebuilder/editor/ResumeEditorFooter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PersonalInfoSection from "../sections/PersonalInfoForm";
import TechnicalSkillsSection from "../sections/TechnicalSkillsForm";
import SummarySection from "../sections/SummaryForm";
import InterestSection from "../sections/InterestSection";
import {
  RESUME_THEME_REGISTRY,
  ResumeLayout,
} from "@/app/(dashboard)/resumes/templates/templateRegistry";

type ResumeWithRelations = Resume & {
  techSkills: TechSkill[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
};

interface ResumeEditorProps {
  userId: string;
  clerkId: string;
  initialThemeId: string;
  resumeToEdit: ResumeWithRelations | null;
  resumes: Partial<Resume>[];
  jobDescription?: JobDescription | null;
}

const allResumeSteps = [
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
    key: "summary",
    title: "Summary",
    component: SummarySection,
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
    key: "review",
    title: "Review",
    component: null,
  },
] as const;

export default function ResumeEditor({
  initialThemeId,
  resumeToEdit,
  jobDescription,
}: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeFormState>({
    resumeTitle: resumeToEdit?.resumeTitle || "",
    resumeType: resumeToEdit?.resumeType || "",
    description: resumeToEdit?.description || "",
    jobTitle: resumeToEdit?.jobTitle || jobDescription?.title || "",
    firstName: resumeToEdit?.firstName || "",
    lastName: resumeToEdit?.lastName || "",
    email: resumeToEdit?.email || "",
    phone: resumeToEdit?.phone || "",
    address: resumeToEdit?.address || "",
    summary: resumeToEdit?.summary || "",
    skills: resumeToEdit?.skills || [],
    techSkills:
      resumeToEdit?.techSkills
        ?.map((skill) => skill.name || "")
        .filter(Boolean) || [],

    workExperience:
      resumeToEdit?.workExperience?.map((exp) => ({
        company: exp.company || "",
        position: exp.position || "",
        location: exp.location || "",
        startDate: exp.startDate
          ? exp.startDate.toISOString().slice(0, 10)
          : "",
        endDate: exp.endDate ? exp.endDate.toISOString().slice(0, 10) : "",
        description: exp.description || "",
      })) || [],

    education:
      resumeToEdit?.education?.map((edu) => ({
        school: edu.school || "",
        degree: edu.degree || "",
        location: edu.location || "",
        startDate: edu.startDate
          ? edu.startDate.toISOString().slice(0, 10)
          : "",
        endDate: edu.endDate ? edu.endDate.toISOString().slice(0, 10) : "",
      })) || [],

    certifications:
      resumeToEdit?.certifications?.map((cert) => ({
        name: cert.name || "",
        issuer: cert.issuer || "",
        issuedDate: cert.issuedDate
          ? cert.issuedDate.toISOString().slice(0, 10)
          : "",
        expiresDate: cert.expiresDate
          ? cert.expiresDate.toISOString().slice(0, 10)
          : "",
        credentialUrl: cert.credentialUrl || "",
        description: cert.description || "",
      })) || [],

    projects:
      resumeToEdit?.projects?.map((project) => ({
        name: project.name || "",
        role: project.role || "",
        description: project.description || "",
        technologies: project.technologies || [],
        url: project.url || "",
      })) || [],

    accomplishments: [],
    interests: resumeToEdit?.interest || [],
    themeId: resumeToEdit?.themeId || initialThemeId,
    themeColor: resumeToEdit?.themeColor || "#2563eb",
    borderStyle: resumeToEdit?.borderStyle || "squircle",
  });

  const currentStep = searchParams.get("step") || allResumeSteps[0].key;
  const currentStepData = allResumeSteps.find(
    (step) => step.key === currentStep,
  );

  const isLastStep = currentStep === "review";
  const CurrentStepComponent = currentStepData?.component;

  const handleStepChange = (step: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("step", step);

    window.history.pushState(null, "", `?${params.toString()}`);
  };
  const currentTheme =
    RESUME_THEME_REGISTRY.find((theme) => theme.id === resumeData.themeId) ||
    RESUME_THEME_REGISTRY[0];

  const previewData = {
    firstName: resumeData.firstName,
    lastName: resumeData.lastName,
    jobTitle: resumeData.jobTitle,

    email: resumeData.email,
    phone: resumeData.phone,
    address: resumeData.address,
    website: resumeData.website,
    linkedin: resumeData.linkedin,
    github: resumeData.github || resumeData.gitHub,

    photoUrl: resumeData.photoUrl,
    showPhoto: resumeData.showPhoto ?? true,

    summary: resumeData.summary,

    skills: resumeData.skills ?? [],
    techSkills: resumeData.techSkills ?? [],
    workExperience: resumeData.workExperience ?? [],
    education: resumeData.education ?? [],
    certifications: resumeData.certifications ?? [],
    projects: resumeData.projects ?? [],
    accomplishments: resumeData.accomplishments ?? [],
    interests: resumeData.interests ?? [],
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-6 px-4 py-5 lg:px-8">
          {/* TOP */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Resume Builder
              </h1>
            </div>

            <div className="flex items-end gap-3">
              <div className="w-full max-w-xs">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                  Switch Template
                </p>

                <Select
                  value={resumeData.themeId || "classic-left"}
                  onValueChange={(themeId) => {
                    const selectedTheme = RESUME_THEME_REGISTRY.find(
                      (theme) => theme.id === themeId,
                    );

                    setResumeData((prev) => ({
                      ...prev,
                      themeId,
                      themeColor:
                        prev.themeColor ||
                        selectedTheme?.defaultColor ||
                        "#2563eb",
                    }));
                  }}>
                  <SelectTrigger className="h-12 border-slate-200 bg-white font-bold">
                    <SelectValue placeholder="Choose template" />
                  </SelectTrigger>

                  <SelectContent>
                    {RESUME_THEME_REGISTRY.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.name} — {theme.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              {resumeToEdit?.id && (
                <Link
                  href={
                    isLastStep ? `/resumes/preview/${resumeToEdit.id}` : "#"
                  }
                  onClick={(e) => {
                    if (!isLastStep) {
                      e.preventDefault();
                    }
                  }}
                  className={`inline-flex h-12 items-center justify-center rounded-full gap-2 px-6 text-xs font-black uppercase tracking-widest transition ${
                    isLastStep
                      ? "bg-red-600 text-white hover:bg-black"
                      : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}>
                  <Eye className="h-4 w-4" />
                  {isLastStep ? "Finish & Preview" : "Complete All Steps First"}
                </Link>
              )}
            </div>
          </div>

          {/* BREADCRUMBS */}
          <ResumeEditorBreadcrumbs
            steps={allResumeSteps}
            currentStep={currentStep}
            setCurrentStep={handleStepChange}
          />
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE */}
        <div
          className={cn(
            "w-full overflow-y-auto border-r border-slate-200 bg-white md:w-1/2",
            showMobilePreview && "hidden md:block",
          )}>
          <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
            {CurrentStepComponent ? (
              <CurrentStepComponent form={resumeData} setForm={setResumeData} />
            ) : (
              <ResumePreview
                themeId={currentTheme.layout as ResumeLayout}
                data={previewData}
              />
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={cn(
            "w-full overflow-y-auto bg-slate-100 md:w-1/2",
            !showMobilePreview && "hidden md:block",
          )}>
          <div className="flex min-h-full items-start justify-center overflow-auto p-4 lg:p-8">
            <div className="origin-top scale-[0.5] lg:scale-[0.58] xl:scale-[0.65] 2xl:scale-[0.72]">
              <ResumePreview
                themeId={currentTheme.layout as ResumeLayout}
                data={previewData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <ResumeEditorFooter
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        showMobilePreview={showMobilePreview}
        setShowMobilePreview={setShowMobilePreview}
        isSaving={false}
        hasUnsavedChanges={false}
        isError={false}
      />
    </div>
  );
}
