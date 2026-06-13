"use client";

import { useTransition } from "react";
import { Bookmark } from "lucide-react";
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
          await saveAdzunaJobToTracker(props);
        })
      }
      disabled={isPending}
      className="flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-[10px] font-black uppercase tracking-widest hover:border-red-600">
      <Bookmark className="h-3 w-3" />
      {isPending ? "Saving..." : "Save"}
    </button>
  );
}
