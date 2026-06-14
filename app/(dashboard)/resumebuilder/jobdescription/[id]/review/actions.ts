"use server";

import prisma from "@/lib/prisma";
import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";

function cleanJson(content: string) {
  return content
    .replace(/```json\s*/i, "")
    .replace(/```/g, "")
    .trim();
}

export async function generateJobDescriptionInsights(jobDescriptionId: string) {
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

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
You analyze job descriptions for resume targeting.
Return ONLY valid JSON with this shape:
{
  "keywords": string[],
  "requiredSkills": string[],
  "preferredSkills": string[],
  "responsibilities": string[],
  "qualifications": string[],
  "tailoredSummary": string
}
Keep arrays concise. Maximum 10 items each.
The tailoredSummary should be 3-4 sentences written for a resume professional summary.
        `,
      },
      {
        role: "user",
        content: `
Job Title: ${jobDescription.title || ""}
Company: ${jobDescription.company || ""}
Location: ${jobDescription.location || ""}

Job Description:
${jobDescription.rawText}
        `,
      },
    ],
  });

  const content = completion.choices[0].message.content || "{}";
  const parsed = JSON.parse(cleanJson(content));

  const updated = await prisma.jobDescription.update({
    where: { id: jobDescription.id },
    data: {
      keywords: parsed.keywords || [],
      requiredSkills: parsed.requiredSkills || [],
      preferredSkills: parsed.preferredSkills || [],
      responsibilities: parsed.responsibilities || [],
      qualifications: parsed.qualifications || [],
      parsedData: {
        tailoredSummary: parsed.tailoredSummary || "",
      },
    },
  });
  console.log(parsed);
  return {
    id: updated.id,
    keywords: updated.keywords,
    requiredSkills: updated.requiredSkills,
    preferredSkills: updated.preferredSkills,
    responsibilities: updated.responsibilities,
    qualifications: updated.qualifications,
    tailoredSummary: parsed.tailoredSummary || "",
  };
}

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
  const parsedData = jobDescription.parsedData as {
    tailoredSummary?: string;
  } | null;

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      clerkId,

      resumeType: "CORPORATE",

      resumeTitle: `${jobDescription.title || "Professional"} Resume`,

      jobTitle: jobDescription.title || "",

      summary: parsedData?.tailoredSummary || "",

      skills: jobDescription.requiredSkills || [],

      description: `Generated from job description for ${
        jobDescription.company || "target company"
      }`,
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
