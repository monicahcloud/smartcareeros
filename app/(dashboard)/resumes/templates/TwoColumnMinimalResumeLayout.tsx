"use client";

import { ResumeData } from "./types";

type TwoColumnMinimalResumeLayoutProps = {
  data?: ResumeData;
};

export default function TwoColumnMinimalResumeLayout({
  data = {},
}: TwoColumnMinimalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#334155";

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const education = data.education ?? [];
  const workExperience = data.workExperience ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-12 py-10 font-sans text-slate-800 shadow-sm print:shadow-none">
      <header
        className="mb-3 border-b-4 pb-3"
        style={{ borderColor: themeColor }}>
        <h1
          className="text-5xl font-black uppercase tracking-tight"
          style={{ color: themeColor }}>
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-2 text-xl font-black uppercase tracking-[0.08em] text-slate-500">
            {data.jobTitle}
          </p>
        )}

        <ContactRow data={data} />
      </header>

      <div className="grid grid-cols-[1.12fr_0.88fr] gap-12">
        <main>
          {data.summary && (
            <>
              <SectionTitle themeColor={themeColor}>Summary</SectionTitle>
              <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
            </>
          )}

          {workExperience.length > 0 && (
            <>
              <SectionTitle themeColor={themeColor}>Experience</SectionTitle>

              <div className="space-y-7">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-black text-slate-900">
                      {job.position || "Position Title"}
                    </h3>

                    <p
                      className="mt-1 text-sm font-black"
                      style={{ color: themeColor }}>
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {formatDateRange(job.startDate, job.endDate)}
                    </p>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </>
          )}

          {education.length > 0 && (
            <>
              <SectionTitle themeColor={themeColor}>Education</SectionTitle>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm font-semibold text-slate-700">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>

                    <p className="text-xs font-semibold text-slate-500">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        <aside>
          {skills.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>Skills</SectionTitle>

              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{
                      borderColor: `${themeColor}40`,
                      color: themeColor,
                      backgroundColor: `${themeColor}10`,
                    }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {techSkills.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>
                Technical Skills
              </SectionTitle>

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
            </section>
          )}

          {accomplishments.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>
                Key Achievements
              </SectionTitle>

              <div className="space-y-5">
                {accomplishments.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-dashed border-slate-300 pb-4">
                    <h3 className="text-base font-black text-slate-800">
                      {item.title}
                    </h3>

                    <MetaLine
                      items={[item.organization, item.date].filter(Boolean)}
                    />

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.description}
                      </p>
                    )}

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

          {certifications.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>
                Certifications
              </SectionTitle>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-800">
                      {cert.name}
                    </h3>

                    <MetaLine
                      items={[
                        cert.issuer,
                        cert.issuedDate,
                        cert.expiresDate,
                      ].filter(Boolean)}
                    />

                    {cert.description && (
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>Projects</SectionTitle>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-800">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: themeColor }}>
                        {project.role}
                      </p>
                    )}

                    <BulletText text={project.description} />

                    {!!project.technologies?.length && (
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {interests.length > 0 && (
            <section>
              <SectionTitle themeColor={themeColor}>Interests</SectionTitle>

              <p className="text-sm leading-6 text-slate-700">
                {interests.join(" • ")}
              </p>
            </section>
          )}
        </aside>
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
    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold text-slate-700">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="break-words">
          {item}
        </span>
      ))}
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
      className="mb-3 mt-8 border-b-[3px] pb-1 text-xl font-black uppercase tracking-tight"
      style={{
        color: themeColor,
        borderColor: themeColor,
      }}>
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

  if (bullets.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function MetaLine({ items }: { items: Array<string | undefined | null> }) {
  const cleanItems = items.filter(Boolean) as string[];

  if (cleanItems.length === 0) return null;

  return (
    <p className="mt-1 text-xs font-semibold text-slate-500">
      {cleanItems.join(" • ")}
    </p>
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
        <p className="text-xs font-bold text-slate-700">{name}</p>
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
