"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type WorkExperience = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

type EducationItem = {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

export async function createResumeFromCareerProfile() {
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
    where: { userId: user.id },
  });

  if (!profile) {
    throw new Error("Career profile not found");
  }

  const nameParts = (profile.fullName || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const workExperience = Array.isArray(profile.workExperience)
    ? (profile.workExperience as WorkExperience[])
    : [];

  const education = Array.isArray(profile.education)
    ? (profile.education as EducationItem[])
    : [];

  const skills = Array.isArray(profile.skills)
    ? (profile.skills as string[])
    : [];

  const techSkills = Array.isArray(profile.techSkills)
    ? (profile.techSkills as string[])
    : [];

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      clerkId,
      resumeTitle: `${profile.headline || "Career Profile"} Resume`,
      resumeType: "CORPORATE",
      firstName,
      lastName,
      jobTitle: profile.headline || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.location || "",
      summary: profile.summary || "",
      skills,

      techSkills: {
        create: techSkills.map((skill) => ({
          name: skill,
          rating: 3,
        })),
      },

      workExperience: {
        create: workExperience.map((exp) => ({
          position: exp.position,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          description: exp.description,
        })),
      },

      education: {
        create: education.map((edu) => ({
          school: edu.school,
          degree: edu.degree,
          location: edu.location,
          startDate: edu.startDate ? new Date(edu.startDate) : undefined,
          endDate: edu.endDate ? new Date(edu.endDate) : undefined,
        })),
      },
    },
  });

  return {
    resumeId: resume.id,
  };
}
