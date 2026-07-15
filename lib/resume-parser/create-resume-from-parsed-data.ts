/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { parseResumeDate } from "@/lib/resume-parser/parse-date";
import { ParsedResume } from "../parseResumeWithAI";

type CreateResumeInput = {
  userId: string;
  clerkId: string;
  uploadId: string;
  uploadedFileUrl: string;
  rawText: string;
  parsedResume: ParsedResume;
  isFederal: boolean;
};

export async function createResumeFromParsedData({
  userId,
  clerkId,
  uploadId,
  uploadedFileUrl,
  rawText,
  parsedResume,
  isFederal,
}: CreateResumeInput) {
  return prisma.$transaction(async (tx) => {
    const upload = await tx.uploadedDocument.findUnique({
      where: {
        id: uploadId,
      },
      select: {
        resumeId: true,
      },
    });

    if (!upload) {
      throw new Error("Uploaded document was not found.");
    }

    // Idempotency protection:
    // An Inngest retry must not create a second résumé.
    if (upload.resumeId) {
      return tx.resume.findUniqueOrThrow({
        where: {
          id: upload.resumeId,
        },
      });
    }

    const resume = await tx.resume.create({
      data: {
        userId,
        clerkId,

        resumeTitle: parsedResume.resumeTitle || "Uploaded Resume",
        resumeType: isFederal ? "FEDERAL" : "UPLOADED",

        uploadedFileUrl,
        isUploaded: true,
        parsed: true,
        parsedWith: "openai-gpt-5",
        rawTextContent: rawText,
        content: parsedResume as any,

        themeId: isFederal ? "federal-clean" : "classic-left",
        themeColor: "#2563eb",
        showPhoto: !isFederal,

        firstName: parsedResume.firstName || "",
        lastName: parsedResume.lastName || "",
        jobTitle: parsedResume.jobTitle || "",

        email: parsedResume.email || "",
        phone: parsedResume.phone || "",
        address: parsedResume.address || "",

        website: parsedResume.website || "",
        linkedin: parsedResume.linkedin || "",
        gitHub: parsedResume.gitHub || "",

        summary: parsedResume.summary || "",
        skills: parsedResume.skills ?? [],
        interest: parsedResume.interests ?? [],

        techSkills: {
          create:
            parsedResume.techSkills
              ?.filter((skill) => skill.name?.trim())
              .map((skill) => ({
                name: skill.name.trim(),
                rating: Math.min(5, Math.max(1, skill.rating || 3)),
              })) ?? [],
        },

        workExperience: {
          create:
            parsedResume.workExperience?.map((job) => ({
              position: job.position || "",
              company: job.company || "",
              location: job.location || "",

              description:
                job.description || job.responsibilities || job.duties || "",

              duties: job.duties || "",
              responsibilities: job.responsibilities || "",
              accomplishments: job.accomplishments || "",

              status: job.status || "",
              grade: job.grade || "",
              clearance: job.clearance || "",

              hours: job.hours || job.hoursPerWeek || "",
              employmentType: job.employmentType || "",
              supervisor: job.supervisor || "",
              supervisorPhone: job.supervisorPhone || "",
              mayContactSupervisor: job.mayContactSupervisor || "",

              startDate: parseResumeDate(job.startDate),
              endDate: parseResumeDate(job.endDate),
            })) ?? [],
        },

        education: {
          create:
            parsedResume.education?.map((education) => ({
              school: education.school || "",
              degree: education.degree || "",
              location: education.location || "",
              startDate: parseResumeDate(education.startDate),
              endDate: parseResumeDate(education.endDate),
            })) ?? [],
        },

        certifications: {
          create:
            parsedResume.certifications?.map((certification) => ({
              name: certification.name || "",
              issuer: certification.issuer || "",
              issuedDate: parseResumeDate(certification.issuedDate),
              expiresDate: parseResumeDate(certification.expiresDate),
              credentialUrl: certification.credentialUrl || "",
              description: certification.description || "",
            })) ?? [],
        },

        projects: {
          create:
            parsedResume.projects?.map((project) => ({
              name: project.name || "",
              role: project.role || "",
              description: project.description || "",
              technologies: project.technologies ?? [],
              url: project.url || "",
            })) ?? [],
        },

        accomplishments: {
          create:
            parsedResume.accomplishments?.map((item) => ({
              title: item.title || "Accomplishment",
              organization: item.organization || "",
              date: parseResumeDate(item.date),
              description: item.description || "",
              impact: item.impact || "",
            })) ?? [],
        },
      },
    });

    await tx.uploadedDocument.update({
      where: {
        id: uploadId,
      },
      data: {
        resumeId: resume.id,
        parseStatus: "COMPLETED",
        progress: 100,
        currentStep: "Resume ready",
        parseError: null,
      },
    });

    return resume;
  });
}
