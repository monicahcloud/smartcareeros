"use client";

import { CertificationItem, ResumeFormState } from "../[id]/types";

type CertificationsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function CertificationsSection({
  form,
  setForm,
}: CertificationsSectionProps) {
  function addCertification() {
    setForm((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          issuedDate: "",
          expiresDate: "",
          credentialUrl: "",
          description: "",
        },
      ],
    }));
  }

  function updateCertification(
    index: number,
    field: keyof CertificationItem,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function removeCertification(index: number) {
    setForm((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Certifications
          </p>
          <h3 className="mt-1 text-xl font-black text-black">
            Licenses & Credentials
          </h3>
        </div>

        <button
          type="button"
          onClick={addCertification}
          className="bg-black px-4 py-2 text-xs font-black uppercase text-white">
          Add Certification
        </button>
      </div>

      {form.certifications.map((cert, index) => (
        <div key={index} className="mt-6 space-y-4 border border-slate-200 p-6">
          <input
            value={cert.name}
            onChange={(e) => updateCertification(index, "name", e.target.value)}
            placeholder="Certification Name"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <input
            value={cert.issuer}
            onChange={(e) =>
              updateCertification(index, "issuer", e.target.value)
            }
            placeholder="Issuer / Organization"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="date"
              value={cert.issuedDate}
              onChange={(e) =>
                updateCertification(index, "issuedDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />

            <input
              type="date"
              value={cert.expiresDate}
              onChange={(e) =>
                updateCertification(index, "expiresDate", e.target.value)
              }
              className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
            />
          </div>

          <input
            value={cert.credentialUrl}
            onChange={(e) =>
              updateCertification(index, "credentialUrl", e.target.value)
            }
            placeholder="Credential URL"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <textarea
            value={cert.description}
            onChange={(e) =>
              updateCertification(index, "description", e.target.value)
            }
            placeholder="Describe this certification..."
            className="min-h-28 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="border border-red-200 px-4 py-2 text-xs font-black uppercase text-red-600 transition hover:bg-red-50">
              Remove Certification
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
