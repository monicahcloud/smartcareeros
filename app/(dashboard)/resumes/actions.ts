/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";

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
    "CORPORATE",
    "FEDERAL",
    "UPLOADED",
    "MANUAL",
  ] as const;

  const safeResumeType = allowedResumeTypes.includes(
    resumeValues.resumeType as (typeof allowedResumeTypes)[number],
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

  const existingPhotoUrl =
    existingResume?.photoUrl && !existingResume.photoUrl.startsWith("data:")
      ? existingResume.photoUrl
      : null;

  let savedPhotoUrl: string | null =
    resumeValues.photoUrl && !resumeValues.photoUrl.startsWith("data:")
      ? resumeValues.photoUrl
      : existingPhotoUrl;

  if (photo instanceof File && photo.size > 0) {
    const fileExtension = photo.name.split(".").pop() || "jpg";

    const blob = await put(
      `resume-photos/${dbUser.id}/${randomUUID()}.${fileExtension}`,
      photo,
      {
        access: "public",
      },
    );

    savedPhotoUrl = blob.url;
  }

  if (!resumeValues.photoUrl && !photo) {
    savedPhotoUrl = null;
  }

  const data = {
    ...resumeValues,

    resumeType: safeResumeType,
    themeId: themeId || undefined,
    photoUrl: savedPhotoUrl,

    techSkills: {
      deleteMany: {},
      create:
        techSkills?.map((skill: any) =>
          typeof skill === "string"
            ? {
                name: skill,
                rating: 3,
              }
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

    accomplishments: {
      deleteMany: {},
      create:
        accomplishments?.map((item: any) => ({
          title: item.title || "",
          organization: item.organization || "",
          date: item.date ? new Date(item.date) : undefined,
          description: item.description || "",
          impact: item.impact || "",
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
    data: {
      ...data,
      user: {
        connect: {
          id: dbUser.id,
        },
      },
    },
  });

  revalidatePath("/resumes");
  return createdResume;
}

export async function updateResumeBranding(
  id: string,
  themeId: string,
  themeColor: string,
  showPhoto: boolean,
) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  return prisma.resume.update({
    where: { id },
    data: {
      themeId,
      themeColor,
      showPhoto,
    },
  });
}

export async function createResumeShareLink(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      clerkId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  const shareToken = resume.shareToken || randomUUID();

  await prisma.resume.update({
    where: {
      id,
    },
    data: {
      shareToken,
    },
  });

  return shareToken;
}
