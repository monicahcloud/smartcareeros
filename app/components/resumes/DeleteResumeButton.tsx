// components/DeleteResumeButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteResume } from "@/app/(dashboard)/resumes/actions";
import { useRouter } from "next/navigation";

export default function DeleteResumeButton({ resumeId }: { resumeId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmed) return;

    await deleteResume(resumeId);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="
        inline-flex h-10 items-center justify-center gap-2
        border border-red-200
        px-4
        text-xs font-black uppercase tracking-[0.16em]
        text-red-600
        transition
        hover:bg-red-600
        hover:text-white
      ">
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  );
}
