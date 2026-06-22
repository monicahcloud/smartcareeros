"use client";

import Image from "next/image";
import { ResumeData } from "./types";

interface ModernSidebarResumeLayoutProps {
  data?: ResumeData;
}

export default function ModernSidebarResumeLayout({
  data = {},
}: ModernSidebarResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const education = data.education ?? [];
  const workExperience = data.workExperience ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl;
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto flex min-h-[1056px] w-[850px] bg-[#1f1f1f] font-sans text-white shadow-sm print:shadow-none">
      {/* Left Sidebar */}
      <aside className="w-[32%] bg-[#53c3bd] text-[#111]">
        <div className="h-[270px] bg-[#d8d8d8]">
          {showPhoto ? (
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={280}
              height={270}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#3a3a3a] text-5xl font-black uppercase text-white">
              {data.firstName?.[0] || "Y"}
              {data.lastName?.[0] || "N"}
            </div>
          )}
        </div>

        <div className="px-7 py-8">
          <SidebarSection title="Personal">
            <SidebarRow label="Name" value={fullName || "Your Name"} />
            <SidebarRow label="Job Title" value={data.jobTitle} />
            <SidebarRow label="Address" value={data.address} />
            <SidebarRow label="Telephone" value={data.phone} />
            <SidebarRow label="E-mail" value={data.email} />
            <SidebarRow label="LinkedIn" value={data.linkedin} />
            <SidebarRow label="GitHub" value={data.github} />
            <SidebarRow label="Website" value={data.website} />
          </SidebarSection>

          {(skills.length > 0 || techSkills.length > 0) && (
            <SidebarSection title="Skills">
              <div className="space-y-3">
                {[...skills, ...techSkills].map((skill, index) => (
                  <SkillBar
                    key={`${String(skill)}-${index}`}
                    name={typeof skill === "string" ? skill : skill.name}
                    value={getSkillWidth(index)}
                  />
                ))}
              </div>
            </SidebarSection>
          )}

          {interests.length > 0 && (
            <SidebarSection title="Interests">
              <p className="text-sm leading-5">{interests.join(" • ")}</p>
            </SidebarSection>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[68%] px-10 py-10">
        <header className="mb-8">
          <h1 className="text-5xl font-black uppercase leading-tight tracking-wide">
            {data.firstName || "Your"}
            <br />
            <span className="text-[#53c3bd]">{data.lastName || "Name"}</span>
          </h1>

          {data.jobTitle && (
            <div className="mt-4 bg-[#53c3bd] px-3 py-2 text-lg font-bold uppercase tracking-wide text-[#111]">
              {data.jobTitle}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
          </div>
        </header>

        {data.summary && (
          <MainSection title="Letter to Employer">
            <p className="text-sm leading-7 text-slate-200">{data.summary}</p>
          </MainSection>
        )}

        {workExperience.length > 0 && (
          <MainSection title="Work Experience">
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="grid grid-cols-[110px_1fr] gap-6">
                    <p className="text-sm font-bold text-white">
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ""}
                    </p>

                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {job.position}
                      </h3>

                      <p className="text-sm font-semibold text-[#53c3bd]">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>

                      <BulletText text={job.description} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education">
            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={index} className="grid grid-cols-[110px_1fr] gap-6">
                  <p className="text-sm font-bold text-white">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {edu.school}
                    </h3>

                    <p className="text-sm leading-6 text-slate-300">
                      {edu.degree}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {certifications.length > 0 && (
          <MainSection title="Certifications">
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-white">
                    {cert.name}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects">
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-white">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p className="text-sm font-semibold text-[#53c3bd]">
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {accomplishments.length > 0 && (
          <MainSection title="Accomplishments">
            <div className="space-y-4">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {[item.organization, item.date].filter(Boolean).join(" • ")}
                  </p>

                  {item.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  )}

                  {item.impact && (
                    <p className="mt-1 text-sm font-bold text-[#53c3bd]">
                      Impact: {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </main>
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-5 border-b-4 border-[#1f1f1f] pb-2 text-xl font-black uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SidebarRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="border-b border-black/20 py-2 text-right">
      <p className="text-xs font-black">{label}</p>
      <p className="break-words text-sm">{value}</p>
    </div>
  );
}

function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-5 text-2xl font-black uppercase tracking-wide text-[#53c3bd]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillBar({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-1 text-sm">{name}</p>
      <div className="h-2 w-full bg-black/35">
        <div className="h-full bg-[#1f1f1f]" style={{ width: `${value}%` }} />
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
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-300">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getSkillWidth(index: number) {
  const widths = [95, 90, 75, 88, 100, 82, 70, 92];
  return widths[index % widths.length];
}
