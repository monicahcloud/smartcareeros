"use client";

import { CareerProfileFormState, FederalDetails } from "../types";

interface FederalDetailsSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

export default function FederalDetailsSection({
  form,
  setForm,
}: FederalDetailsSectionProps) {
  function updateFederalDetails(field: keyof FederalDetails, value: string) {
    setForm((prev) => ({
      ...prev,
      federalDetails: {
        ...prev.federalDetails,
        [field]: value,
      },
    }));
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          Federal Details
        </p>

        <h3 className="mt-1 text-xl font-black text-black">
          Federal Resume Information
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Optional details used for federal resume creation and government job
          applications.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          value={form.federalDetails.citizenship}
          onChange={(e) => updateFederalDetails("citizenship", e.target.value)}
          placeholder="Citizenship"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.veteranPreference}
          onChange={(e) =>
            updateFederalDetails("veteranPreference", e.target.value)
          }
          placeholder="Veteran Preference"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.securityClearance}
          onChange={(e) =>
            updateFederalDetails("securityClearance", e.target.value)
          }
          placeholder="Security Clearance"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.federalEmploymentStatus}
          onChange={(e) =>
            updateFederalDetails("federalEmploymentStatus", e.target.value)
          }
          placeholder="Federal Employment Status"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.currentGsGrade}
          onChange={(e) =>
            updateFederalDetails("currentGsGrade", e.target.value)
          }
          placeholder="Current GS Grade"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.desiredGsGrade}
          onChange={(e) =>
            updateFederalDetails("desiredGsGrade", e.target.value)
          }
          placeholder="Desired GS Grade"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.workSchedule}
          onChange={(e) => updateFederalDetails("workSchedule", e.target.value)}
          placeholder="Work Schedule"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.availability}
          onChange={(e) => updateFederalDetails("availability", e.target.value)}
          placeholder="Availability"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.willingToRelocate}
          onChange={(e) =>
            updateFederalDetails("willingToRelocate", e.target.value)
          }
          placeholder="Willing to Relocate"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.federalDetails.supervisorContactPermission}
          onChange={(e) =>
            updateFederalDetails("supervisorContactPermission", e.target.value)
          }
          placeholder="Supervisor Contact Permission"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />
      </div>
    </div>
  );
}
