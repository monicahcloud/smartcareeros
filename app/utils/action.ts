"use server";

import prisma from "@/lib/prisma";
import { feedbackSchema } from "@/lib/validation";
import { Interview } from "@prisma/client";
import { getDbUserByClerkId } from "./auth-user";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { mappings } from "./constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, clerkId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`,
      )
      .join("");

    const { object } = await generateObject({
      model: openai("gpt-5"),
      schema: feedbackSchema,
      prompt: `
You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Do not be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

IMPORTANT:
- Do NOT use '&' (ampersand). Always write "and".
- Return only a valid JSON object matching the exact schema.
- Category names must exactly match:
  - "Communication Skills"
  - "Technical Knowledge"
  - "Problem Solving"
  - "Cultural Fit"
  - "Confidence and Clarity"

Transcript:
${formattedTranscript}

Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:

- Communication Skills: Clarity, articulation, structured responses.
- Technical Knowledge: Understanding of key concepts for the role.
- Problem Solving: Ability to analyze problems and propose solutions.
- Cultural Fit: Alignment with company values and job role.
- Confidence and Clarity: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
    });

    const user = await getDbUserByClerkId(clerkId);

    const feedbackData = {
      interviewId,
      userId: user.id,
      clerkId: user.clerkId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
    };

    const feedback = feedbackId
      ? await prisma.feedback.update({
          where: { id: feedbackId },
          data: feedbackData,
        })
      : await prisma.feedback.create({
          data: feedbackData,
        });

    return { success: true, feedbackId: feedback.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}
export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams,
): Promise<Feedback | null> {
  const { interviewId, clerkId } = params;

  const user = await getDbUserByClerkId(clerkId);

  const feedback = await prisma.feedback.findFirst({
    where: {
      interviewId,
      userId: user.id,
    },
  });

  if (!feedback) return null;

  return {
    ...feedback,
    categoryScores: feedback.categoryScores as {
      name: string;
      score: number;
      comment: string;
    }[],
  };
}

export async function deleteFeedbackByInterviewId(params: {
  interviewId: string;
  clerkId: string;
}) {
  const { interviewId, clerkId } = params;

  try {
    const user = await getDbUserByClerkId(clerkId);

    const feedback = await prisma.feedback.findFirst({
      where: {
        interviewId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!feedback) {
      return { success: false, error: "Feedback not found." };
    }

    await prisma.feedback.delete({
      where: {
        id: feedback.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return { success: false, error: "Failed to delete feedback." };
  }
}
export async function deleteInterviewById(params: {
  interviewId: string;
  clerkId: string;
}) {
  const { interviewId, clerkId } = params;

  try {
    const user = await getDbUserByClerkId(clerkId);

    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!interview) {
      return { success: false, error: "Interview not found." };
    }

    // Delete any feedback tied to this interview first
    await prisma.feedback.deleteMany({
      where: {
        interviewId,
        userId: user.id,
      },
    });

    // Then delete the interview itself
    await prisma.interview.delete({
      where: {
        id: interviewId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting interview:", error);
    return { success: false, error: "Failed to delete interview." };
  }
}

export async function getInterviewsByClerkId(
  clerkId: string,
): Promise<Interview[]> {
  const user = await getDbUserByClerkId(clerkId);

  return prisma.interview.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[]> {
  const { clerkId, limit = 20 } = params;

  const user = await getDbUserByClerkId(clerkId);

  return prisma.interview.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  return prisma.interview.findUnique({
    where: {
      id,
    },
  });
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    })),
  );

  return results;
};
