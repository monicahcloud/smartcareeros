"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Edit3,
  ImageIcon,
  Printer,
  Share2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import CoverLetterPreview from "@/app/components/coverletter/CoverLetterPreview";
import { mapToCoverLetterValues } from "@/lib/utils";
import { COVER_LETTER_THEME_REGISTRY } from "@/app/(dashboard)/coverletter/templates/templateRegistry";
import type { CoverLetter } from "@prisma/client";
import { generateCoverLetterPdf } from "@/app/(dashboard)/coverletter/preview/[id]/pdf-actions";
import {
  createCoverLetterShareLink,
  deleteCoverLetter,
  updateCoverLetterBranding,
} from "@/app/(dashboard)/coverletter/preview/[id]/action";

export default function CoverLetterPreviewView({
  coverLetter,
}: {
  coverLetter: CoverLetter;
}) {
  const router = useRouter();
  const [data, setData] = useState(coverLetter);

  const handleDownload = async () => {
    try {
      const base64 = await generateCoverLetterPdf(data.id);

      const link = document.createElement("a");

      link.href = `data:application/pdf;base64,${base64}`;

      link.download = `${data.firstName || "cover-letter"}.pdf`;

      link.click();

      toast.success("PDF downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Could not generate PDF");
    }
  };
  const handleShareClick = async () => {
    try {
      const shareToken = await createCoverLetterShareLink(data.id);

      setData((prev) => ({
        ...prev,
        shareToken,
      }));

      const shareUrl = `${window.location.origin}/coverletter/share/${shareToken}`;

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Share link copied", {
        description: "Anyone with this link can view this cover letter.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Could not create share link");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this cover letter?");
    if (!confirmed) return;

    await deleteCoverLetter(data.id);
    toast.success("Cover letter deleted");
    router.push("/coverletter");
  };

  const persistChanges = async (updates: Partial<CoverLetter>) => {
    const nextData = { ...data, ...updates };
    setData(nextData);

    await updateCoverLetterBranding(
      data.id,
      nextData.themeId ?? "classic-left",
      nextData.themeColor ?? "#dc2626",
      nextData.showPhoto ?? true,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="no-print sticky top-0 z-20 border-b bg-white px-4 py-4 shadow-sm lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
              Cover Letter Preview
            </p>
            <h1 className="mt-1 text-xl font-black tracking-tight text-slate-900">
              {data.companyName || "Untitled Cover Letter"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/coverletter">Back</Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/coverletterbuilder/editor?coverLetterId=${data.id}`}>
                <Edit3 className="mr-2 size-4" />
                Edit
              </Link>
            </Button>

            <Button variant="outline" size="sm" onClick={handleShareClick}>
              <Share2 className="mr-2 size-4" />
              Share
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownload}>
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
      </header>

      <main className="grid flex-1 grid-cols-1 xl:grid-cols-[1fr_320px]">
        <section className="overflow-auto px-4 py-8">
          <div className="mx-auto w-fit origin-top scale-[0.58] sm:scale-[0.72] lg:scale-[0.85] xl:scale-100">
            <CoverLetterPreview
              coverLetterData={mapToCoverLetterValues(data)}
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
                {COVER_LETTER_THEME_REGISTRY.map((theme) => (
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
