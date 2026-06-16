/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CoverLetterServerData, ResumeServerData } from "./types";
import { CoverLetterValues, ResumeValues, UserInfoValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapToCoverLetterValues(
  data: CoverLetterServerData,
): CoverLetterValues {
  return {
    id: data.id,
    template: data.template ?? "",
    userPhoto: data.userPhotoUrl ?? undefined,
    userPhotoUrl: data.userPhotoUrl ?? undefined,
    shareToken: data.shareToken ?? "",
    showPhoto: data.showPhoto ?? true,

    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    userAddress: data.userAddress ?? "",
    website: data.website ?? "",
    userPhone: data.userPhone ?? "",
    userEmail: data.userEmail ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",

    companyAddress: data.companyAddress ?? "",
    companyName: data.companyName ?? "",
    recipientName: data.recipientName ?? "",
    companyEmail: data.companyEmail ?? "",
    companyPhone: data.companyPhone ?? "",

    body: data.body ?? "",
    signatureUrl: data.signatureUrl ?? undefined,
    signatureColor: data.signatureColor ?? "#000000",

    borderStyle: data.borderStyle ?? "rounded",
    themeColor: data.themeColor ?? "#dc2626",
    themeId: data.themeId ?? "classic-left",
  };
}
export function mapToUserInfoValues(data: any): UserInfoValues {
  return {
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    userEmail: data.userEmail ?? "",
    userPhone: data.userPhone ?? "",
    userAddress: data.userAddress ?? "",
    website: data.website ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",
    // Keep the file/string reference for the photo component
    userPhoto: data.userPhotoUrl ?? null,
  };
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    themeId: data.themeId ?? "classical-professional",
    resumeTitle: data.resumeTitle ?? "",
    resumeType: data.resumeType ?? "",
    description: data.description ?? "",
    photo: data.photoUrl ?? null,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    address: data.address ?? "",
    website: data.website ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",
    showPhoto: data.showPhoto ?? true,
    shareToken: data.shareToken ?? "",

    workExperiences:
      data.workExperience.map((exp) => ({
        position: String(exp.position ?? ""),
        company: String(exp.company ?? ""),
        location: String(exp.location ?? ""),
        startDate: exp.startDate?.toISOString().split("T")[0] ?? "",
        endDate: exp.endDate?.toISOString().split("T")[0] ?? "",
        description: String(exp.description ?? ""),
        status: String(exp.status ?? ""),
        clearance: String(exp.clearance ?? ""),
        duties: String(exp.duties ?? ""),
        accomplishments: String(exp.accomplishments ?? ""),
        responsibilities: String(exp.responsibilities ?? ""),
        grade: String(exp.grade ?? ""),
        hours: String(exp.hours ?? ""),
      })) ?? [],

    education:
      data.education.map((edu) => ({
        degree: edu.degree ?? "",
        school: edu.school ?? "",
        location: edu.location ?? "",
        startDate: edu.startDate
          ? edu.startDate.toISOString().split("T")[0]
          : "",
        endDate: edu.endDate ? edu.endDate.toISOString().split("T")[0] : "",
      })) ?? [],

    techSkills:
      data.techSkills.map((techSkill) => ({
        name: techSkill.name ?? "",
        rating: typeof techSkill.rating === "number" ? techSkill.rating : 1,
      })) ?? [],

    skills: data.skills,
    interest: data.interest,
    uploadedFileUrl: data.uploadedFileUrl ?? "",
    isUploaded: data.isUploaded ?? false,
    borderStyle: data.borderStyle,
    themeColor: data.themeColor,
    summary: data.summary ?? "",
  };
}
