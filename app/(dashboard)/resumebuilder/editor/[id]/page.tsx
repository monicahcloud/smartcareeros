import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ResumeEditor from "./ResumeEditor";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      techSkills: true,
      workExperience: true,
      education: true,
      certifications: true,
      projects: true,
    },
  });

  if (!resume) {
    notFound();
  }

  const resumeToEdit = {
    id: resume.id,
    resumeTitle: resume.resumeTitle,
    resumeType: resume.resumeType,
    summary: resume.summary,
    jobTitle: resume.jobTitle,
    firstName: resume.firstName,
    lastName: resume.lastName,
    email: resume.email,
    phone: resume.phone,
    address: resume.address,
    skills: resume.skills || [],

    techSkills: resume.techSkills.map((skill) => ({
      id: skill.id,
      resumeId: skill.resumeId,
      name: skill.name || "",
      rating: skill.rating,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
    })),

    workExperience: resume.workExperience.map((exp) => ({
      company: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      startDate: exp.startDate ? exp.startDate.toISOString().slice(0, 10) : "",
      endDate: exp.endDate ? exp.endDate.toISOString().slice(0, 10) : "",
      description: exp.description || "",
    })),

    education: resume.education.map((edu) => ({
      school: edu.school || "",
      degree: edu.degree || "",
      location: edu.location || "",
      startDate: edu.startDate ? edu.startDate.toISOString().slice(0, 10) : "",
      endDate: edu.endDate ? edu.endDate.toISOString().slice(0, 10) : "",
    })),

    certifications: resume.certifications.map((cert) => ({
      name: cert.name || "",
      issuer: cert.issuer || "",
      issuedDate: cert.issuedDate
        ? cert.issuedDate.toISOString().slice(0, 10)
        : "",
      expiresDate: cert.expiresDate
        ? cert.expiresDate.toISOString().slice(0, 10)
        : "",
      credentialUrl: cert.credentialUrl || "",
      description: cert.description || "",
    })),

    projects: resume.projects.map((project) => ({
      name: project.name || "",
      role: project.role || "",
      description: project.description || "",
      technologies: project.technologies || [],
      url: project.url || "",
    })),

    accomplishments: [],
  };

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
