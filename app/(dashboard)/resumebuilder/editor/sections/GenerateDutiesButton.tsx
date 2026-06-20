"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WandSparkles } from "lucide-react";
import { generateDuties } from "./actions";
import LoadingButton from "./LoadingButton";

interface GenerateDutiesButtonProps {
  jobTitle: string;
  category: string;
  onDutiesGenerated: (duties: string) => void;
}

export default function GenerateDutiesButton({
  jobTitle,
  category,
  onDutiesGenerated,
}: GenerateDutiesButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const duties = await generateDuties({
        jobTitle,
        category,
      });

      onDutiesGenerated(duties);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate duties.");
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
      Generate Duties (AI)
    </LoadingButton>
  );
}
