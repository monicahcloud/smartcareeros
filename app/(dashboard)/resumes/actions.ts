"use server";

import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentDbUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";

type TechSkillInput =
  | string
  | {
      name?: string;
      rating?: number;
    };

type WorkExperienceInput = {
  position?: string;
  company?: string;
  location?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  description?: string;

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

  salary?: string;
  time?: string;
};

type EducationInput = {
  degree?: string;
  school?: string;
  location?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  description?: string;
};

type CertificationInput = {
  name?: string;
  issuer?: string;
  issuedDate?: string | Date | null;
  expiresDate?: string | Date | null;
  credentialUrl?: string;
  description?: string;
};

type ProjectInput = {
  name?: string;
  role?: string;
  description?: string;
  technologies?: string[];
  url?: string;
};

type AccomplishmentInput = {
  title?: string;
  organization?: string;
  date?: string | Date | null;
  description?: string;
  impact?: string;
};

type SaveResumeInput = {
  id?: string;

  resumeTitle?: string;
  resumeType?: string;
  description?: string;

  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  gitHub?: string;
  summary?: string;

  skills?: string[];
  interests?: string[];

  themeId?: string;
  themeColor?: string;
  borderStyle?: string;
  showPhoto?: boolean;

  photo?: File;
  photoUrl?: string | null;

  targetRole?: string;
  targetCompany?: string;
  jobDescriptionId?: string | null;
  jobDescriptionText?: string | null;

  techSkills?: TechSkillInput[];
  workExperience?: WorkExperienceInput[];
  education?: EducationInput[];
  certifications?: CertificationInput[];
  projects?: ProjectInput[];
  accomplishments?: AccomplishmentInput[];
};

const ALLOWED_RESUME_TYPES = [
  "CORPORATE",
  "FEDERAL",
  "UPLOADED",
  "MANUAL",
] as const;

type AllowedResumeType = (typeof ALLOWED_RESUME_TYPES)[number];

export async function deleteResume(resumeId: string) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: dbUser.id,
    },
    select: {
      id: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await prisma.resume.delete({
    where: {
      id: resume.id,
    },
  });

  revalidatePath("/resumes");
}

