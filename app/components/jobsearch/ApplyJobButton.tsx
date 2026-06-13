"use client";

import { useTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { startApplicationTracking } from "@/app/(dashboard)/jobtracker/actions";

interface Props {
  position: string;
  company: string;
  location?: string;
  salary?: string;
  url: string;
}

export default function ApplyJobButton(props: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await startApplicationTracking(props);

          window.open(props.url, "_blank");
        })
      }
      disabled={isPending}
      className="flex h-9 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-black">
      <ArrowUpRight className="h-3 w-3" />
      {isPending ? "Opening..." : "Apply"}
    </button>
  );
}
