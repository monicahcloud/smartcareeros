"use client";

import { useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { saveAdzunaJobToTracker } from "@/app/(dashboard)/jobtracker/actions";

interface Props {
  position: string;
  company: string;
  location?: string;
  salary?: string;
  url?: string;
}

export default function SaveJobButton(props: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await saveAdzunaJobToTracker(props);
            toast.success("Job saved to your tracker.");
          } catch {
            toast.error("Could not save this job.");
          }
        })
      }
      disabled={isPending}
      className="flex h-10 items-center justify-center gap-2 border border-slate-200 px-4 text-xs font-black uppercase tracking-[0.16em] transition hover:border-red-600 hover:text-red-600 disabled:opacity-60">
      <Bookmark className="h-4 w-4" />
      {isPending ? "Saving..." : "Save Job"}
    </button>
  );
}