export async function saveResume(values: SaveResumeInput) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const {
    id,
    photo,
    photoUrl,

    techSkills = [],
    workExperience = [],
    education = [],
    certifications = [],
    projects = [],
    accomplishments = [],
    interests = [],

    resumeType,
    ...resumeValues
  } = values;

  const existingResume = id
    ? await prisma.resume.findFirst({
        where: {
          id,
          userId: dbUser.id,
        },
        select: {
          id: true,
          photoUrl: true,
        },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const savedPhotoUrl = await resolvePhotoUrl({
    photo,
    requestedPhotoUrl: photoUrl,
    existingPhotoUrl: existingResume?.photoUrl,
    userId: dbUser.id,
  });

  const safeResumeType = normalizeResumeType(resumeType);

  const relationData = {
    techSkills: {
      deleteMany: {},
      create: techSkills.map(normalizeTechSkill).filter(
        (
          skill,
        ): skill is {
          name: string;
          rating: number;
        } => Boolean(skill),
      ),
    },

    workExperience: {
      deleteMany: {},
      create: workExperience
        .filter(hasWorkExperienceContent)
        .map((experience) => ({
          position: cleanOptionalString(experience.position),
          company: cleanOptionalString(experience.company),
          location: cleanOptionalString(experience.location),
          description: cleanOptionalString(experience.description),

          duties: cleanOptionalString(experience.duties),
          responsibilities: cleanOptionalString(experience.responsibilities),
          accomplishments: cleanOptionalString(experience.accomplishments),

          status: cleanOptionalString(experience.status),
          grade: cleanOptionalString(experience.grade),
          clearance: cleanOptionalString(experience.clearance),

          hours: cleanOptionalString(
            experience.hours || experience.hoursPerWeek,
          ),

          employmentType: cleanOptionalString(experience.employmentType),

          supervisor: cleanOptionalString(experience.supervisor),
          supervisorPhone: cleanOptionalString(experience.supervisorPhone),
          mayContactSupervisor: cleanOptionalString(
            experience.mayContactSupervisor,
          ),

          salary: cleanOptionalString(experience.salary),
          time: cleanOptionalString(experience.time),

          startDate: parseOptionalDate(experience.startDate),
          endDate: parseOptionalDate(experience.endDate),
        })),
    },

    education: {
      deleteMany: {},
      create: education.filter(hasEducationContent).map((item) => ({
        degree: cleanOptionalString(item.degree),
        school: cleanOptionalString(item.school),
        location: cleanOptionalString(item.location),
        description: cleanOptionalString(item.description),
        startDate: parseOptionalDate(item.startDate),
        endDate: parseOptionalDate(item.endDate),
      })),
    },

    certifications: {
      deleteMany: {},
      create: certifications
        .filter((item) => Boolean(item.name?.trim()))
        .map((item) => ({
          name: cleanOptionalString(item.name),
          issuer: cleanOptionalString(item.issuer),
          issuedDate: parseOptionalDate(item.issuedDate),
          expiresDate: parseOptionalDate(item.expiresDate),
          credentialUrl: cleanOptionalString(item.credentialUrl),
          description: cleanOptionalString(item.description),
        })),
    },

    projects: {
      deleteMany: {},
      create: projects
        .filter(
          (item) =>
            Boolean(item.name?.trim()) || Boolean(item.description?.trim()),
        )
        .map((item) => ({
          name: cleanOptionalString(item.name),
          role: cleanOptionalString(item.role),
          description: cleanOptionalString(item.description),
          technologies: cleanStringArray(item.technologies ?? []),
          url: cleanOptionalString(item.url),
        })),
    },

    accomplishments: {
      deleteMany: {},
      create: accomplishments
        .filter(
          (item) =>
            Boolean(item.title?.trim()) || Boolean(item.description?.trim()),
        )
        .map((item) => ({
          title: item.title?.trim() || "Accomplishment",
          organization: cleanOptionalString(item.organization),
          date: parseOptionalDate(item.date),
          description: cleanOptionalString(item.description),
          impact: cleanOptionalString(item.impact),
        })),
    },
  };

  const scalarData = {
    resumeTitle: cleanNullableString(resumeValues.resumeTitle),
    description: cleanNullableString(resumeValues.description),

    firstName: cleanNullableString(resumeValues.firstName),
    lastName: cleanNullableString(resumeValues.lastName),
    jobTitle: cleanNullableString(resumeValues.jobTitle),
    email: cleanNullableString(resumeValues.email),
    phone: cleanNullableString(resumeValues.phone),
    address: cleanNullableString(resumeValues.address),
    website: cleanNullableString(resumeValues.website),
    linkedin: cleanNullableString(resumeValues.linkedin),
    gitHub: cleanNullableString(resumeValues.gitHub),
    summary: cleanNullableString(resumeValues.summary),

    themeId: cleanNullableString(resumeValues.themeId),
    themeColor: resumeValues.themeColor || "#000000",
    borderStyle: resumeValues.borderStyle || "squircle",
    showPhoto: resumeValues.showPhoto ?? true,

    targetRole: cleanNullableString(resumeValues.targetRole),
    targetCompany: cleanNullableString(resumeValues.targetCompany),
    jobDescriptionId: resumeValues.jobDescriptionId || null,
    jobDescriptionText: resumeValues.jobDescriptionText || null,

    resumeType: safeResumeType,
    photoUrl: savedPhotoUrl,

    skills: cleanStringArray(resumeValues.skills ?? []),
    interest: cleanStringArray(interests),

    ...relationData,
  };

  if (existingResume) {
    const updatedResume = await prisma.resume.update({
      where: {
        id: existingResume.id,
      },
      data: scalarData,
      include: {
        techSkills: true,
        workExperience: true,
        education: true,
        certifications: true,
        projects: true,
        accomplishments: true,
      },
    });

    revalidateResumePaths(updatedResume.id);

    return updatedResume;
  }

  const createdResume = await prisma.resume.create({
    data: {
      ...scalarData,

      clerkId: dbUser.clerkId,

      user: {
        connect: {
          id: dbUser.id,
        },
      },
    },
    include: {
      techSkills: true,
      workExperience: true,
      education: true,
      certifications: true,
      projects: true,
      accomplishments: true,
    },
  });

  revalidateResumePaths(createdResume.id);

  return createdResume;
}

export async function updateResumeBranding(
  id: string,
  themeId: string,
  themeColor: string,
  showPhoto: boolean,
) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      clerkId,
    },
    select: {
      id: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  const updatedResume = await prisma.resume.update({
    where: {
      id: resume.id,
    },
    data: {
      themeId,
      themeColor,
      showPhoto,
    },
  });

  revalidateResumePaths(id);

  return updatedResume;
}

