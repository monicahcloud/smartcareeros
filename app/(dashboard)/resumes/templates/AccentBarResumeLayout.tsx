"use client";

import { ResumeData } from "./types";

type AccentBarResumeLayoutProps = {
  data?: ResumeData;
};

export default function AccentBarResumeLayout({
  data = {},
}: AccentBarResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#2563eb";

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  return (
    <div className="mx-auto flex min-h-[1056px] w-[850px] bg-white shadow-sm print:shadow-none">
      <div className="w-6 shrink-0" style={{ backgroundColor: themeColor }} />

      <div className="flex-1 px-12 py-10 text-slate-900">
        <header className="" style={{ borderColor: `${themeColor}40` }}>
          <h1
            className="text-5xl font-black tracking-tight"
            style={{ color: themeColor }}>
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
              {data.jobTitle}
            </p>
          )}

          <ContactRow data={data} />
        </header>

        {data.summary && (
          <Section title="Professional Summary" themeColor={themeColor}>
            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </Section>
        )}

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
          {skills.length > 0 && (
            <Section title="Core Skills" themeColor={themeColor}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
                {skills.map((skill, index) => (
                  <p key={`${skill}-${index}`}>• {skill}</p>
                ))}
              </div>
            </Section>
          )}

          {techSkills.length > 0 && (
            <Section title="Technical Skills" themeColor={themeColor}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {techSkills.map((skill, index) => (
                  <TechSkillBar
                    key={`${getTechSkillName(skill)}-${index}`}
                    name={getTechSkillName(skill)}
                    rating={getTechSkillRating(skill)}
                    themeColor={themeColor}
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {workExperience.length > 0 && (
          <Section title="Experience" themeColor={themeColor}>
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-base font-black uppercase text-slate-900">
                        {job.position || "Position Title"}
                      </h3>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>
                    </div>

                    <p
                      className="whitespace-nowrap text-xs font-black"
                      style={{ color: themeColor }}>
                      {formatDateRange(job.startDate, job.endDate)}
                    </p>
                  </div>

                  <BulletText text={job.description} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" themeColor={themeColor}>
            <div className="space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>

                  <p
                    className="whitespace-nowrap text-xs font-black"
                    style={{ color: themeColor }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" themeColor={themeColor}>
            <div className="space-y-5">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-black text-slate-900">
                    {cert.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" themeColor={themeColor}>
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-black text-slate-900">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p
                      className="mt-1 text-sm font-bold"
                      style={{ color: themeColor }}>
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {accomplishments.length > 0 && (
          <Section title="Accomplishments" themeColor={themeColor}>
            <div className="space-y-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {[item.organization, item.date].filter(Boolean).join(" • ")}
                  </p>

                  <BulletText text={item.description} />

                  {item.impact && (
                    <p className="mt-2 text-sm font-bold text-slate-700">
                      <span style={{ color: themeColor }}>Impact: </span>
                      {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {interests.length > 0 && (
          <Section title="Interests" themeColor={themeColor}>
            <p className="text-sm leading-6 text-slate-700">
              {interests.join(" • ")}
            </p>
          </Section>
        )}
      </div>
    </div>
  );
}

function ContactRow({ data }: { data: ResumeData }) {
  const items = [
    data.email,
    data.phone,
    data.address,
    data.linkedin,
    data.gitHub,
    data.website,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="break-words">
          {item}
        </span>
      ))}
    </div>
  );
}

function Section({
  title,
  children,
  themeColor,
}: {
  title: string;
  children?: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mt-10">
      <h2
        className="mb-5 border-b pb-2 text-sm font-black uppercase tracking-[0.25em]"
        style={{
          color: themeColor,
          borderColor: `${themeColor}40`,
        }}>
        {title}
      </h2>

      {children}
    </section>
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

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
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
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-700">{name}</p>
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

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}
