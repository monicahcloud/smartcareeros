"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".txt"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type UploadResponse = {
  uploadId?: string;
  status?: string;
  error?: string;
};

export default function ResumeUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isFederal, setIsFederal] = useState(false);

  function resetFileInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function validateFile(file: File) {
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    const validType =
      ACCEPTED_FILE_TYPES.includes(file.type) &&
      ACCEPTED_EXTENSIONS.includes(extension);

    if (!validType) {
      toast.error("Unsupported file type", {
        description: "Please upload a PDF, DOCX, or TXT file.",
      });

      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large", {
        description: "Please upload a résumé under 5MB.",
      });

      return false;
    }

    return true;
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!validateFile(file)) {
      resetFileInput();
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("isFederal", String(isFederal));

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as UploadResponse;

      if (!response.ok || !result.uploadId) {
        throw new Error(result.error || "Upload failed.");
      }

      toast.success("Résumé uploaded", {
        description:
          "SmartCareerOS is now extracting and organizing your information.",
      });

      router.push(`/resumes/upload/processing/${result.uploadId}`);
    } catch (error) {
      console.error(error);

      toast.error("Upload failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setIsUploading(false);
      resetFileInput();
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border px-4 py-2 transition-all duration-300",
          isFederal
            ? "border-blue-200 bg-blue-50"
            : "border-slate-200 bg-slate-50",
        )}>
        <ShieldCheck
          className={cn(
            "size-4",
            isFederal ? "text-blue-600" : "text-slate-400",
          )}
        />

        <Label
          htmlFor="federal-mode"
          className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-slate-500">
          Federal Mode
        </Label>

        <Switch
          id="federal-mode"
          checked={isFederal}
          onCheckedChange={setIsFederal}
          disabled={isUploading}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      <Button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="upload-resume flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-6 text-slate-900 shadow-sm transition-all hover:bg-slate-50">
        {isUploading ? (
          <>
            <Loader2 className="size-4 animate-spin text-blue-600" />

            <span className="animate-pulse text-[11px] font-black uppercase tracking-widest">
              Uploading Resume...
            </span>
          </>
        ) : (
          <>
            <UploadCloud className="size-5 text-blue-600" />

            <span className="text-[11px] font-black uppercase tracking-widest">
              Upload Resume
            </span>
          </>
        )}
      </Button>
    </div>
  );
}
