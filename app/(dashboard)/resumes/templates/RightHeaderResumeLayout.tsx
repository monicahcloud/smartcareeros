"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type RightHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function RightHeaderResumeLayout({
  data = {},
}: RightHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  // Better default color for this template
  const themeColor = data.themeColor || "#2f5d50";

  // Neutral background that works with any theme color
  const neutralBg = "#f5f1ea";

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div
      className="mx-auto grid min-h-[1056px] w-[850px] grid-cols-[1fr_300px] font-sans shadow-sm print:shadow-none"
      style={{ backgroundColor: themeColor }}>
      {/* LEFT CONTENT */}
      <main className="pt-12" style={{ backgroundColor: neutralBg }}>
        <header className="px-16 pb-8">
          <div className="flex items-center gap-8">
            <div className="min-w-0 flex-1">
              <h1
                className="break-words text-4xl font-black tracking-widest"
                style={{ color: themeColor }}>
                {fullName || "Your Name"}
              </h1>

              {data.jobTitle && (
                <p
                  className="mt-3 text-xl font-bold uppercase tracking-[0.18em]"
                  style={{ color: themeColor }}>
                  {data.jobTitle}
                </p>
              )}
            </div>
          </div>
        </header>

        {data.summary && (
          <section className="bg-white px-16 py-10">
            <p
              className="text-xl font-black leading-6 tracking-narrow"
              style={{ color: themeColor }}>
              {data.summary}
            </p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section>
            <SectionTitle themeColor={themeColor}>
              Professional Experience
            </SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3
                          className="text-xl font-black leading-5"
                          style={{ color: themeColor }}>
                          {job.position}
                        </h3>

                        <p
                          className="mt-1 text-lg font-bold italic leading-5"
                          style={{ color: themeColor }}>
                          {job.company}
                        </p>

                        {job.location && (
                          <p
                            className="text-lg font-bold italic leading-5"
                            style={{ color: themeColor }}>
                            {job.location}
                          </p>
                        )}
                      </div>

                      <p
                        className="whitespace-nowrap text-lg font-black italic"
                        style={{ color: themeColor }}>
                        {job.startDate}
                        {job.endDate ? ` - ${job.endDate}` : ""}
                      </p>
                    </div>

                    <BulletText
                      text={job.description}
                      themeColor={themeColor}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle themeColor={themeColor}>Education</SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="text-lg font-black leading-5"
                        style={{ color: themeColor }}>
                        {edu.degree}
                      </h3>

                      <p
                        className="mt-1 text-lg font-bold leading-5"
                        style={{ color: themeColor }}>
                        {edu.school}
                      </p>

                      {edu.location && (
                        <p
                          className="text-lg font-bold leading-5"
                          style={{ color: themeColor }}>
                          {edu.location}
                        </p>
                      )}
                    </div>

                    <p
                      className="whitespace-nowrap text-lg font-black"
                      style={{ color: themeColor }}>
                      {edu.endDate || edu.startDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionTitle themeColor={themeColor}>Projects</SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3
                      className="text-lg font-black"
                      style={{ color: themeColor }}>
                      {project.name}
                    </h3>

                    {project.role && (
                      <p
                        className="text-base font-bold italic"
                        style={{ color: themeColor }}>
                        {project.role}
                      </p>
                    )}

                    <BulletText
                      text={project.description}
                      themeColor={themeColor}
                    />

                    {!!project.technologies?.length && (
                      <p
                        className="mt-2 text-sm font-bold"
                        style={{ color: themeColor }}>
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="px-10 py-16 text-white">
        <div
          className="flex h-44 w-44 items-center justify-center mx-auto mb-8 rounded-full border-[6px] bg-white p-2 shadow-sm"
          style={{ borderColor: `${themeColor}33` }}>
          <Image
            src={photoSrc}
            alt={fullName || "Resume photo"}
            width={160}
            height={160}
            className="h-40 w-40 rounded-full object-cover"
          />
        </div>

        <section className="mb-10 text-xl leading-7 justify-center text-center">
          {data.address && <p>{data.address}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.email && <p>{data.email}</p>}
        </section>

        <section className="mb-14 text-xl leading-7">
          {data.linkedin && <p>{data.linkedin}</p>}
          {data.website && <p>{data.website}</p>}
          {data.gitHub && <p>{data.gitHub}</p>}
        </section>

        {skills.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">Key Skills</h2>

            <ul className="space-y-2 text-lg leading-6">
              {skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}

        {techSkills.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">Tech Skills</h2>

            <div className="space-y-5">
              {techSkills.map((skill, index) => (
                <SkillBar
                  key={`${getTechSkillName(skill)}-${index}`}
                  name={getTechSkillName(skill)}
                  value={getSkillPercent(getTechSkillRating(skill))}
                />
              ))}
            </div>
          </section>
        )}
        {certifications.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">
              Certifications
            </h2>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{cert.name}</p>
                  <p className="text-sm">
                    {[cert.issuer, cert.issuedDate].filter(Boolean).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">Highlights</h2>

            <div className="space-y-4">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{item.title}</p>
                  {item.impact && <p className="text-sm">{item.impact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <h2 className="mb-5 text-3xl font-black text-white">Interests</h2>
            <p className="text-lg leading-6">{interests.join(" • ")}</p>
          </section>
        )}
      </aside>
    </div>
  );
}

function SectionTitle({
  children,
  themeColor,
}: {
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <h2
      className="px-16 py-2 text-3xl font-black tracking-[0.08em]"
      style={{ color: themeColor }}>
      {children}
    </h2>
  );
}

function BulletText({
  text,
  themeColor,
}: {
  text?: string;
  themeColor: string;
}) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul
      className="mt-4 list-disc space-y-3 pl-6 text-lg font-bold leading-6"
      style={{ color: themeColor }}>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function SkillBar({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-2 text-lg leading-5">{name}</p>

      <div className="h-5 w-full border-2 border-white bg-white/40">
        <div className="h-full bg-white" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}

function getSkillPercent(rating?: number) {
  return Math.min(Math.max((rating || 3) * 20, 20), 100);
}
