"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createResumeFromCareerProfile } from "./createResumeFromProfile";

export default function CreateResumeFromProfileButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      try {
        const result = await createResumeFromCareerProfile();

        toast.success("Resume created from Career Profile.");

        router.push(`/resumebuilder/editor/${result.resumeId}`);
      } catch (error) {
        console.error(error);
        toast.error("Could not create resume from Career Profile.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleCreate}
      disabled={isPending}
      className="h-12 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600 disabled:opacity-60">
      {isPending ? "Creating..." : "Create Resume From Profile"}
    </button>
  );
}