export async function createResumeShareLink(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      clerkId,
    },
    select: {
      id: true,
      shareToken: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.shareToken) {
    return resume.shareToken;
  }

  const shareToken = randomUUID();

  await prisma.resume.update({
    where: {
      id: resume.id,
    },
    data: {
      shareToken,
    },
  });

  return shareToken;
}

function normalizeResumeType(value?: string): AllowedResumeType {
  return ALLOWED_RESUME_TYPES.includes(value as AllowedResumeType)
    ? (value as AllowedResumeType)
    : "CORPORATE";
}

function normalizeTechSkill(skill: TechSkillInput) {
  if (typeof skill === "string") {
    const name = skill.trim();

    return name
      ? {
          name,
          rating: 3,
        }
      : null;
  }

  const name = skill.name?.trim();

  if (!name) {
    return null;
  }

  return {
    name,
    rating: clampRating(skill.rating),
  };
}

function clampRating(value?: number): number {
  if (!Number.isFinite(value)) {
    return 3;
  }

  return Math.min(5, Math.max(1, Math.round(value as number)));
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

function cleanStringArray(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  );
}

function cleanNullableString(value?: string | null): string | null {
  const cleaned = value?.trim();

  return cleaned ? cleaned : null;
}

function cleanOptionalString(value?: string | null): string {
  return value?.trim() || "";
}

function hasWorkExperienceContent(item: WorkExperienceInput): boolean {
  return Boolean(
    item.position?.trim() ||
    item.company?.trim() ||
    item.description?.trim() ||
    item.duties?.trim() ||
    item.responsibilities?.trim(),
  );
}

function hasEducationContent(item: EducationInput): boolean {
  return Boolean(item.school?.trim() || item.degree?.trim());
}

async function resolvePhotoUrl({
  photo,
  requestedPhotoUrl,
  existingPhotoUrl,
  userId,
}: {
  photo?: File;
  requestedPhotoUrl?: string | null;
  existingPhotoUrl?: string | null;
  userId: string;
}): Promise<string | null> {
  if (photo instanceof File && photo.size > 0) {
    const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";

    const blob = await put(
      `resume-photos/${userId}/${randomUUID()}.${extension}`,
      photo,
      {
        access: "public",
        contentType: photo.type || undefined,
      },
    );

    return blob.url;
  }

  /*
   * The form did not send a photo change.
   * Preserve the existing stored photo.
   */
  if (requestedPhotoUrl === undefined) {
    return existingPhotoUrl || null;
  }

  /*
   * null or empty string means the user removed it.
   */
  if (!requestedPhotoUrl) {
    return null;
  }

  /*
   * Do not store browser-local data URLs.
   */
  if (requestedPhotoUrl.startsWith("data:")) {
    return existingPhotoUrl || null;
  }

  return requestedPhotoUrl;
}

function revalidateResumePaths(resumeId: string) {
  revalidatePath("/resumes");
  revalidatePath(`/resumebuilder/editor/${resumeId}`);
  revalidatePath(`/resumes/preview/${resumeId}`);
}
