// app/(dashboard)/jobdescriptions/createCoverLetterFromJobDescription.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function createCoverLetterFromJobDescription(
  jobDescriptionId: string,
) {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { careerProfile: true },
  });

  if (!user) throw new Error("User not found");

  const jobDescription = await prisma.jobDescription.findFirst({
    where: {
      id: jobDescriptionId,
      clerkId,
    },
  });

  if (!jobDescription) throw new Error("Job description not found");

  const profile = user.careerProfile;

  const nameParts = profile?.fullName?.trim().split(" ") ?? [];

  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId: user.id,
      clerkId,

      firstName: nameParts[0] ?? user.firstName ?? "",
      lastName: nameParts.slice(1).join(" ") ?? user.lastName ?? "",
      userEmail: profile?.email ?? user.email ?? "",
      userPhone: profile?.phone ?? "",
      userAddress: profile?.location ?? "",
      website: profile?.website ?? "",
      linkedin: profile?.linkedin ?? "",
      gitHub: profile?.gitHub ?? "",

      jobTitle: jobDescription.title ?? profile?.headline ?? "",
      companyName: jobDescription.company ?? "",

      body: "",
      template: "classic",
      themeId: "classic",
      themeColor: "#dc2626",

      content: {
        source: "job-description",
        careerProfileId: profile?.id ?? null,
        jobDescriptionId: jobDescription.id,
      },
    },
  });

  redirect(
    `/coverletterbuilder/editor/${coverLetter.id}?jobDescriptionId=${jobDescription.id}&step=body`,
  );
}
