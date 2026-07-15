/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import openai from "@/lib/openai";
import prisma from "@/lib/prisma";

import {
  GenerateSkillsInput,
  generateSkillsSchema,
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

function cleanJsonString(jsonStr: string): string {
  return jsonStr
    .replace(/```json\s*/i, "")
    .replace(/```$/, "")
    .trim();
}

function safeDate(value: any): Date | undefined {
  if (
    !value ||
    value.toLowerCase().includes("present") ||
    value.toLowerCase().includes("current")
  ) {
    return undefined; // Prisma treats undefined as NULL for DateTime fields
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

const getArchetypeInstructions = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "federal":
      return "STRICT RULE: Use formal government language. Focus on GS-grade levels, metrics, and compliance.";
    case "creative":
      return "STRICT RULE: Use punchy action verbs. Keep it concise.";
    case "technology":
      return "STRICT RULE: Emphasize tech stack and quantitative impact.";
    default:
      return "Use professional business language with active voice.";
  }
};

// --- AI GENERATORS ---

export async function generateSummary(
  input: GenerateSummaryInput & { category?: string },
) {
  const { category } = input;

  const {
    jobTitle,
    workExperiences,
    skills,
    techSkills,
    jobDescriptionText,
    targetRole,
    targetCompany,
  } = generateSummarySchema.parse(input) as any;

  const systemMessage = `
You are an expert ATS resume writer.

Write a concise, professional resume summary tailored to the target job.

Rules:
- Return ONLY the summary text.
- Write 3 to 5 sentences.
- Do not use first person language.
- Use keywords from the job description naturally.
- Highlight relevant experience, tools, strengths, and business impact.
- Do not invent experience that is not supported by the resume data.
- Keep it polished, recruiter-friendly, and ATS-ready.

Use keywords and requirements from the target job description naturally.
Write a professional ATS-friendly summary.
Do not invent experience.

${getArchetypeInstructions(category)}
`;

  const userMessage = `
Target Role:
${input.targetRole}

Target Company:
${input.targetCompany}

Target Job Description:
${input.jobDescriptionText}

Current Job Title:
${jobTitle}

Work Experience:
${workExperiences?.map((e: any) => `${e.position} at ${e.company}`).join("\n")}

Skills:
${skills?.join(", ")}

Technical Skills:
${techSkills?.map((s: any) => s.name).join(", ")}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content?.trim() || "";
}

export async function generateSkills(
  input: GenerateSkillsInput,
): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { jobTitle, jobDescriptionText, targetRole, targetCompany } =
    generateSkillsSchema.parse(input);

  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: `
Return a raw JSON array of 50 ATS-friendly resume skills.

Rules:
- Return ONLY a JSON array.
- No markdown.
- No explanation.
- Prioritize skills found in the job description.
- Include tools, systems, responsibilities, soft skills, and role keywords.
- Do not invent highly specialized tools unless they appear in the job description.
        `,
      },
      {
        role: "user",
        content: `
Job title: ${jobTitle}
Target role: ${targetRole || jobTitle}
Target company: ${targetCompany || "Not provided"}

Job description:
${jobDescriptionText || "No job description provided."}
        `,
      },
    ],
    temperature: 0.3,
  });

  const content = completion.choices[0].message.content || "[]";
  return JSON.parse(cleanJsonString(content));
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput & {
    category?: string;
    jobDescriptionText?: string;
    targetRole?: string;
    targetCompany?: string;
  },
) {
  const { category } = input;

  const { description, jobDescriptionText, targetRole, targetCompany } =
    generateWorkExperienceSchema.parse(input) as any;

  const systemMessage = `
You are an expert ATS resume writer.

Transform the user's experience notes into a professional resume work experience entry tailored to the target job.

RULES:
- Return ONLY JSON.
- The "description" field MUST contain 4-6 ATS-friendly bullet points separated by \\n.
- Each bullet must start with "• ".
- Start each bullet with a strong action verb.
- Never use "I", "my", or first-person language.
- Use relevant keywords from the target job description naturally.
- Do not keyword-stuff.
- Do not invent experience that is not supported by the user's notes.
- Include measurable results when possible.
- Keep bullets concise, achievement-focused, and recruiter-friendly.
- Use past tense unless the role is current.
- Use keywords from the target job description.
- Do not fabricate experience.
- Focus bullets on what recruiters are looking for.

${getArchetypeInstructions(category)}

Return JSON exactly like this:
{
  "position": "",
  "company": "",
  "location": "",
  "description": "• Bullet 1\\n• Bullet 2\\n• Bullet 3\\n• Bullet 4",
  "startDate": "",
  "endDate": "",
  "status": "",
  "clearance": "",
  "duties": "",
  "responsibilities": "",
  "grade": "",
  "hours": ""
}
`;

  const userMessage = `
User experience notes:
${description}

Target role:
${targetRole || "Not provided"}

Target company:
${targetCompany || "Not provided"}

Target job description:
${jobDescriptionText || "No job description provided."}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const content = completion.choices[0].message.content || "{}";
  const parsed = JSON.parse(cleanJsonString(content));

  return {
    position: parsed.position || parsed.jobTitle || "",
    company: parsed.company || "",
    location: parsed.location || "",
    description:
      parsed.description
        ?.split("\n")
        .map((line: string) => line.trim())
        .filter(Boolean)
        .join("\n") || "",
    startDate: parsed.startDate || null,
    endDate: parsed.endDate || null,
    status: parsed.status || "",
    clearance: parsed.clearance || "",
    duties: parsed.duties || "",
    responsibilities: parsed.responsibilities || "",
    grade: parsed.grade || "",
    hours: parsed.hours || "",
  } as WorkExperience;
}
// --- RESUME PARSING ---

export async function parseResumeWithAI(
  rawText: string,
  isFederal: boolean = false,
) {
  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: `You are a strict JSON resume parser for ${isFederal ? "Federal" : "Corporate"} roles. 
        Extract data precisely into the schema. For Federal roles, specifically identify "Key Accomplishments" 
        or "Achievements" and map them to the 'accomplishments' field as a single detailed string.`,
      },
      {
        role: "user",
        content: `Extract from this text:\n\n${rawText.substring(0, 15000)}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "resume_schema",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false, // ✅ REQUIRED

          properties: {
            personalInfo: {
              type: "object",
              additionalProperties: false, // ✅ REQUIRED

              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                jobTitle: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
              },
              required: [
                "firstName",
                "lastName",
                "jobTitle",
                "email",
                "phone",
                "address",
              ],
            },

            summary: { type: "string" },

            skills: {
              type: "array",
              items: { type: "string" },
            },

            workExperience: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false, // ✅ REQUIRED

                properties: {
                  position: { type: "string" },
                  company: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                  responsibilities: { type: "string" },
                  accomplishments: { type: "string" },
                  grade: { type: "string" },
                  clearance: { type: "string" },
                  hours: { type: "string" },
                },
                required: [
                  "position",
                  "company",
                  "location",
                  "startDate",
                  "endDate",
                  "responsibilities",
                  "accomplishments",
                  "grade",
                  "clearance",
                  "hours",
                ],
              },
            },

            education: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false, // ✅ REQUIRED

                properties: {
                  degree: { type: "string" },
                  school: { type: "string" },
                  location: { type: "string" },
                  startDate: { type: "string" },
                  endDate: { type: "string" },
                },
                required: [
                  "degree",
                  "school",
                  "location",
                  "startDate",
                  "endDate",
                ],
              },
            },
          },

          required: [
            "personalInfo",
            "summary",
            "skills",
            "workExperience",
            "education",
          ],
        },
      },
    },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}

export async function saveParsedResumeData(resumeId: string, parsedData: any) {
  if (!resumeId) throw new Error("Missing resumeId");

  // 1. Map Keys based on the log we just saw
  const contact = parsedData.contact || {};
  const profSummary = parsedData.professional_summary || {};
  const work = parsedData.work_experience || [];
  const edu = profSummary.education || parsedData.education || [];
  const skills = parsedData.skills || [];
  const interests = parsedData.interests || [];

  // Helper to turn AI arrays into strings for the DB
  const flatten = (val: any) =>
    Array.isArray(val) ? val.join("\n") : val || "";

  return await prisma.$transaction(
    async (tx) => {
      await tx.techSkill.deleteMany({ where: { resumeId } });
      await tx.education.deleteMany({ where: { resumeId } });
      await tx.workExperience.deleteMany({ where: { resumeId } });

      return await tx.resume.update({
        where: { id: resumeId },
        data: {
          // Map "contact" name to first/last
          firstName: contact.name?.split(" ")[0] || "",
          lastName: contact.name?.split(" ").slice(1).join(" ") || "",
          jobTitle: contact.title || "",
          email: contact.email || "",
          phone: contact.phone || "",
          address: contact.address || "",
          summary: profSummary.summary || "",
          interest: interests,
          parsed: true,
          techSkills: {
            create: skills.map((s: string) => ({ name: s })),
          },
          education: {
            create: edu.map((e: any) => ({
              degree: e.degree || "",
              school: e.institution || e.school || "",
              location: e.location || "",
              // AI returned "07/1998 - 12/2002", we need to split it
              startDate: safeDate(e.dates?.split("-")[0]),
              endDate: safeDate(e.dates?.split("-")[1]),
              description: e.field || "",
            })),
          },
          workExperience: {
            create: work.map((j: any) => ({
              position: j.title || "",
              company: j.company || "",
              location: j.location || "",
              startDate: safeDate(j.dates?.split("-")[0]),
              endDate: safeDate(j.dates?.split("-")[1]),
              // FIX: Flatten the array of responsibilities into a single string
              responsibilities: flatten(j.responsibilities),
              accomplishments: flatten(j.accomplishments || j.achievements),
              description: flatten(j.responsibilities),
              duties: "",
              grade: j.grade || "",
              clearance: j.clearance || "",
              hours: j.hours || "",
            })),
          },
        },
      });
    },
    { timeout: 30000 },
  );
}

// --- CONTENT ANALYSIS ---

export async function analyzeContent(
  text: string,
  category: string,
  fieldName: string,
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: `You are a Resume Critic for ${category}. Suggest 1 improvement (max 20 words).`,
      },
      { role: "user", content: `Field ${fieldName}: "${text}"` },
    ],
  });

  return completion.choices[0].message.content?.trim() || "Excellent!";
}

export async function generateDuties(input: any): Promise<string> {
  return (
    "• Example duty\n• Example responsibility\n• Replace with AI-generated content" +
    input
  );
}
export async function generateResponsibilities(input: any): Promise<string> {
  return (
    "• Example accomplishment\n• Example achievement\n• Replace with AI-generated content" +
    input
  );
}
