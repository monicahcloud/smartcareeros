"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Sparkles } from "lucide-react";
import { generateResumeFromJobDescription } from "@/app/(dashboard)/resumebuilder/jobdescription/[id]/review/actions";

export default function GenerateTailoredResumeButton({
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
          const result =
            await generateResumeFromJobDescription(jobDescriptionId);

          router.push(`/resumebuilder/editor/${result.resumeId}`);
        })
      }
      disabled={isPending}
      className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
      <Sparkles className="h-4 w-4" />

      {isPending ? "Generating Resume..." : "Generate Tailored Resume"}
    </button>
  );
}
