"use server";

import openai from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
// import { canUseAITools } from "@/lib/permissions";
// import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import { put } from "@vercel/blob";

export async function generateCoverLetter({
  jobTitle,
  companyName,
  applicantName,
  professionalHeadline,
  education,
  yearsExperience,
  relevantExperience,
  achievements,
  tools,
  jobDescription,
}: {
  jobTitle: string;
  companyName?: string;
  applicantName?: string;
  professionalHeadline?: string;
  education?: string;
  yearsExperience?: string | number;
  relevantExperience?: string;
  achievements?: string;
  tools?: string;
  jobDescription?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // const subscriptionLevel = await getUserSubscriptionLevel(userId);
  // if (!canUseAITools(subscriptionLevel)) {
  //   throw new Error("Upgrade your subscription to use this feature");
  // }

  // const achievementsText =
  //   achievements?.trim() && achievements.trim() !== "" ? `${achievements}` : "";
  // const toolsText = tools?.trim() && tools.trim() !== "" ? `${tools}` : "";

  const systemMessage = `
You are an expert cover letter writing assistant.
You write only the body paragraphs of a professional cover letter.
You do not write dates, recipient blocks, greetings, closings, signatures, or headings.
`;

  const userMessage = `
Write the body only for a professional cover letter.

Applicant Profile:
- Applicant Name: ${applicantName || "Not specified"}
- Professional Headline: ${professionalHeadline || "Not specified"}
- Education: ${education || "Not specified"}
- Years of Experience: ${yearsExperience || "Not specified"}
- Relevant Experience: ${relevantExperience || "Not specified"}
${achievements ? `- Achievements: ${achievements}` : ""}
${tools ? `- Tools/Technologies: ${tools}` : ""}

Job Details:
- Job Title: ${jobTitle || "Not specified"}
${companyName ? `- Company: ${companyName}` : ""}
${jobDescription ? `- Job Description: ${jobDescription}` : ""}

Rules:
- Return only the body paragraphs.
- Do not include a date.
- Do not include "Hiring Manager".
- Do not include "Dear Hiring Manager".
- Do not include "Sincerely".
- Do not include the applicant name at the end.
- Do not include placeholders like [Date], [Company Address], [City, State, Zip Code].
- Write 4 to 6 polished paragraphs.
- Tailor the language to the job description when provided.
- Use the applicant profile when provided.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
  });

  const aiResponse = completion.choices[0].message.content;
  if (!aiResponse) throw new Error("Failed to generate content");

  return aiResponse.trim();
}

export async function deleteCoverLetter(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const coverLetter = await prisma.coverLetter.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!coverLetter) {
    throw new Error("CoverLetter not found");
  }

  if (coverLetter.userPhotoUrl) {
    await del(coverLetter.userPhotoUrl);
  }

  await prisma.coverLetter.delete({
    where: {
      id,
    },
  });

  revalidatePath("/coverletter");
}

export async function getcoverLetterById(id: string) {
  try {
    const coverLetter = await prisma.coverLetter.findUnique({
      where: { id }, // Use coverLetter ID to fetch it
    });

    return coverLetter;
  } catch (error) {
    console.error("Error fetching coverLetter:", error);
    return null;
  }
}

export async function saveCoverLetter(values: CoverLetterValues) {
  const { id } = values;

  const cleanValues = {
    ...values,
    userPhotoUrl: values.userPhotoUrl || undefined,
    signatureUrl: values.signatureUrl || undefined,
  };

  const { userPhoto, ...coverLetterValues } =
    coverLetterSchema.parse(cleanValues);

  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("User not authenticated");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, clerkId: true },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  const existingCoverLetter = id
    ? await prisma.coverLetter.findFirst({
        where: {
          id,
          userId: dbUser.id,
          clerkId,
        },
      })
    : null;

  if (id && !existingCoverLetter) {
    throw new Error("Cover letter not found");
  }

  let userPhotoUrl: string | null | undefined =
    values.userPhotoUrl ?? undefined;

  if (userPhoto instanceof File && process.env.BLOB_READ_WRITE_TOKEN) {
    if (existingCoverLetter?.userPhotoUrl) {
      await del(existingCoverLetter.userPhotoUrl);
    }

    const blob = await put(
      `cover-letter-photos/${crypto.randomUUID()}-${userPhoto.name}`,
      userPhoto,
      {
        access: "private",
      },
    );

    userPhotoUrl = blob.url;
  }

  if (id) {
    const updated = await prisma.coverLetter.update({
      where: { id },
      data: {
        ...coverLetterValues,
        clerkId,
        userPhotoUrl,
        updatedAt: new Date(),
      },
    });

    // revalidatePath("/coverletter");
    return updated;
  }

  const created = await prisma.coverLetter.create({
    data: {
      ...coverLetterValues,
      userId: dbUser.id,
      clerkId,
      userPhotoUrl,
    },
  });

  // revalidatePath("/coverletter");
  return created;
}
