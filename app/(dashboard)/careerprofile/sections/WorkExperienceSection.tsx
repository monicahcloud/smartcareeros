"use client";

import { CareerProfileFormState, WorkExperience } from "../types";

interface WorkExperienceSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

export default function WorkExperienceSection({
  form,
  setForm,
}: WorkExperienceSectionProps) {
  function addExperience() {
    setForm((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  }

  function removeExperience(index: number) {
    setForm((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  }

  function updateExperience(
    index: number,
    field: keyof WorkExperience,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index
          ? {
              ...exp,
              [field]: value,
            }
          : exp,
      ),
    }));
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Work Experience
          </p>

          <h3 className="mt-1 text-xl font-black text-black">
            Professional Experience
          </h3>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="bg-black px-4 py-2 text-xs font-black uppercase text-white">
          Add Experience
        </button>
      </div>

      {form.workExperience.map((exp, index) => (
        <div key={index} className="mt-6 space-y-4 border border-slate-200 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={exp.position}
              onChange={(e) =>
                updateExperience(index, "position", e.target.value)
              }
              placeholder="Position"
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />

            <input
              value={exp.company}
              onChange={(e) =>
                updateExperience(index, "company", e.target.value)
              }
              placeholder="Company"
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>

          <input
            value={exp.location}
            onChange={(e) =>
              updateExperience(index, "location", e.target.value)
            }
            placeholder="Location"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="date"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(index, "startDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />

            <input
              type="date"
              value={exp.endDate}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>

          <textarea
            value={exp.description}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
            placeholder="Describe your accomplishments and responsibilities..."
            className="min-h-32 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="border border-red-200 px-4 py-2 text-xs font-black uppercase text-red-600 transition hover:bg-red-50">
              Remove Experience
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
