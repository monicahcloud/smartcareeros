import { Ref } from "react";
import { CoverLetterValues, ResumeValues } from "./validation";
import { JobDescription, Prisma, Resume } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export const resumeDataInclude = {
  workExperience: true,
  education: true,
  techSkills: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: {
    workExperience: true;
    education: true;
    techSkills: true;
    certifications: true;
    projects: true;
    accomplishments: true;
  };
}>;

export interface CoverLetterFormProps {
  form?: UseFormReturn<CoverLetterValues>;
  coverLetterData: CoverLetterValues;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
  contentRef?: Ref<HTMLDivElement>;
  className?: string;
  resumes?: Partial<Resume>[];
  jobDescription?: JobDescription | null;
}

export const coverLetterInclude = {} satisfies Prisma.CoverLetterInclude;

export type CoverLetterServerData = Prisma.CoverLetterGetPayload<{
  include: typeof coverLetterInclude;
}>;
