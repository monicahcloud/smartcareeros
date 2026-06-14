"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {
  CertificationItem,
  EducationItem,
  ProjectItem,
  WorkExperienceItem,
} from "./types";

export async function saveResumeBasics(input: {
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

  await prisma.resume.update({
    where: {
      id: input.resumeId,
      userId: user.id,
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
      skills: input.skills,
      techSkills: input.techSkills,
      workExperience: input.workExperience,
      education: input.education,
      certifications: input.certifications,
      projects: input.projects,
      accomplishments: input.accomplishments,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/resumebuilder/editor/${input.resumeId}`);
  revalidatePath("/resumes");
}
