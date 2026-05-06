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
    userPhoto: data.userPhotoUrl ?? "",
    shareToken: data.shareToken ?? "",
    showPhoto: data.showPhoto ?? false,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    userAddress: data.userAddress ?? "",
    website: data.website ?? "",
    body: data.body ?? "",
    userPhone: data.userPhone ?? "",
    userEmail: data.userEmail ?? "",
    companyAddress: data.companyAddress ?? "",
    companyName: data.companyName ?? "",
    recipientName: data.recipientName ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",
    signatureUrl: data.signatureUrl ?? "",
    borderStyle: data.borderStyle ?? "",
    themeColor: data.themeColor ?? "",
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
