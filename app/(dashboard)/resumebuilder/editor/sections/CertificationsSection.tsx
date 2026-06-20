"use client";

import { CertificationItem, ResumeFormState } from "../[id]/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

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
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Certifications
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Add licenses, credentials, certificates, and professional training.
        </p>
      </div>

      <div className="space-y-4">
        {form.certifications.map((cert, index) => (
          <div
            key={index}
            className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  CERT {index + 1}
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Licenses & Credentials
                </span>
              </div>
            </div>

            <Input
              value={cert.name}
              onChange={(e) =>
                updateCertification(index, "name", e.target.value)
              }
              placeholder="Certification Name"
              className="rounded-xl"
            />

            <Input
              value={cert.issuer}
              onChange={(e) =>
                updateCertification(index, "issuer", e.target.value)
              }
              placeholder="Issuer / Organization"
              className="rounded-xl"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={cert.issuedDate}
                onChange={(e) =>
                  updateCertification(index, "issuedDate", e.target.value)
                }
                className="rounded-xl"
              />

              <Input
                type="date"
                value={cert.expiresDate}
                onChange={(e) =>
                  updateCertification(index, "expiresDate", e.target.value)
                }
                className="rounded-xl"
              />
            </div>

            <Input
              value={cert.credentialUrl}
              onChange={(e) =>
                updateCertification(index, "credentialUrl", e.target.value)
              }
              placeholder="Credential URL"
              className="rounded-xl"
            />

            <Textarea
              value={cert.description}
              onChange={(e) =>
                updateCertification(index, "description", e.target.value)
              }
              placeholder="Describe this certification..."
              className="min-h-28 resize-none rounded-xl"
            />

            <div className="flex justify-end border-t border-slate-50 pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeCertification(index)}>
                <Trash2 className="mr-2 size-3" />
                Delete Certification
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full border-2 border-dashed px-10 transition-all hover:bg-slate-50"
          onClick={addCertification}>
          <PlusCircle className="mr-2 size-4" />
          Add Certification
        </Button>
      </div>
    </div>
  );
}
