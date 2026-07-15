"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileSearch, Loader2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProcessingStatus = {
  parseStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  currentStep?: string | null;
  parseError?: string | null;
  resumeId?: string | null;
};

type ResumeProcessingStatusProps = {
  uploadId: string;
};

export default function ResumeProcessingStatus({
  uploadId,
}: ResumeProcessingStatusProps) {
  const router = useRouter();

  const [status, setStatus] = useState<ProcessingStatus>({
    parseStatus: "PENDING",
    progress: 5,
    currentStep: "Résumé queued for processing",
  });

  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
      try {
        const response = await fetch(`/api/resume-uploads/${uploadId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve processing status.");
        }

        const result = (await response.json()) as ProcessingStatus;

        if (cancelled) {
          return;
        }

        setStatus(result);
        setRequestFailed(false);

        if (result.parseStatus === "COMPLETED" && result.resumeId) {
          router.replace(
            `/resumebuilder/editor/${result.resumeId}?resumeId=${result.resumeId}&step=personal`,
          );

          return;
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setRequestFailed(true);
        }
      }
    }

    void checkStatus();

    const interval = window.setInterval(() => {
      void checkStatus();
    }, 2500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [uploadId, router]);

  const failed = status.parseStatus === "FAILED" || requestFailed;

  return (
    <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50">
        {failed ? (
          <TriangleAlert className="size-8 text-red-600" />
        ) : status.parseStatus === "COMPLETED" ? (
          <CheckCircle2 className="size-8 text-emerald-600" />
        ) : (
          <FileSearch className="size-8 text-blue-600" />
        )}
      </div>

      <p className="mt-6 text-[11px] font-black uppercase tracking-[0.28em] text-red-600">
        SmartCareerOS
      </p>

      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
        {failed
          ? "We Could Not Process This Resume"
          : "Building Your Editable Resume"}
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
        {failed
          ? status.parseError ||
            "Something interrupted the processing workflow."
          : status.currentStep ||
            "SmartCareerOS is organizing your résumé information."}
      </p>

      {!failed && (
        <>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(5, status.progress))}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <Loader2 className="size-4 animate-spin text-blue-600" />
            {status.progress}% complete
          </div>

          <p className="mt-8 text-xs leading-5 text-slate-500">
            You may leave this page. Your résumé will continue processing
            securely.
          </p>
        </>
      )}

      {failed && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={() => router.replace("/resumes/upload")}>
            Upload Another Resume
          </Button>
        </div>
      )}
    </section>
  );
}
