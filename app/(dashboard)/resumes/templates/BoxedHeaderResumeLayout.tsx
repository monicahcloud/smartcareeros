"use client";

import { ResumeData } from "./types";

type BoxedHeaderResumeLayoutProps = {
  data?: ResumeData;
};
type SkillDisplayItem = {
  name: string;
  rating?: number;
  kind: "skill" | "techSkill";
};

function normalizeSkills(
  skills: string[] = [],
  techSkills: { name?: string; rating?: number }[] = [],
): SkillDisplayItem[] {
  return [
    ...skills.filter(Boolean).map((skill) => ({
      name: skill,
      kind: "skill" as const,
    })),

    ...techSkills
      .filter((skill) => skill.name)
      .map((skill) => ({
        name: skill.name || "",
        rating: skill.rating || 3,
        kind: "techSkill" as const,
      })),
  ];
}

export default function BoxedHeaderResumeLayout({
  data = {},
}: BoxedHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#2f7fbd";

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];
  const skillItems = normalizeSkills(skills, techSkills);

  return (
    <div className="mx-auto grid min-h-[1056px] w-[850px] grid-cols-[1fr_300px] bg-white font-sans text-slate-950 shadow-sm print:shadow-none">
      <main className="px-12 py-10">
        <header
          className="-mx-12 -mt-10 mb-9 px-12 py-10 text-white"
          style={{ backgroundColor: themeColor }}>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-white/80">
            Resume
          </p>

          <h1 className="text-4xl font-black uppercase leading-tight tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-lg font-black uppercase tracking-[0.12em] text-white/90">
              {data.jobTitle}
            </p>
          )}
        </header>

        {data.summary && (
          <Section title="Profile" themeColor={themeColor}>
            <p className="text-sm font-medium leading-6 text-slate-700">
              {data.summary}
            </p>
          </Section>
        )}

        {workExperience.length > 0 && (
          <Section title="Career" themeColor={themeColor}>
            <div className="space-y-7">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-sm font-black uppercase text-slate-950">
                        {job.position || "Job Title"}
                      </h3>

                      <p className="text-sm font-semibold text-slate-700">
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
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_120px] gap-4 text-sm">
                  <div>
                    <h3 className="font-black text-slate-950">{edu.degree}</h3>
                    <p className="font-semibold text-slate-700">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>

                  <p
                    className="text-right text-xs font-black"
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
                  <h3 className="text-sm font-black uppercase text-slate-950">
                    {cert.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-600">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.description && (
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-700">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      <aside className="grid grid-rows-[auto_1fr]">
        <div className="bg-white px-8 py-8 text-slate-950">
          <div
            className="mb-4 border-l-[12px] pl-3"
            style={{ borderColor: themeColor }}>
            <p
              className="text-xl font-black uppercase tracking-[0.22em]"
              style={{ color: themeColor }}>
              Contact
            </p>
          </div>

          <ContactList data={data} />
        </div>

        <div
          className="px-9 py-9 text-white"
          style={{ backgroundColor: themeColor }}>
          {skills.length > 0 && (
            <SideSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </SideSection>
          )}

          {techSkills.length > 0 && (
            <SideSection title="Technical Skills">
              <div className="space-y-3">
                {techSkills.map((skill, index) => (
                  <SkillMeter
                    key={`${skill.name}-${index}`}
                    name={skill.name}
                    value={getSkillPercent(skill.rating)}
                  />
                ))}
              </div>
            </SideSection>
          )}

          {accomplishments.length > 0 && (
            <SideSection title="Accomplishments">
              <div className="space-y-4 text-xs leading-5">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-black">{item.title}</h3>
                    {item.organization && <p>{item.organization}</p>}
                    {item.date && <p>{item.date}</p>}
                    {item.impact && (
                      <p className="font-semibold">{item.impact}</p>
                    )}
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {projects.length > 0 && (
            <SideSection title="Projects">
              <div className="space-y-4 text-xs leading-5">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-black">{project.name}</h3>
                    {project.role && (
                      <p className="font-semibold">{project.role}</p>
                    )}
                    <BulletText text={project.description} compact />
                    {!!project.technologies?.length && (
                      <p className="mt-1 font-semibold">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                    <p className="font-bold">{project.url}</p>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {interests.length > 0 && (
            <SideSection title="Interests">
              <p className="text-xs leading-5">{interests.join(" • ")}</p>
            </SideSection>
          )}
        </div>
      </aside>
    </div>
  );
}

function ContactList({ data }: { data: ResumeData }) {
  const items = [
    data.address,
    data.phone,
    data.email,
    data.linkedin,
    data.gitHub,
    data.website,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="space-y-2 text-sm font-semibold leading-5 text-slate-700">
      {items.map((item, index) => (
        <p key={`${item}-${index}`} className="break-words">
          {item}
        </p>
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
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mb-9">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-xl font-black uppercase tracking-[0.12em]">
          {title}
        </h2>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${themeColor}70` }}
        />
      </div>

      {children}
    </section>
  );
}

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-4 border-b border-white/60 pb-2 text-lg font-black uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillMeter({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold leading-4">{name}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function BulletText({
  text,
  compact = false,
}: {
  text?: string;
  compact?: boolean;
}) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (bullets.length === 0) return null;

  return (
    <ul
      className={
        compact
          ? "mt-2 list-disc space-y-1 pl-4 text-xs font-medium leading-5"
          : "mt-3 list-disc space-y-1.5 pl-5 text-sm font-medium leading-6 text-slate-700"
      }>
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

function getSkillPercent(rating?: number) {
  return Math.min(Math.max((rating || 3) * 20, 20), 100);
}
