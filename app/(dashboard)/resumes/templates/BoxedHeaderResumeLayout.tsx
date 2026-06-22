"use client";

import { ResumeData } from "./types";

type BoxedHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function BoxedHeaderResumeLayout({
  data = {},
}: BoxedHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  return (
    <div className="mx-auto grid min-h-[1056px] w-[850px] grid-cols-[1fr_300px] bg-white font-sans text-slate-950 shadow-sm print:shadow-none">
      {/* LEFT SIDE */}
      <main className="px-12 py-10">
        <header className="-mx-12 -mt-10 mb-8 bg-[#2f7fbd] px-12 py-10 text-white">
          <h1 className="text-3xl font-black uppercase leading-tight tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-xl font-black uppercase">{data.jobTitle}</p>
          )}
        </header>

        {data.summary && (
          <Section title="Profile">
            <p className="text-sm font-semibold leading-6 text-black">
              {data.summary}
            </p>
          </Section>
        )}

        {workExperience.length > 0 && (
          <Section title="Career">
            <div className="space-y-7">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-sm font-black uppercase">
                        {job.position || "Job Title"}
                      </h3>

                      <p className="text-sm font-semibold">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-black">
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ""}
                    </p>
                  </div>

                  <BulletText text={job.description} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_120px] gap-4 text-sm">
                  <div>
                    <h3 className="font-black">{edu.degree}</h3>
                    <p className="font-semibold">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>

                  <p className="text-right text-xs font-black">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* CERTIFICATIONS REPLACES PROJECTS */}
        {certifications.length > 0 && (
          <Section title="Certifications">
            <div className="space-y-5">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-sm font-black uppercase">{cert.name}</h3>
                  <p className="text-xs font-semibold">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                  {cert.description && (
                    <p className="mt-2 text-xs font-semibold leading-5">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      {/* RIGHT SIDE */}
      <aside className="grid grid-rows-[150px_1fr]">
        {/* TOP RIGHT WHITE BOX */}
        <div className="bg-white px-8 py-7 text-slate-950">
          <div className="mb-3 border-l-[16px] border-[#2f7fbd] pl-3">
            <p className="text-xl font-black uppercase tracking-[0.25em] text-[#2f7fbd]">
              Contact
            </p>
          </div>

          <div className="space-y-1 text-smfont-semibold leading-4">
            {data.address && <p>{data.address}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.email && <p>{data.email}</p>}
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.github && <p>{data.github}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </div>

        {/* BLUE SIDEBAR */}
        <div className="bg-[#2f7fbd] px-9 py-9 text-white">
          {(skills.length > 0 || techSkills.length > 0) && (
            <SideSection title="Professional Skills">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[...skills, ...techSkills].map((skill, index) => (
                  <SkillMeter
                    key={`${String(skill)}-${index}`}
                    name={typeof skill === "string" ? skill : skill.name}
                    value={getSkillWidth(index)}
                  />
                ))}
              </div>
            </SideSection>
          )}

          {accomplishments.length > 0 && (
            <SideSection title="Awards">
              <div className="space-y-4 text-xs leading-5">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-black">{item.title}</h3>
                    {item.impact && <p>{item.impact}</p>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {/* PROJECTS REPLACES REFERENCES */}
          {projects.length > 0 && (
            <SideSection title="Projects">
              <div className="space-y-4 text-xs leading-5">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-black">{project.name}</h3>
                    {project.role && <p>{project.role}</p>}
                    <BulletText text={project.description} />
                    {!!project.technologies?.length && (
                      <p className="mt-1 font-semibold">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-4 text-xl font-black uppercase tracking-[0.12em]">
        {title}
      </h2>
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
      <h2 className="mb-4 text-xl font-light uppercase tracking-wide">
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
      <p className="mb-1 text-[10px] font-semibold">{name}</p>
      <div className="h-2 w-full rounded-full border border-white">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${value}%` }}
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
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-semibold leading-6">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getSkillWidth(index: number) {
  const widths = [85, 78, 72, 90, 80, 74, 88, 70];
  return widths[index % widths.length];
}
