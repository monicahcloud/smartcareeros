"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createJobDescription(values: {
  title?: string;
  company?: string;
  location?: string;
  employmentType?: string;
  salary?: string;
  rawText: string;

  applicantName?: string;
  professionalHeadline?: string;
  education?: string;
  yearsExperience?: string;
  tools?: string;
  relevantExperience?: string;
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) throw new Error("User not found");

  const jobDescription = await prisma.jobDescription.create({
    data: {
      userId: user.id,
      clerkId,

      title: values.title || undefined,
      company: values.company || undefined,
      location: values.location || undefined,
      employmentType: values.employmentType || undefined,
      salary: values.salary || undefined,

      rawText: values.rawText,
      source: "PASTED",

      parsedData: {
        applicantName: values.applicantName || "",
        professionalHeadline: values.professionalHeadline || "",
        education: values.education || "",
        yearsExperience: values.yearsExperience || "",
        tools: values.tools || "",
        relevantExperience: values.relevantExperience || "",
      },
    },
  });

  revalidatePath("/jobdescriptions");

  return jobDescription;
}

export async function deleteJobDescription(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  await prisma.jobDescription.delete({
    where: { id },
  });

  revalidatePath("/jobdescriptions");
}
