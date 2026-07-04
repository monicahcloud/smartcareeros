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
  const themeColor = data.themeColor || "#25366f";

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white font-sans text-slate-950 shadow-sm print:shadow-none">
      <header
        className="px-14 py-12 text-white"
        style={{ backgroundColor: themeColor }}>
        <div className="grid grid-cols-[220px_1fr] items-center gap-10">
          <div className="flex justify-center">
            {showPhoto && (
              <div className="rounded-full border-[6px] border-white/40 p-2">
                <Image
                  src={photoSrc}
                  alt={fullName || "Resume photo"}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-5xl font-black uppercase tracking-wide">
              {fullName || "Your Name"}
            </h1>

            {data.jobTitle && (
              <p className="mt-2 text-2xl font-medium uppercase tracking-wide text-white/80">
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

      <section className="bg-[#061d2c] px-14 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 text-base font-medium">
          {data.phone && <span>{data.phone}</span>}
          {data.email && <span>{data.email}</span>}
          {data.address && <span>{data.address}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.gitHub && <span>{data.gitHub}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </section>

      <main className="grid grid-cols-[1fr_300px] gap-10 px-14 py-10">
        <section>
          {workExperience.length > 0 && (
            <MainBlock>
              <SectionTitle themeColor={themeColor}>
                Work Experience
              </SectionTitle>

              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-black text-slate-950">
                      {job.position || "Position Title"}
                    </h3>

                    <p className="text-base text-slate-800">
                      {job.company}
                      {job.location ? `, ${job.location}` : ""}
                    </p>

                    <p className="text-sm text-slate-700">
                      {formatDateRange(job.startDate, job.endDate)}
                    </p>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </MainBlock>
          )}

          {projects.length > 0 && (
            <MainBlock>
              <SectionTitle themeColor={themeColor}>Projects</SectionTitle>

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
            </MainBlock>
          )}
        </section>

        <aside className="rounded-xl bg-slate-100 px-3 py-8">
          {education.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Education</AsideTitle>

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
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </AsideBlock>
          )}

          {skills.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Skills</AsideTitle>

              <ul className="space-y-2 text-sm leading-5 text-slate-700">
                {skills.map((skill, index) => (
                  <li key={`${skill}-${index}`}>• {skill}</li>
                ))}
              </ul>
            </AsideBlock>
          )}

          {techSkills.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Technical Skills</AsideTitle>

              <div className="space-y-3">
                {techSkills.map((skill, index) => (
                  <TechSkillBar
                    key={`${getTechSkillName(skill)}-${index}`}
                    name={getTechSkillName(skill)}
                    rating={getTechSkillRating(skill)}
                    themeColor={themeColor}
                  />
                ))}
              </div>
            </AsideBlock>
          )}

          {certifications.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Certifications</AsideTitle>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-black text-slate-950">
                      {cert.name}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600">
                      {[cert.issuer, cert.issuedDate, cert.expiresDate]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>

                    {cert.description && (
                      <p className="mt-1 text-xs leading-5 text-slate-700">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </AsideBlock>
          )}

          {accomplishments.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Achievements</AsideTitle>

              <div className="space-y-4">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600">
                      {[item.organization, item.date]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>

                    {item.impact && (
                      <p className="mt-1 text-xs font-bold text-slate-800">
                        {item.impact}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-1 text-xs leading-5 text-slate-700">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </AsideBlock>
          )}

          {interests.length > 0 && (
            <AsideBlock>
              <AsideTitle themeColor={themeColor}>Interests</AsideTitle>

              <p className="text-sm leading-5 text-slate-700">
                {interests.join(" • ")}
              </p>
            </AsideBlock>
          )}
        </aside>
      </main>
    </div>
  );
}

function MainBlock({ children }: { children: React.ReactNode }) {
  return <section className="mb-10 last:mb-0">{children}</section>;
}

function AsideBlock({ children }: { children: React.ReactNode }) {
  return (
    <section className="mb-8 border-b border-slate-300 pb-3 last:mb-0 last:border-b-0 last:pb-0">
      {children}
    </section>
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
      className="mb-5 text-2xl font-black uppercase tracking-wide"
      style={{ color: themeColor }}>
      {children}
    </h2>
  );
}

function AsideTitle({
  children,
  themeColor,
}: {
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <h2
      className="mb-4 text-2xl font-black uppercase tracking-wide"
      style={{ color: themeColor }}>
      {children}
    </h2>
  );
}

function TechSkillBar({
  name,
  rating,
  themeColor,
}: {
  name?: string;
  rating?: number;
  themeColor: string;
}) {
  if (!name) return null;

  const percent = Math.min(Math.max((rating || 3) * 20, 20), 100);

  return (
    <div>
      <div className="mb-1 flex justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700">{name}</span>
        <span className="font-bold text-slate-500">{rating || 3}/5</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-300">
        <div
          className="h-full rounded-full"
          style={{ width: `${percent}%`, backgroundColor: themeColor }}
        />
      </div>
    </div>
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

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
}
