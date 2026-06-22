"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type SplitHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function SplitHeaderResumeLayout({
  data = {},
}: SplitHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl;
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white font-sans text-slate-950 shadow-sm print:shadow-none">
      {/* Header */}
      <header className="bg-[#25366f] px-14 py-12 text-white">
        <div className="grid grid-cols-[220px_1fr] items-center gap-10">
          <div className="flex justify-center">
            {showPhoto ? (
              <div className="rounded-full border-[6px] border-cyan-300 p-2">
                <Image
                  src={photoSrc}
                  alt={fullName || "Resume photo"}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[6px] border-cyan-300 bg-white/10 text-4xl font-black">
                {data.firstName?.[0] || "Y"}
                {data.lastName?.[0] || "N"}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-5xl font-black uppercase tracking-wide">
              {fullName || "Your Name"}
            </h1>

            {data.jobTitle && (
              <p className="mt-2 text-2xl font-medium uppercase tracking-wide text-cyan-300">
                {data.jobTitle}
              </p>
            )}

            {data.summary && (
              <p className="mt-6 max-w-xl text-base leading-6 text-white">
                {data.summary}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Contact Bar */}
      <section className="bg-[#061d2c] px-14 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 text-base font-medium">
          {data.phone && <span>☎ {data.phone}</span>}
          {data.email && <span>✉ {data.email}</span>}
          {data.address && <span>⌖ {data.address}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && <span>{data.github}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </section>

      {/* Body */}
      <main className="grid grid-cols-[1fr_300px] gap-10 px-14 py-10">
        {/* Left Column */}
        <section>
          {workExperience.length > 0 && (
            <section>
              <SectionTitle>Work Experience</SectionTitle>

              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-black text-slate-950">
                      {job.position}
                    </h3>

                    <p className="text-base text-slate-800">
                      {job.company}
                      {job.location ? `, ${job.location}` : ""}
                    </p>

                    <p className="text-sm text-slate-700">
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ""}
                    </p>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mt-10">
              <SectionTitle>Projects</SectionTitle>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-black text-slate-950">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p className="text-sm font-semibold text-slate-700">
                        {project.role}
                      </p>
                    )}

                    <BulletText text={project.description} />

                    {!!project.technologies?.length && (
                      <p className="mt-2 text-xs font-bold text-slate-500">
                        {project.technologies.join(" • ")}
                      </p>
                    )}

                    {project.url && (
                      <p className="mt-1 break-words text-xs text-slate-500">
                        {project.url}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Right Column */}
        <aside className="rounded-xl bg-slate-100 px-7 py-8">
          {education.length > 0 && (
            <section>
              <AsideTitle>Education</AsideTitle>

              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-950">
                      {edu.degree}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-slate-800">
                      {edu.school}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>

                    <p className="text-sm text-slate-700">
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mt-10">
              <AsideTitle>Certifications</AsideTitle>

              <div className="space-y-5">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold text-slate-950">
                      {cert.name}
                      {cert.issuedDate && (
                        <span className="font-normal text-slate-500">
                          {" "}
                          ({cert.issuedDate})
                        </span>
                      )}
                    </h3>

                    {cert.issuer && (
                      <p className="text-sm text-slate-700">{cert.issuer}</p>
                    )}

                    {cert.description && (
                      <p className="mt-1 text-sm leading-5 text-slate-700">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(skills.length > 0 || techSkills.length > 0) && (
            <section className="mt-10">
              <AsideTitle>Skills</AsideTitle>

              <div className="space-y-2">
                {[...skills, ...techSkills].map((skill, index) => (
                  <p key={`${String(skill)}-${index}`} className="text-sm">
                    • {typeof skill === "string" ? skill : skill.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {accomplishments.length > 0 && (
            <section className="mt-10">
              <AsideTitle>Achievements</AsideTitle>

              <div className="space-y-5">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-950">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-1 text-sm leading-5 text-slate-700">
                        {item.description}
                      </p>
                    )}

                    {item.impact && (
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {item.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {interests.length > 0 && (
            <section className="mt-10">
              <AsideTitle>Interests</AsideTitle>

              <p className="text-sm leading-5 text-slate-700">
                {interests.join(" • ")}
              </p>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-2xl font-black uppercase tracking-wide text-blue-700">
      {children}
    </h2>
  );
}

function AsideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-2xl font-black uppercase tracking-wide text-blue-700">
      {children}
    </h2>
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-6 text-slate-900">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
