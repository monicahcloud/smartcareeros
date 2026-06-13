"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function generateResumeFromJobDescription(
  jobDescriptionId: string,
) {
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

  const jobDescription = await prisma.jobDescription.findFirst({
    where: {
      id: jobDescriptionId,
      userId: user.id,
    },
  });

  if (!jobDescription) {
    throw new Error("Job description not found");
  }

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      clerkId,
      resumeTitle: jobDescription.title || "Resume From Job Description",
      resumeType: "CORPORATE",
      summary: `Tailored resume draft generated for ${
        jobDescription.title || "this role"
      } at ${jobDescription.company || "target company"}.`,
    },
  });

  return {
    resumeId: resume.id,
  };
}

export async function saveJobDescriptionForResume(input: {
  title?: string;
  company?: string;
  location?: string;
  rawText: string;
  sourceType?: string;
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

  const jobDescription = await prisma.jobDescription.create({
    data: {
      userId: user.id,
      clerkId,
      title: input.title || null,
      company: input.company || null,
      location: input.location || null,
      rawText: input.rawText,
      source: "PASTED",
      requiredSkills: [],
      preferredSkills: [],
      responsibilities: [],
      qualifications: [],
      keywords: [],
      parsedData: {
        intent: "resume",
        sourceType: input.sourceType || "career-profile",
      },
    },
  });

  return {
    jobDescriptionId: jobDescription.id,
  };
}
