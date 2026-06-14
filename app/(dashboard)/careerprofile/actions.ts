"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getCareerProfile() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.careerProfile.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function saveCareerProfile(input: {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  gitHub: string;
  summary: string;
  skills: string[];
  techSkills: string[];
  workExperience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    issuedDate: string;
    expiresDate: string;
    credentialUrl: string;
    description: string;
  }[];
  projects: {
    name: string;
    role: string;
    description: string;
    technologies: string[];
    url: string;
  }[];
  accomplishments: {
    title: string;
    organization: string;
    date: string;
    description: string;
    impact: string;
  }[];
  federalDetails: {
    citizenship: string;
    veteranPreference: string;
    securityClearance: string;
    federalEmploymentStatus: string;
    currentGsGrade: string;
    desiredGsGrade: string;
    workSchedule: string;
    availability: string;
    willingToRelocate: string;
    supervisorContactPermission: string;
  };
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const profile = await prisma.careerProfile.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      clerkId,
      fullName: input.fullName || null,
      headline: input.headline || null,
      email: input.email || null,
      phone: input.phone || null,
      location: input.location || null,
      website: input.website || null,
      linkedin: input.linkedin || null,
      gitHub: input.gitHub || null,
      summary: input.summary || null,
      skills: input.skills,
      techSkills: input.techSkills,
      workExperience: input.workExperience,
      education: input.education,
      certifications: input.certifications,
      projects: input.projects,
      accomplishments: input.accomplishments,
      federalDetails: input.federalDetails,
    },
    update: {
      fullName: input.fullName || null,
      headline: input.headline || null,
      email: input.email || null,
      phone: input.phone || null,
      location: input.location || null,
      website: input.website || null,
      linkedin: input.linkedin || null,
      gitHub: input.gitHub || null,
      summary: input.summary || null,
      skills: input.skills,
      techSkills: input.techSkills,
      workExperience: input.workExperience,
      education: input.education,
      certifications: input.certifications,
      projects: input.projects,
      accomplishments: input.accomplishments,
      federalDetails: input.federalDetails,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/careerprofile");

  return profile;
}
