"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/resumebuilder/editor/${input.resumeId}`);
  revalidatePath("/resumes");
}
