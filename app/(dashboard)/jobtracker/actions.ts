"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { JobStatus } from "@prisma/client";

export async function getTrackedJobs() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    return [];
  }

  return prisma.job.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });
}

export async function updateJobStatus(jobId: string, status: JobStatus) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  await prisma.job.update({
    where: { id: jobId },
    data: {
      status,
      lastActivityAt: new Date(),
      dateApplied: status === "APPLIED" ? new Date() : undefined,
    },
  });

  revalidatePath("/jobtracker");
}

export async function createTrackedJob(input: {
  position: string;
  company: string;
  location?: string;
  salary?: string;
  url?: string;
  source?: string;
  notes?: string;
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

  await prisma.job.create({
    data: {
      userId: user.id,
      clerkId,
      position: input.position,
      company: input.company,
      location: input.location || null,
      salary: input.salary || null,
      url: input.url || null,
      source: input.source || "Manual",
      notes: input.notes || null,
      status: "SAVED",
      requirements: [],
      lastActivityAt: new Date(),
    },
  });

  revalidatePath("/jobtracker");
}
