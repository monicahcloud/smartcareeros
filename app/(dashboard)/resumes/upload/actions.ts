// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { randomUUID } from "crypto";
// import { put } from "@vercel/blob";

// import prisma from "@/lib/prisma";
// import { extractResumeText } from "@/lib/extractResumeText";
// import { parseResumeWithAI } from "../../resumebuilder/editor/sections/actions";

// export async function uploadResume(file: File, isFederal = false) {
//   const { userId: clerkId } = await auth();

//   if (!clerkId) {
//     throw new Error("Unauthorized");
//   }

//   const user = await prisma.user.findUnique({
//     where: { clerkId },
//     select: {
//       id: true,
//     },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   //-------------------------------------------------
//   // Upload Original Resume
//   //-------------------------------------------------

//   const extension = file.name.split(".").pop() || "pdf";

//   const blob = await put(
//     `uploaded-resumes/${user.id}/${randomUUID()}.${extension}`,
//     file,
//     {
//       access: "public",
//     },
//   );

//   //-------------------------------------------------
//   // Extract Resume Text
//   //-------------------------------------------------

//   const resumeText = await extractResumeText(file);

//   //-------------------------------------------------
//   // Parse With AI
//   //-------------------------------------------------

//   const parsedResume = await parseResumeWithAI(resumeText, isFederal);

//   //-------------------------------------------------
//   // Create Resume
//   //-------------------------------------------------

//   const resume = await prisma.resume.create({
//     data: {
//       userId: user.id,
//       clerkId: clerkId,

//       resumeTitle: parsedResume.resumeTitle || "Uploaded Resume",

//       resumeType: isFederal ? "FEDERAL" : "UPLOADED",

//       uploadedFileUrl: blob.url,

//       themeId: isFederal ? "federal-clean" : "classic-left",

//       themeColor: "#2563eb",

//       showPhoto: true,

//       firstName: parsedResume.firstName,
//       lastName: parsedResume.lastName,
//       jobTitle: parsedResume.jobTitle,

//       email: parsedResume.email,
//       phone: parsedResume.phone,
//       address: parsedResume.address,

//       website: parsedResume.website,
//       linkedin: parsedResume.linkedin,
//       gitHub: parsedResume.gitHub,

//       summary: parsedResume.summary,

//       skills: parsedResume.skills ?? [],

//       interest: parsedResume.interests ?? [],

//       techSkills: {
//         create:
//           parsedResume.techSkills?.map((skill: any) => ({
//             name: skill.name,
//             rating: skill.rating,
//           })) ?? [],
//       },

//       workExperience: {
//         create:
//           parsedResume.workExperience?.map((job: any) => ({
//             position: job.position || "",
//             company: job.company || "",
//             location: job.location || "",
//             description: job.description || job.responsibilities || "",
//             duties: job.duties || "",
//             responsibilities: job.responsibilities || "",
//             accomplishments: job.accomplishments || "",
//             status: job.status || "",
//             grade: job.grade || "",
//             clearance: job.clearance || "",
//             hours: job.hours || "",
//             startDate: parseDate(job.startDate),
//             endDate: parseDate(job.endDate),
//           })) ?? [],
//       },

//       education: {
//         create:
//           parsedResume.education?.map((edu: any) => ({
//             ...edu,
//           })) ?? [],
//       },

//       certifications: {
//         create:
//           parsedResume.certifications?.map((cert: any) => ({
//             ...cert,
//           })) ?? [],
//       },

//       projects: {
//         create:
//           parsedResume.projects?.map((project: any) => ({
//             ...project,
//           })) ?? [],
//       },

//       accomplishments: {
//         create:
//           parsedResume.accomplishments?.map((item: any) => ({
//             ...item,
//           })) ?? [],
//       },
//     },
//   });

//   return {
//     resumeId: resume.id,
//   };
// }

// function parseDate(value?: string) {
//   if (!value) return undefined;

//   const date = new Date(value);

//   return Number.isNaN(date.getTime()) ? undefined : date;
// }
