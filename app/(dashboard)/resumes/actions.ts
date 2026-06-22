/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";

export async function deleteResume(resumeId: string) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: dbUser.id,
    },
    select: {
      id: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await prisma.resume.delete({
    where: {
      id: resume.id,
    },
  });

  revalidatePath("/resumes");
}

export async function saveResume(values: any) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const {
    id,
    photo,
    workExperience,
    education,
    techSkills,
    certifications,
    projects,
    accomplishments,
    interests,
    themeId,
    ...resumeValues
  } = values;

  const allowedResumeTypes = [
    "chronological",
    "functional",
    "combination",
    "federal",
  ] as const;

  const safeResumeType = allowedResumeTypes.includes(
    resumeValues.resumeType as any,
  )
    ? resumeValues.resumeType
    : "CORPORATE";

  const existingResume = id
    ? await prisma.resume.findFirst({
        where: {
          id,
          userId: dbUser.id,
        },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const data = {
    ...resumeValues,

    resumeType: safeResumeType,

    themeId: themeId || undefined,
    userId: dbUser.id,

    techSkills: {
      deleteMany: {},
      create:
        techSkills?.map((skill: any) =>
          typeof skill === "string"
            ? { name: skill, rating: 3 }
            : {
                name: skill.name || "",
                rating: skill.rating || 3,
              },
        ) || [],
    },

    workExperience: {
      deleteMany: {},
      create:
        workExperience?.map((exp: any) => ({
          position: exp.position || "",
          company: exp.company || "",
          location: exp.location || "",
          description: exp.description || "",
          duties: exp.duties || "",
          responsibilities: exp.responsibilities || "",
          accomplishments: exp.accomplishments || "",
          status: exp.status || "",
          grade: exp.grade || "",
          clearance: exp.clearance || "",
          hours: exp.hours || "",
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        })) || [],
    },

    education: {
      deleteMany: {},
      create:
        education?.map((edu: any) => ({
          degree: edu.degree || "",
          school: edu.school || "",
          location: edu.location || "",
          startDate: edu.startDate ? new Date(edu.startDate) : undefined,
          endDate: edu.endDate ? new Date(edu.endDate) : undefined,
        })) || [],
    },
    interest: interests ?? [],
    certifications: {
      deleteMany: {},
      create:
        certifications?.map((cert: any) => ({
          name: cert.name || "",
          issuer: cert.issuer || "",
          issuedDate: cert.issuedDate ? new Date(cert.issuedDate) : undefined,
          expiresDate: cert.expiresDate
            ? new Date(cert.expiresDate)
            : undefined,
          credentialUrl: cert.credentialUrl || "",
          description: cert.description || "",
        })) || [],
    },

    projects: {
      deleteMany: {},
      create:
        projects?.map((project: any) => ({
          name: project.name || "",
          role: project.role || "",
          description: project.description || "",
          technologies: project.technologies || [],
          url: project.url || "",
        })) || [],
    },
    updatedAt: new Date(),
  };

  if (id) {
    const updatedResume = await prisma.resume.update({
      where: { id },
      data,
    });

    revalidatePath("/resumes");
    return updatedResume;
  }

  const createdResume = await prisma.resume.create({
    data,
  });

  revalidatePath("/resumes");
  return createdResume;
}
