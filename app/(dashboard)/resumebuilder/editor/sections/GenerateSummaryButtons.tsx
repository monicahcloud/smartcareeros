"use client";

import { toast } from "sonner";
import { WandSparkles } from "lucide-react";
import { useState } from "react";

import { generateSummary } from "./action";
import LoadingButton from "./LoadingButton";
import { ResumeFormState } from "../[id]/types";

interface GenerateSummaryButtonProps {
  resumeData: ResumeFormState;
  category: string;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  category,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const aiResponse = await generateSummary({
        ...resumeData,
        category,
        techSkills: resumeData.techSkills.map((skill) => ({
          name: skill,
          rating: 3,
        })),
        workExperiences: resumeData.workExperience,
      });

      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}>
      <WandSparkles className="size-4" />
      Generate AI Suggestion
    </LoadingButton>
  );
}
