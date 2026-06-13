"use client";

import { useTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
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
          try {
            await startApplicationTracking(props);
            toast.success("Application started and added to tracker.");
            window.open(props.url, "_blank");
          } catch {
            toast.error("Could not start application tracking.");
          }
        })
      }
      disabled={isPending}
      className="flex h-10 items-center justify-center gap-2 bg-red-600 px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
      <ArrowUpRight className="h-4 w-4" />
      {isPending ? "Opening..." : "Apply Now"}
    </button>
  );
}
