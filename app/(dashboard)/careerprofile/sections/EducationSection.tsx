"use client";

import { CareerProfileFormState, EducationItem } from "../types";

interface EducationSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

export default function EducationSection({
  form,
  setForm,
}: EducationSectionProps) {
  function addEducation() {
    setForm((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  }

  function updateEducation(
    index: number,
    field: keyof EducationItem,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      education: prev.education.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  }

  function removeEducation(index: number) {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Education
          </p>

          <h3 className="mt-1 text-xl font-black text-black">
            Academic Background
          </h3>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="bg-black px-4 py-2 text-xs font-black uppercase text-white">
          Add Education
        </button>
      </div>

      {form.education.map((edu, index) => (
        <div key={index} className="mt-6 border border-slate-200 p-6 space-y-4">
          <input
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
            placeholder="Degree / Certification"
            className="h-12 w-full border border-slate-200 px-4"
          />

          <input
            value={edu.school}
            onChange={(e) => updateEducation(index, "school", e.target.value)}
            placeholder="School / Institution"
            className="h-12 w-full border border-slate-200 px-4"
          />

          <input
            value={edu.location}
            onChange={(e) => updateEducation(index, "location", e.target.value)}
            placeholder="Location"
            className="h-12 w-full border border-slate-200 px-4"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) =>
                updateEducation(index, "startDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4"
            />

            <input
              type="date"
              value={edu.endDate}
              onChange={(e) =>
                updateEducation(index, "endDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="border border-red-200 px-4 py-2 text-xs font-black uppercase text-red-600">
              Remove Education
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
