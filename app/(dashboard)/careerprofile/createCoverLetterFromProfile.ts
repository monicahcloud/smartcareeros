// "use server";

// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function createCoverLetterFromCareerProfile() {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     throw new Error("Unauthorized");
//   }

//   const user = await prisma.user.findUnique({
//     where: { clerkId },
//     select: { id: true },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const profile = await prisma.careerProfile.findUnique({
//     where: {
//       userId: user.id,
//     },
//   });

//   if (!profile) {
//     throw new Error("Career profile not found");
//   }

//   const nameParts = (profile.fullName || "").trim().split(" ");
//   const firstName = nameParts[0] || "";
//   const lastName = nameParts.slice(1).join(" ") || "";

//   const coverLetter = await prisma.coverLetter.create({
//     data: {
//       userId: user.id,
//       clerkId,

//       firstName,
//       lastName,

//       userEmail: profile.email || "",
//       userPhone: profile.phone || "",
//       userAddress: profile.location || "",

//       website: profile.website || "",
//       linkedin: profile.linkedin || "",
//       gitHub: profile.gitHub || "",

//       jobTitle: profile.headline || "",
//       body: profile.summary || "",

//       template: "default",
//     },
//   });

//   return {
//     coverLetterId: coverLetter.id,
//   };
// }
// app/(dashboard)/career-profile/createCoverLetterFromProfile.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCoverLetterFromCareerProfile() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      careerProfile: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.careerProfile) {
    throw new Error("Please complete your Career Profile first.");
  }

  const profile = user.careerProfile;

  const nameParts = profile.fullName?.trim().split(" ") ?? [];

  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId: user.id,
      clerkId,

      firstName: nameParts[0] ?? user.firstName ?? "",
      lastName: nameParts.slice(1).join(" ") ?? user.lastName ?? "",

      userEmail: profile.email ?? user.email ?? "",
      userPhone: profile.phone ?? "",
      userAddress: profile.location ?? "",

      website: profile.website ?? "",
      linkedin: profile.linkedin ?? "",
      gitHub: profile.gitHub ?? "",

      jobTitle: profile.headline ?? "",

      body: "",
      template: "classic",
      themeId: "classic",
      themeColor: "#dc2626",
      showPhoto: true,

      content: {
        source: "career-profile",
        careerProfileId: profile.id,
        summary: profile.summary,
        skills: profile.skills,
        workExperience: profile.workExperience,
        education: profile.education,
        certifications: profile.certifications,
        projects: profile.projects,
      },
    },
  });

  return {
    coverLetterId: coverLetter.id,
  };
}
