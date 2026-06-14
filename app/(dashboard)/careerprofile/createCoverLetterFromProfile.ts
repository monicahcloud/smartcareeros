"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createCoverLetterFromCareerProfile() {
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

  const profile = await prisma.careerProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    throw new Error("Career profile not found");
  }

  const nameParts = (profile.fullName || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId: user.id,
      clerkId,

      firstName,
      lastName,

      userEmail: profile.email || "",
      userPhone: profile.phone || "",
      userAddress: profile.location || "",

      website: profile.website || "",
      linkedin: profile.linkedin || "",
      gitHub: profile.gitHub || "",

      jobTitle: profile.headline || "",
      body: profile.summary || "",

      template: "default",
    },
  });

  return {
    coverLetterId: coverLetter.id,
  };
}
