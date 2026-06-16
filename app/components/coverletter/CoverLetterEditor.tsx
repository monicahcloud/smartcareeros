"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CoverLetter, Resume, JobDescription } from "@prisma/client";
import { CoverLetterValues } from "@/lib/validation";
import CoverLetterPreview from "@/app/components/coverletter/CoverLetterPreview";
import { cn } from "@/lib/utils";
import { allSteps } from "../../(dashboard)/coverletterbuilder/editor/stepsCoverLetter";
import { COVER_LETTER_THEME_REGISTRY } from "../../(dashboard)/coverletter/templates/templateRegistry";
import BreadcrumbsCoverLetter from "../coverletterbuilder/BreadCrumbsCoverLetter";
import CoverLetterEditorFooter from "../coverletterbuilder/CoverLetterEditorFooter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAutoSaveCoverLetter from "../../(dashboard)/coverletter/useAutoSaveCoverLetter";
import Link from "next/link";
import { Eye } from "lucide-react";

interface CoverLetterEditorProps {
  userId: string;
  clerkId: string;
  initialThemeId: string;
  coverLetterToEdit: CoverLetter | null;
  resumes: Partial<Resume>[];
  jobDescription?: JobDescription | null;
}

export default function CoverLetterEditor({
  initialThemeId,
  coverLetterToEdit,
  resumes,
  jobDescription,
}: CoverLetterEditorProps) {
  const searchParams = useSearchParams();

  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [coverLetterData, setCoverLetterData] = useState<CoverLetterValues>({
    id: coverLetterToEdit?.id,

    companyName:
      coverLetterToEdit?.companyName || jobDescription?.company || "",

    jobTitle: coverLetterToEdit?.jobTitle || jobDescription?.title || "",

    firstName: coverLetterToEdit?.firstName || "",

    lastName: coverLetterToEdit?.lastName || "",

    userEmail: coverLetterToEdit?.userEmail || "",

    userPhone: coverLetterToEdit?.userPhone || "",

    userAddress: coverLetterToEdit?.userAddress || "",

    recipientName: coverLetterToEdit?.recipientName || "",

    companyEmail: coverLetterToEdit?.companyEmail || "",

    companyPhone: coverLetterToEdit?.companyPhone || "",

    companyAddress: coverLetterToEdit?.companyAddress || "",

    body: coverLetterToEdit?.body || "",

    linkedin: coverLetterToEdit?.linkedin || "",

    website: coverLetterToEdit?.website || "",

    signatureUrl: coverLetterToEdit?.signatureUrl || "",

    signatureColor: coverLetterToEdit?.signatureColor || "#000000",

    userPhotoUrl: coverLetterToEdit?.userPhotoUrl || undefined,

    userPhoto: undefined,
    themeId: coverLetterToEdit?.themeId || initialThemeId,

    themeColor: coverLetterToEdit?.themeColor || "#dc2626",

    borderStyle: coverLetterToEdit?.borderStyle || "rounded",

    showPhoto: coverLetterToEdit?.showPhoto ?? true,
  });
  const { isSaving, hasUnsavedChanges, isError } =
    useAutoSaveCoverLetter(coverLetterData);
  const currentStep = searchParams.get("step") || allSteps[0].key;

  const currentStepData = allSteps.find((step) => step.key === currentStep);
  const isLastStep = currentStep === "signature";
  const CurrentStepComponent = currentStepData?.component;
  // const activeTheme = useMemo(() => {
  //   return (
  //     COVER_LETTER_THEME_REGISTRY.find(
  //       (theme) => theme.id === coverLetterData.themeId,
  //     ) || COVER_LETTER_THEME_REGISTRY[0]
  //   );
  // }, [coverLetterData.themeId]);

  const handleStepChange = (step: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("step", step);

    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-6 px-4 py-5 lg:px-8">
          {/* TOP */}
          <div className="flex items-center justify-between gap-4">
            <div>
              {/* <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
                Smart CareerOS
              </p> */}

              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Cover Letter Builder
              </h1>
            </div>

            <div className="flex items-end gap-3">
              <div className="w-full max-w-xs">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                  Switch Template
                </p>

                <Select
                  value={coverLetterData.themeId || "classic-left"}
                  onValueChange={(themeId) => {
                    const selectedTheme = COVER_LETTER_THEME_REGISTRY.find(
                      (theme) => theme.id === themeId,
                    );

                    setCoverLetterData((prev) => ({
                      ...prev,
                      themeId,
                      themeColor:
                        prev.themeColor ||
                        selectedTheme?.defaultColor ||
                        "#dc2626",
                    }));
                  }}>
                  <SelectTrigger className="h-12 border-slate-200 bg-white font-bold">
                    <SelectValue placeholder="Choose template" />
                  </SelectTrigger>

                  <SelectContent>
                    {COVER_LETTER_THEME_REGISTRY.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.name} — {theme.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              {coverLetterData.id && (
                <Link
                  href={
                    isLastStep
                      ? `/coverletter/preview/${coverLetterData.id}`
                      : "#"
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
          <BreadcrumbsCoverLetter
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
            {CurrentStepComponent && (
              <CurrentStepComponent
                coverLetterData={coverLetterData}
                setCoverLetterData={setCoverLetterData}
                resumes={resumes}
                jobDescription={jobDescription}
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
              <CoverLetterPreview coverLetterData={coverLetterData} />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <CoverLetterEditorFooter
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        showMobilePreview={showMobilePreview}
        setShowMobilePreview={setShowMobilePreview}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        isError={isError}
      />
    </div>
  );
}
