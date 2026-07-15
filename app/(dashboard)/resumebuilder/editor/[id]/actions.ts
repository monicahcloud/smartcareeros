"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

type TechSkillInput = {
  name: string;
  rating: number;
};

type WorkExperienceInput = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;

  duties?: string;
  responsibilities?: string;
  accomplishments?: string;
  status?: string;
  grade?: string;
  clearance?: string;
  hours?: string;
  hoursPerWeek?: string;
  employmentType?: string;
  supervisor?: string;
  supervisorPhone?: string;
  mayContactSupervisor?: string;
};

type EducationInput = {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

type CertificationInput = {
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate: string;
  credentialUrl: string;
  description: string;
};

type ProjectInput = {
  name: string;
  role: string;
  description: string;
  technologies: string[];
  url: string;
};

type AccomplishmentInput = {
  title: string;
  organization: string;
  date: string;
  description: string;
  impact: string;
};

type SaveResumeBasicsInput = {
  resumeId: string;
  resumeTitle: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;

  skills: string[];
  techSkills: TechSkillInput[];
  workExperience: WorkExperienceInput[];
  education: EducationInput[];
  certifications: CertificationInput[];
  projects: ProjectInput[];
  accomplishments: AccomplishmentInput[];
};

export async function saveResumeBasics(input: SaveResumeBasicsInput) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingResume = await prisma.resume.findFirst({
    where: {
      id: input.resumeId,
      userId: user.id,
      clerkId,
    },
    select: {
      id: true,
    },
  });

  if (!existingResume) {
    throw new Error("Resume not found");
  }

  await prisma.resume.update({
    where: {
      id: existingResume.id,
    },
    data: {
      resumeTitle: input.resumeTitle || null,
      jobTitle: input.jobTitle || null,
      firstName: input.firstName || null,
      lastName: input.lastName || null,
      email: input.email || null,
      phone: input.phone || null,
      address: input.address || null,
      summary: input.summary || null,

      skills: cleanStringArray(input.skills),

      techSkills: {
        deleteMany: {},
        create: input.techSkills
          .filter((skill) => skill.name.trim())
          .map((skill) => ({
            name: skill.name.trim(),
            rating: clampRating(skill.rating),
          })),
      },

      workExperience: {
        deleteMany: {},
        create: input.workExperience
          .filter(
            (job) =>
              job.position.trim() ||
              job.company.trim() ||
              job.description.trim(),
          )
          .map((job) => ({
            position: job.position || "",
            company: job.company || "",
            location: job.location || "",
            description: job.description || "",

            duties: job.duties || "",
            responsibilities: job.responsibilities || "",
            accomplishments: job.accomplishments || "",

            status: job.status || "",
            grade: job.grade || "",
            clearance: job.clearance || "",
            hours: job.hours || job.hoursPerWeek || "",

            employmentType: job.employmentType || "",
            supervisor: job.supervisor || "",
            supervisorPhone: job.supervisorPhone || "",
            mayContactSupervisor: job.mayContactSupervisor || "",

            startDate: parseOptionalDate(job.startDate),
            endDate: parseOptionalDate(job.endDate),
          })),
      },

      education: {
        deleteMany: {},
        create: input.education
          .filter((item) => item.school.trim() || item.degree.trim())
          .map((item) => ({
            school: item.school || "",
            degree: item.degree || "",
            location: item.location || "",
            startDate: parseOptionalDate(item.startDate),
            endDate: parseOptionalDate(item.endDate),
          })),
      },

      certifications: {
        deleteMany: {},
        create: input.certifications
          .filter((item) => item.name.trim())
          .map((item) => ({
            name: item.name || "",
            issuer: item.issuer || "",
            issuedDate: parseOptionalDate(item.issuedDate),
            expiresDate: parseOptionalDate(item.expiresDate),
            credentialUrl: item.credentialUrl || "",
            description: item.description || "",
          })),
      },

      projects: {
        deleteMany: {},
        create: input.projects
          .filter((item) => item.name.trim() || item.description.trim())
          .map((item) => ({
            name: item.name || "",
            role: item.role || "",
            description: item.description || "",
            technologies: cleanStringArray(item.technologies),
            url: item.url || "",
          })),
      },

      accomplishments: {
        deleteMany: {},
        create: input.accomplishments
          .filter((item) => item.title.trim() || item.description.trim())
          .map((item) => ({
            title: item.title || "Accomplishment",
            organization: item.organization || "",
            date: parseOptionalDate(item.date),
            description: item.description || "",
            impact: item.impact || "",
          })),
      },
    },
  });

  revalidatePath(`/resumebuilder/editor/${input.resumeId}`);
  revalidatePath("/resumes");
}

function parseOptionalDate(value?: string | Date | null): Date | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function clampRating(value: number): number {
  if (!Number.isFinite(value)) {
    return 3;
  }

  return Math.min(5, Math.max(1, Math.round(value)));
}

function cleanStringArray(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  );
}
