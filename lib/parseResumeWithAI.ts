import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import openai from "@/lib/openai";

const optionalString = z.string().default("");

const TechSkillSchema = z.object({
  name: optionalString,
  rating: z.number().int().min(1).max(5).default(3),
});

const WorkExperienceSchema = z.object({
  position: optionalString,
  company: optionalString,
  location: optionalString,
  startDate: optionalString,
  endDate: optionalString,
  description: optionalString,

  duties: optionalString,
  responsibilities: optionalString,
  accomplishments: optionalString,
  status: optionalString,
  grade: optionalString,
  clearance: optionalString,
  hours: optionalString,
  hoursPerWeek: optionalString,
  employmentType: optionalString,
  supervisor: optionalString,
  supervisorPhone: optionalString,
  mayContactSupervisor: optionalString,
});

const EducationSchema = z.object({
  school: optionalString,
  degree: optionalString,
  location: optionalString,
  startDate: optionalString,
  endDate: optionalString,
});

const CertificationSchema = z.object({
  name: optionalString,
  issuer: optionalString,
  issuedDate: optionalString,
  expiresDate: optionalString,
  credentialUrl: optionalString,
  description: optionalString,
});

const ProjectSchema = z.object({
  name: optionalString,
  role: optionalString,
  description: optionalString,
  technologies: z.array(z.string()).default([]),
  url: optionalString,
});

const AccomplishmentSchema = z.object({
  title: optionalString,
  organization: optionalString,
  date: optionalString,
  description: optionalString,
  impact: optionalString,
});

const ParsedResumeSchema = z.object({
  resumeTitle: z.string().default("Uploaded Resume"),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  email: optionalString,
  phone: optionalString,
  address: optionalString,
  website: optionalString,
  linkedin: optionalString,
  gitHub: optionalString,
  summary: optionalString,

  skills: z.array(z.string()).default([]),
  techSkills: z.array(TechSkillSchema).default([]),
  workExperience: z.array(WorkExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  accomplishments: z.array(AccomplishmentSchema).default([]),
  interests: z.array(z.string()).default([]),
});

export type ParsedResume = z.infer<typeof ParsedResumeSchema>;

export async function parseResumeWithAI(
  resumeText: string,
  isFederal = false,
): Promise<ParsedResume> {
  const cleanedResumeText = resumeText.trim();

  if (!cleanedResumeText) {
    throw new Error("No resume text found to parse.");
  }

  const response = await openai.responses.parse({
    model: "gpt-5",

    reasoning: {
      effort: "low",
    },

    input: [
      {
        role: "system",
        content: [
          "You are an expert résumé parser.",
          "Extract only information supported by the supplied résumé.",
          "Do not invent employers, dates, qualifications, contact information, or achievements.",
          "Use empty strings and empty arrays when information is unavailable.",
          "Dates must use YYYY-MM-DD when an exact date is available.",
          "When only a month and year are available, use the first day of that month.",
          "When only a year is available, use January 1 of that year.",
          "Technical skill ratings must be integers from 1 to 5.",
          "Use a rating of 3 when the résumé does not indicate proficiency.",
          isFederal
            ? "This is a federal résumé. Preserve duties, responsibilities, accomplishments, hours per week, employment type, supervisor details, clearance, grade, status, and specialized experience whenever present."
            : "This is a standard résumé. Leave federal-only fields empty unless they are explicitly present.",
        ].join("\n"),
      },
      {
        role: "user",
        content: `Parse the following résumé into the required structure:\n\n${cleanedResumeText}`,
      },
    ],

    text: {
      format: zodTextFormat(ParsedResumeSchema, "parsed_resume"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("AI parser returned no structured résumé data.");
  }

  return normalizeParsedResume(response.output_parsed);
}

function normalizeParsedResume(data: ParsedResume): ParsedResume {
  return {
    ...data,

    resumeTitle: data.resumeTitle.trim() || "Uploaded Resume",

    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    jobTitle: data.jobTitle.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    website: data.website.trim(),
    linkedin: data.linkedin.trim(),
    gitHub: data.gitHub.trim(),
    summary: data.summary.trim(),

    skills: removeEmptyStrings(data.skills),
    interests: removeEmptyStrings(data.interests),

    techSkills: data.techSkills
      .map((skill) => ({
        name: skill.name.trim(),
        rating: Math.min(5, Math.max(1, skill.rating || 3)),
      }))
      .filter((skill) => skill.name),

    workExperience: data.workExperience.filter(
      (job) =>
        job.position.trim() || job.company.trim() || job.description.trim(),
    ),

    education: data.education.filter(
      (education) => education.school.trim() || education.degree.trim(),
    ),

    certifications: data.certifications.filter((certification) =>
      certification.name.trim(),
    ),

    projects: data.projects
      .map((project) => ({
        ...project,
        technologies: removeEmptyStrings(project.technologies),
      }))
      .filter((project) => project.name.trim() || project.description.trim()),

    accomplishments: data.accomplishments.filter(
      (item) => item.title.trim() || item.description.trim(),
    ),
  };
}

function removeEmptyStrings(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean)),
  );
}
