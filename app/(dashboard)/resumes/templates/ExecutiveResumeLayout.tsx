"use client";

import { ResumeData } from "./types";

type ExecutiveResumeLayoutProps = {
  data?: ResumeData;
};

export default function ExecutiveResumeLayout({
  data = {},
}: ExecutiveResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#dc2626";

  const contactItems = [
    data.email,
    data.phone,
    data.address,
    data.linkedin,
    data.gitHub,
    data.website,
  ].filter(Boolean);

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-14 py-12 text-slate-900 shadow-sm print:shadow-none">
      <header className="border-b-4 pb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-5xl font-bold uppercase tracking-tight">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.25em] text-slate-600">
            {data.jobTitle}
          </p>
        )}

        {contactItems.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 break-words text-sm text-slate-600">
            {contactItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <section className="mt-8">
          <SectionTitle noBorder themeColor={themeColor}>
            Executive Profile
          </SectionTitle>
          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-8">
          <SectionTitle noBorder themeColor={themeColor}>
            Core Competencies
          </SectionTitle>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
            {skills.map((skill, index) => (
              <p key={`${skill}-${index}`}>• {skill}</p>
            ))}
          </div>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>
            Professional Experience
          </SectionTitle>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold uppercase text-slate-900">
                      {job.position || "Position Title"}
                    </h3>

                    <p className="text-sm font-semibold text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs font-bold uppercase text-slate-500">
                    {formatDateRange(job.startDate, job.endDate)}
                  </p>
                </div>

                <BulletText text={job.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>Education</SectionTitle>

          <div className="space-y-5">
            {education.map((edu, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {edu.school}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>
                </div>

                <p className="whitespace-nowrap text-xs font-bold uppercase text-slate-500">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>Certifications</SectionTitle>

          <div className="space-y-5">
            {certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="text-base font-bold text-slate-900">
                  {cert.name}
                </h3>

                <p className="text-sm font-semibold text-slate-600">
                  {[cert.issuer, cert.issuedDate, cert.expiresDate]
                    .filter(Boolean)
                    .join(" • ")}
                </p>

                {cert.credentialUrl && (
                  <p className="mt-1 break-words text-xs text-slate-500">
                    {cert.credentialUrl}
                  </p>
                )}

                <BulletText text={cert.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>Projects</SectionTitle>

          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="text-base font-bold text-slate-900">
                  {project.name}
                </h3>

                {project.role && (
                  <p className="text-sm font-semibold text-slate-600">
                    {project.role}
                  </p>
                )}

                <BulletText text={project.description} />

                {!!project.technologies?.length && (
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
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

      {accomplishments.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>Accomplishments</SectionTitle>

          <div className="space-y-5">
            {accomplishments.map((item, index) => (
              <div key={index}>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-slate-600">
                  {[item.organization, item.date].filter(Boolean).join(" • ")}
                </p>

                <BulletText text={item.description} />

                {item.impact && (
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    <span style={{ color: themeColor }}>Impact: </span>
                    {item.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {techSkills.length > 0 && (
        <section className="mt-8">
          <SectionTitle noBorder themeColor={themeColor}>
            Technical Expertise
          </SectionTitle>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-700">
            {techSkills.map((skill, index) => (
              <TechSkillMeter
                key={`${getTechSkillName(skill)}-${index}`}
                name={getTechSkillName(skill)}
                rating={getTechSkillRating(skill)}
                themeColor={themeColor}
              />
            ))}
          </div>
        </section>
      )}
      {interests.length > 0 && (
        <section className="mt-10">
          <SectionTitle themeColor={themeColor}>Interests</SectionTitle>

          <p className="text-sm leading-6 text-slate-700">
            {interests.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}

function SectionTitle({
  children,
  noBorder = false,
  themeColor,
}: {
  children: React.ReactNode;
  noBorder?: boolean;
  themeColor: string;
}) {
  return (
    <h2
      className={
        noBorder
          ? "mb-4 text-sm font-black uppercase tracking-[0.25em]"
          : "mb-5 border-b pb-2 text-sm font-black uppercase tracking-[0.25em]"
      }
      style={{
        color: themeColor,
        borderColor: `${themeColor}40`,
      }}>
      {children}
    </h2>
  );
}

function TechSkillMeter({
  name,
  rating,
  themeColor,
}: {
  name?: string;
  rating?: number;
  themeColor: string;
}) {
  if (!name) return null;

  const percent = getSkillPercent(rating);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="font-semibold">{name}</p>
        <p className="text-[10px] font-bold text-slate-500">{rating || 3}/5</p>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            backgroundColor: themeColor,
          }}
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

  if (bullets.length === 0) return null;

  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-slate-700">
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

function getSkillPercent(rating?: number) {
  return Math.min(Math.max((rating || 3) * 20, 20), 100);
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
}
