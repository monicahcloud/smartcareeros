"use client";

import { AccomplishmentItem, ResumeFormState } from "../[id]/types";

type AccomplishmentsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function AccomplishmentsSection({
  form,
  setForm,
}: AccomplishmentsSectionProps) {
  function addAccomplishment() {
    setForm((prev) => ({
      ...prev,
      accomplishments: [
        ...prev.accomplishments,
        {
          title: "",
          organization: "",
          date: "",
          description: "",
          impact: "",
        },
      ],
    }));
  }

  function updateAccomplishment(
    index: number,
    field: keyof AccomplishmentItem,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function removeAccomplishment(index: number) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Accomplishments
          </p>

          <h3 className="mt-1 text-xl font-black text-black">
            Achievements & Impact
          </h3>
        </div>

        <button
          type="button"
          onClick={addAccomplishment}
          className="bg-black px-4 py-2 text-xs font-black uppercase text-white">
          Add Accomplishment
        </button>
      </div>

      {form.accomplishments.map((item, index) => (
        <div key={index} className="mt-6 space-y-4 border border-slate-200 p-6">
          <input
            value={item.title}
            onChange={(e) =>
              updateAccomplishment(index, "title", e.target.value)
            }
            placeholder="Achievement Title"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <input
            value={item.organization}
            onChange={(e) =>
              updateAccomplishment(index, "organization", e.target.value)
            }
            placeholder="Organization / Context"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <input
            type="date"
            value={item.date}
            onChange={(e) =>
              updateAccomplishment(index, "date", e.target.value)
            }
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <textarea
            value={item.description}
            onChange={(e) =>
              updateAccomplishment(index, "description", e.target.value)
            }
            placeholder="Describe the accomplishment..."
            className="min-h-28 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />

          <textarea
            value={item.impact}
            onChange={(e) =>
              updateAccomplishment(index, "impact", e.target.value)
            }
            placeholder="What was the measurable impact or result?"
            className="min-h-28 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeAccomplishment(index)}
              className="border border-red-200 px-4 py-2 text-xs font-black uppercase text-red-600 transition hover:bg-red-50">
              Remove Accomplishment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
