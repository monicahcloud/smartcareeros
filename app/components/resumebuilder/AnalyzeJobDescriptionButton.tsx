"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateJobDescriptionInsights } from "@/app/(dashboard)/resumebuilder/jobdescription/[id]/review/actions";

export default function AnalyzeJobDescriptionButton({
  jobDescriptionId,
}: {
  jobDescriptionId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await generateJobDescriptionInsights(jobDescriptionId);
            toast.success("Job description analyzed.");
            router.refresh();
          } catch (error) {
            console.error(error);
            toast.error("Could not analyze job description.");
          }
        })
      }
      disabled={isPending}
      className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600 disabled:opacity-60">
      <Sparkles className="h-4 w-4" />
      {isPending ? "Analyzing..." : "Analyze Job Description"}
    </button>
  );
}
