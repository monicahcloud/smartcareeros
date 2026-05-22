/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CoverLetterServerData } from "./types";
import { CoverLetterValues, UserInfoValues } from "./validation";

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
