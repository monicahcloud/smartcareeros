"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTrackedJob } from "@/app/(dashboard)/jobtracker/actions";

export default function NewJobForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    url: "",
    source: "",
    notes: "",
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      await createTrackedJob(form);
      router.push("/jobtracker");
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
      <input
        required
        placeholder="Job Title"
        value={form.position}
        onChange={(e) => updateField("position", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm"
      />

      <input
        required
        placeholder="Company"
        value={form.company}
        onChange={(e) => updateField("company", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm"
      />

      <input
        placeholder="Location"
        value={form.location}
        onChange={(e) => updateField("location", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm"
      />

      <input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) => updateField("salary", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm"
      />

      <input
        placeholder="Job URL"
        value={form.url}
        onChange={(e) => updateField("url", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm md:col-span-2"
      />

      <input
        placeholder="Source e.g. LinkedIn, Indeed, Company Website"
        value={form.source}
        onChange={(e) => updateField("source", e.target.value)}
        className="h-12 border border-slate-200 px-4 text-sm md:col-span-2"
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        className="min-h-32 border border-slate-200 p-4 text-sm md:col-span-2"
      />

      <button
        disabled={isPending}
        className="h-12 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60 md:col-span-2">
        {isPending ? "Saving..." : "Add To Tracker"}
      </button>
    </form>
  );
}
