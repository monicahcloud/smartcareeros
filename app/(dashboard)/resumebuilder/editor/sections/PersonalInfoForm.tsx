"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import FormStepWrapper from "@/app/components/coverletterbuilder/FormStepWrapper";
import { ResumeFormState } from "../[id]/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PersonalInfoSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

type PersonalInfoField =
  | "firstName"
  | "lastName"
  | "jobTitle"
  | "email"
  | "phone"
  | "address"
  | "website"
  | "linkedin"
  | "github";

export default function PersonalInfoSection({
  form,
  setForm,
}: PersonalInfoSectionProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    form.photoUrl || null,
  );

  const isFederalTemplate = form.themeId === "federal-clean";

  function updateField(field: PersonalInfoField, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      setPhotoPreview(imageUrl);

      setForm((prev) => ({
        ...prev,
        photo: file,
        photoUrl: imageUrl,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPhotoPreview(null);

    setForm((prev) => ({
      ...prev,
      photo: undefined,
      photoUrl: undefined,
    }));

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  return (
    <FormStepWrapper
      title="Personal Information"
      description="Tell employers who you are and how to reach you.">
      <div className="space-y-6">
        {!isFederalTemplate && (
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Professional Photo
            </label>

            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
              <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-md">
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-[8px] font-black uppercase text-slate-400">
                    No Photo
                  </span>
                )}
              </div>

              <div className="flex grow flex-col gap-2">
                <Input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="h-9 cursor-pointer bg-white text-xs file:border-none file:bg-transparent file:text-[10px] file:font-bold file:uppercase file:text-red-600"
                />

                {photoPreview && (
                  <Button
                    variant="ghost"
                    type="button"
                    className="flex h-auto w-fit items-center gap-1 p-1 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleRemovePhoto}>
                    <X className="size-3" />
                    Remove Photo
                  </Button>
                )}

                <p className="text-[10px] font-medium text-slate-400">
                  Recommended: square professional headshot. Avoid photos for
                  federal resumes.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              First Name
            </label>
            <Input
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Last Name
            </label>
            <Input
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-slate-400">
            Professional Title
          </label>
          <Input
            value={form.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            placeholder="e.g. Data Analyst"
            className="mt-2 border-slate-200 bg-slate-50/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Email Address
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Phone Number
            </label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-slate-400">
            Location
          </label>
          <Input
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="City, State"
            className="mt-2 border-slate-200 bg-slate-50/50"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              LinkedIn
            </label>
            <Input
              value={form.linkedin || ""}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="linkedin.com/in/name"
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              GitHub
            </label>
            <Input
              value={form.github || ""}
              onChange={(e) => updateField("github", e.target.value)}
              placeholder="github.com/name"
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Portfolio
            </label>
            <Input
              value={form.website || ""}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="yourwebsite.com"
              className="mt-2 border-slate-200 bg-slate-50/50"
            />
          </div>
        </div>
      </div>
    </FormStepWrapper>
  );
}
