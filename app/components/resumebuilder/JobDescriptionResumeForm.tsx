"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveJobDescriptionForResume } from "@/app/(dashboard)/resumebuilder/jobdescription/[id]/review/actions";

export default function JobDescriptionResumeForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [rawText, setRawText] = useState("");
  const [sourceType, setSourceType] = useState("career-profile");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      const result = await saveJobDescriptionForResume({
        title,
        company,
        location,
        rawText,
        sourceType,
      });

      router.push(
        `/resumebuilder/jobdescription/${result.jobDescriptionId}/review`,
      );
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Job Information
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
            Enter Position Details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Provide information about the opportunity you are targeting.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Job Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Data Analyst"
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Company
            </label>

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="MaxWork Consulting Agency"
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Remote"
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Resume Source
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="cursor-pointer border border-slate-200 p-4 hover:border-red-600">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={sourceType === "career-profile"}
                  onChange={() => setSourceType("career-profile")}
                />

                <div>
                  <p className="font-black text-black">Use Career Profile</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Build from your Smart CareerOS profile.
                  </p>
                </div>
              </div>
            </label>

            <label className="cursor-pointer border border-slate-200 p-4 hover:border-red-600">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={sourceType === "existing-resume"}
                  onChange={() => setSourceType("existing-resume")}
                />

                <div>
                  <p className="font-black text-black">Use Existing Resume</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Tailor one of your saved resumes.
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Job Description
          </label>

          <textarea
            required
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste the full job description here..."
            className="min-h-[350px] w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-12 items-center justify-center bg-red-600 px-8 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
            {isPending ? "Saving..." : "Continue To Resume Review"}
          </button>
        </div>
      </div>
    </form>
  );
}
