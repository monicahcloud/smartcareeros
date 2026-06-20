"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WandSparkles } from "lucide-react";
import { generateResponsibilities } from "./actions";
import LoadingButton from "./LoadingButton";

interface GenerateResponsibilitiesButtonProps {
  jobTitle: string;
  category: string;
  onResponsibilitiesGenerated: (responsibilities: string) => void;
}

export default function GenerateResponsibilitiesButton({
  jobTitle,
  category,
  onResponsibilitiesGenerated,
}: GenerateResponsibilitiesButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const responsibilities = await generateResponsibilities({
        jobTitle,
        category,
      });

      onResponsibilitiesGenerated(responsibilities);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate responsibilities.");
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
      Generate Responsibilities (AI)
    </LoadingButton>
  );
}
