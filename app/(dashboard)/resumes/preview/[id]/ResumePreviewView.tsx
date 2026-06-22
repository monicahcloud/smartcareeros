"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Edit3,
  Printer,
  Share2,
  ImageIcon,
  Download,
  Trash2,
} from "lucide-react";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { toast } from "sonner";
import { generateResumePdf } from "../../pdf-actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ResumePreview from "@/app/(dashboard)/resumebuilder/editor/sections/ResumePreview";
import { RESUME_THEME_REGISTRY } from "../../templates/templateRegistry";
import { Switch } from "@/components/ui/switch";
import {
  createResumeShareLink,
  deleteResume,
  updateResumeBranding,
} from "../../actions";
import { Resume } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function ResumePreviewView({ resume }: { resume: Resume }) {
  const router = useRouter();
  const [data, setData] = useState(resume);
  const [shareUrl, setShareUrl] = useState<string | null>(
    resume.shareToken
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/resume/share/${resume.shareToken}`
      : null,
  );

  const handlePrint = async () => {
    const toastId = toast.loading("Preparing resume for print...");

    try {
      const htmlElement = document.querySelector(".resume-paper-container");

      if (!htmlElement) {
        throw new Error("Resume content not found");
      }

      const clone = htmlElement.cloneNode(true) as HTMLElement;

      const images = clone.querySelectorAll("img");

      for (const img of Array.from(images)) {
        if (img.src.startsWith("blob:") || img.src.startsWith("http")) {
          const response = await fetch(img.src);
          const blob = await response.blob();

          const reader = new FileReader();

          const base64Str = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });

          img.src = base64Str;
        }
      }

      const response = await fetch("/api/resume/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: `Resume_${data.firstName || "Document"}`,
          html: clone.outerHTML,
        }),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = url;

      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        setTimeout(() => {
          document.body.removeChild(iframe);
          window.URL.revokeObjectURL(url);
        }, 1000);
      };

      toast.success("Print preview ready", { id: toastId });
    } catch (error) {
      console.error("Resume Print Error:", error);
      toast.error("Print failed", { id: toastId });
    }
  };
  const handleDownload = async () => {
    const toastId = toast.loading("Processing images and generating PDF...");
    try {
      const htmlElement = document.querySelector(".resume-paper-container");
      if (!htmlElement) throw new Error("Resume content not found");

      const clone = htmlElement.cloneNode(true) as HTMLElement;
      const images = clone.querySelectorAll("img");

      for (const img of Array.from(images)) {
        if (img.src.startsWith("blob:") || img.src.startsWith("http")) {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          img.src = base64;
        }
      }
      const response = await fetch("/api/resume/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: `Resume_${data.firstName || "Document"}`,
          html: clone.outerHTML,
        }),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Resume_${data.firstName || "Document"}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Aligned PDF downloaded!", { id: toastId });
    } catch (error) {
      console.error("Resume Download Error:", error);
      toast.error("Download failed.", { id: toastId });
    }
  };
  const handleShareClick = async () => {
    try {
      const shareToken = await createResumeShareLink(data.id);

      const url = `${window.location.origin}/resume/share/${shareToken}`;

      setData((prev) => ({
        ...prev,
        shareToken,
      }));

      setShareUrl(url);

      await navigator.clipboard.writeText(url);

      toast.success("Share link copied", {
        description: url,
      });
    } catch (error) {
      console.error(error);
      toast.error("Could not create share link");
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this resume?");
    if (!confirmed) return;

    try {
      await deleteResume(data.id);

      toast.success("Resume deleted");

      router.push("/resumes");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete resume");
    }
  };

  const persistChanges = async (updates: Partial<Resume>) => {
    const nextData = {
      ...data,
      ...updates,
    };

    setData(nextData);

    await updateResumeBranding(
      data.id,
      nextData.themeId ?? "classic-left",
      nextData.themeColor ?? "#dc2626",
      nextData.showPhoto ?? true,
    );
  };
  const previewData = useMemo(() => {
    const values = mapToResumeValues(data);

    return {
      ...values,
      photo: values.photo instanceof File ? values.photo : undefined,
    };
  }, [data]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="no-print top-0 z-20 border-b bg-white px-4 py-4 shadow-sm lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
              Resume Preview
            </p>

            <h1 className="mt-1 text-xl font-black tracking-tight text-slate-900">
              {data.resumeTitle || "Untitled Resume"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/resumes">Back</Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link href={`/resumebuilder/editor?resumeId=${data.id}`}>
                <Edit3 className="mr-2 size-4" />
                Edit
              </Link>
            </Button>

            <Button variant="outline" size="sm" onClick={handleShareClick}>
              <Share2 className="mr-2 size-4" />
              Share
            </Button>

            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 size-4" />
              Print
            </Button>

            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-red-600 hover:bg-black">
              <Download className="mr-2 size-4" />
              Download
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </div>
        </div>
        {shareUrl && (
          <div className="w-full rounded-xl border mt-4 border-red-100 bg-red-50 p-3">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
              Share Link
            </p>

            <div className="flex gap-2">
              <input
                readOnly
                value={shareUrl}
                className="h-10 flex-1 border border-red-100 bg-white px-3 text-xs font-semibold text-slate-700"
              />

              <Button
                type="button"
                size="sm"
                className="bg-red-600 hover:bg-black"
                onClick={async () => {
                  await navigator.clipboard.writeText(shareUrl);
                  toast.success("Link copied again");
                }}>
                Copy
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="grid flex-1 grid-cols-1 xl:grid-cols-[1fr_320px]">
        <section className="overflow-auto px-4 py-8">
          <div className="mx-auto w-fit origin-top scale-[0.58] print:scale-100 sm:scale-[0.72] lg:scale-[0.85] xl:scale-100">
            <ResumePreview
              themeId={data.themeId ?? "classic-left"}
              data={previewData}
            />
          </div>
        </section>

        <aside className="no-print hidden border-l bg-white p-6 xl:block">
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Template
              </h3>

              <div className="grid gap-2">
                {RESUME_THEME_REGISTRY.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() =>
                      persistChanges({
                        themeId: theme.id,
                        themeColor: theme.defaultColor,
                      })
                    }
                    className={`border p-3 text-left text-sm font-bold transition ${
                      data.themeId === theme.id
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}>
                    {theme.name}

                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {theme.category}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Branding
              </h3>

              <div>
                <Label className="text-[11px] font-bold uppercase text-slate-700">
                  Theme Color
                </Label>

                <div className="mt-2 flex items-center gap-3 border bg-slate-50 p-3">
                  <input
                    type="color"
                    value={data.themeColor || "#dc2626"}
                    onChange={(event) =>
                      persistChanges({ themeColor: event.target.value })
                    }
                    className="h-8 w-8 cursor-pointer border-0 bg-transparent"
                  />

                  <span className="font-mono text-xs font-bold uppercase text-slate-500">
                    {data.themeColor || "#dc2626"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <ImageIcon className="size-4 text-slate-500" />

                  <Label
                    htmlFor="show-photo"
                    className="text-[11px] font-bold uppercase">
                    Show Photo
                  </Label>
                </div>

                <Switch
                  id="show-photo"
                  checked={data.showPhoto ?? true}
                  onCheckedChange={(checked) =>
                    persistChanges({ showPhoto: checked })
                  }
                />
              </div>
            </section>
          </div>
        </aside>
      </main>
    </div>
  );
}
