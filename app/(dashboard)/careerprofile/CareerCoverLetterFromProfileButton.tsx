"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCoverLetterFromCareerProfile } from "./createCoverLetterFromProfile";

export default function CreateCoverLetterFromProfileButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      try {
        const result = await createCoverLetterFromCareerProfile();

        toast.success("Cover letter created from Career Profile.");

        router.push(`/coverletterbuilder/editor/${result.coverLetterId}`);
      } catch (error) {
        console.error(error);
        toast.error("Could not create cover letter from Career Profile.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleCreate}
      disabled={isPending}
      className="h-12 border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition  hover:bg-red-600 disabled:opacity-60 hover:text-white">
      {isPending ? "Creating..." : "Create Cover Letter From Profile"}
    </button>
  );
}
