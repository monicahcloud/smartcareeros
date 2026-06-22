"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import ResumePreview from "../resumebuilder/editor/sections/ResumePreview";
import { deleteResume } from "./actions";

export default function ResumeCard({ resume }: { resume: any }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this resume?");
    if (!confirmed) return;

    try {
      await deleteResume(resume.id);
      toast.success("Resume deleted");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete resume");
    }
  };

  const previewData = {
    id: resume.id,
    firstName: resume.firstName || "",
    lastName: resume.lastName || "",
    jobTitle: resume.jobTitle || "",

    email: resume.email || resume.userEmail || "",
    phone: resume.phone || resume.userPhone || "",
    address: resume.address || resume.userAddress || "",

    website: resume.website || "",
    linkedin: resume.linkedin || "",
    github: resume.github || resume.gitHub || "",

    summary: resume.summary || "",
    resumeTitle: resume.resumeTitle || "",
    resumeType: resume.resumeType || "",

    themeId: resume.themeId || "classic-left",
    themeColor: resume.themeColor || "#dc2626",
    borderStyle: resume.borderStyle || "squircle",

    showPhoto: resume.showPhoto ?? true,
    photoUrl: resume.photoUrl || resume.userPhotoUrl || "",

    skills: resume.skills || [],
    techSkills: resume.techSkills || [],
    workExperience: resume.workExperience || [],
    education: resume.education || [],
    certifications: resume.certifications || [],
    projects: resume.projects || [],
    accomplishments: resume.accomplishments || [],
    interests: resume.interests || [],
  };

  return (
    <article className="group relative border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
      <button
        type="button"
        onClick={handleDelete}
        aria-label="Delete resume"
        className="absolute right-3 top-3 z-40 flex size-9 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-sm transition hover:bg-red-600 hover:text-white">
        <Trash2 className="size-4" />
      </button>

      <div className="relative mb-5 aspect-[210/297] overflow-hidden border border-slate-100 bg-slate-50">
        <div className="absolute left-3 top-3 z-20 bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-red-600 shadow-sm backdrop-blur">
          {resume.themeId || resume.resumeType || "Standard"}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.34]">
          <ResumePreview themeId={previewData.themeId} data={previewData} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
      </div>

      <div>
        <h3 className="truncate text-lg font-black uppercase tracking-tight text-black">
          {resume.resumeTitle || resume.jobTitle || "Untitled Resume"}
        </h3>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Last edited {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 lg:flex">
        <Link
          href={`/resumebuilder/editor/${resume.id}?step=general`}
          className="flex-1 bg-black px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
          Edit
        </Link>

        <Link
          href={`/resumes/preview/${resume.id}`}
          className="border border-slate-200 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-slate-500 transition hover:border-red-600 hover:text-red-600">
          View
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="
    border border-red-200
    px-4 py-3
    text-center
    text-xs font-black uppercase tracking-[0.16em]
    text-red-600
    transition
    hover:bg-red-600
    hover:text-white
  ">
          Delete
        </button>

        {resume.shareToken && (
          <Link
            href={`/resumes/share/${resume.shareToken}`}
            className="border border-slate-200 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-slate-500 transition hover:border-red-600 hover:text-red-600">
            Share
          </Link>
        )}
      </div>
    </article>
  );
}
