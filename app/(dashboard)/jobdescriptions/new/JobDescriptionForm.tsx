"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJobDescription } from "../action";

export default function JobDescriptionForm() {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    salary: "",
    rawText: "",

    applicantName: "",
    professionalHeadline: "",
    education: "",
    yearsExperience: "",
    tools: "",
    relevantExperience: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.rawText.trim()) {
      toast.error("Paste the job description first");
      return;
    }

    try {
      setIsSaving(true);

      const saved = await createJobDescription(form);

      toast.success("Job description saved");
      router.push(`/jobdescriptions/${saved.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Could not save job description");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
            Job Description
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Add a Job Description
          </h1>
          <p className="mt-3 max-w-2xl text-slate-500">
            Paste a job post so Smart CareerOS can help generate a tailored
            cover letter.
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Applicant name, e.g. Olivia Wilson, MBA"
              value={form.applicantName}
              onChange={(e) => handleChange("applicantName", e.target.value)}
            />

            <Input
              placeholder="Professional headline, e.g. Business Intelligence & Analytics Professional"
              value={form.professionalHeadline}
              onChange={(e) =>
                handleChange("professionalHeadline", e.target.value)
              }
            />

            <Input
              placeholder="Education, e.g. MBA in Business Intelligence and Analytics"
              value={form.education}
              onChange={(e) => handleChange("education", e.target.value)}
            />

            <Input
              placeholder="Years of experience"
              value={form.yearsExperience}
              onChange={(e) => handleChange("yearsExperience", e.target.value)}
            />

            <Input
              placeholder="Tools/skills, e.g. Power BI, SQL, Python, Excel"
              value={form.tools}
              onChange={(e) => handleChange("tools", e.target.value)}
            />

            <Input
              placeholder="Job title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <Input
              placeholder="Company"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />

            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />

            <Input
              placeholder="Employment type"
              value={form.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
            />

            <Input
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Relevant experience, achievements, or background..."
            value={form.relevantExperience}
            onChange={(e) => handleChange("relevantExperience", e.target.value)}
            className="min-h-[160px]"
          />

          <Textarea
            placeholder="Paste the full job description here..."
            value={form.rawText}
            onChange={(e) => handleChange("rawText", e.target.value)}
            className="min-h-[360px]"
          />

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-red-600 px-8 font-black uppercase tracking-widest hover:bg-black">
              {isSaving ? "Saving..." : "Save Job Description"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
