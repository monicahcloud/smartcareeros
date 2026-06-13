"use client";

import { updateJobDetails } from "@/app/(dashboard)/jobtracker/actions";
import { Job } from "@prisma/client";
import { useState, useTransition } from "react";

function toInputDate(date: Date | string | null) {
  if (!date) return "";

  return new Date(date).toISOString().split("T")[0];
}

export default function EditJobDetailsForm({ job }: { job: Job }) {
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    salary: job.salary || "",
    followUpDate: toInputDate(job.followUpDate),
    url: job.url || "",
    notes: job.notes || "",
  });

  function updateField(name: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      await updateJobDetails({
        jobId: job.id,
        salary: form.salary,
        followUpDate: form.followUpDate,
        url: form.url,
        notes: form.notes,
      });
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border-t border-slate-200 pt-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        Edit Job Details
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.salary}
          onChange={(e) => updateField("salary", e.target.value)}
          placeholder="Salary"
          className="h-11 w-full border border-slate-200 px-4 text-sm outline-none focus:border-red-600"
        />

        <input
          type="date"
          value={form.followUpDate}
          onChange={(e) => updateField("followUpDate", e.target.value)}
          className="h-11 w-full border border-slate-200 px-4 text-sm outline-none focus:border-red-600"
        />
      </div>

      <input
        value={form.url}
        onChange={(e) => updateField("url", e.target.value)}
        placeholder="Job URL"
        className="h-11 w-full border border-slate-200 px-4 text-sm outline-none focus:border-red-600"
      />

      <textarea
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        placeholder="Notes"
        className="min-h-28 w-full resize-none border border-slate-200 p-4 text-sm outline-none focus:border-red-600"
      />

      <button
        type="submit"
        disabled={isPending}
        className="h-11 bg-red-600 px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? "Saving..." : "Save Details"}
      </button>
    </form>
  );
}
