"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type BoldToplineResumeLayoutProps = {
  data?: ResumeData;
};

export default function BoldToplineResumeLayout({
  data = {},
}: BoldToplineResumeLayoutProps) {
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
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white text-slate-900 shadow-sm print:shadow-none">
      <div className="ml-10 min-h-[1056px] border-l-[20px] border-[#0f4f45]">
        <div className="px-8 py-8">
          <header className="relative border-b border-[#f59e0b] pb-4">
            <div className="bg-[#f59e0b] px-6 py-5 pr-36">
              <h1 className="text-3xl font-black uppercase tracking-[0.14em] text-white">
                {fullName || "Your Name"}
              </h1>

              {data.jobTitle && (
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/90">
                  {data.jobTitle}
                </p>
              )}
            </div>

            {showPhoto && (
              <div className="absolute right-8 top-3 h-28 w-28 overflow-hidden border-4 border-white bg-slate-200 shadow-md">
                <Image
                  src={photoSrc}
                  alt={fullName || "Resume photo"}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-700">
              {data.phone && <span>☎ {data.phone}</span>}
              {data.email && <span>✉ {data.email}</span>}
              {data.address && <span>⌖ {data.address}</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
              {data.github && <span>{data.github}</span>}
              {data.website && <span>{data.website}</span>}
            </div>
          </header>

          <main className="mt-6 grid grid-cols-[190px_1fr] gap-8">
            <aside>
              {education.length > 0 && (
                <SideSection title="Education">
                  <div className="space-y-5">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-black uppercase text-slate-800">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {edu.school}
                          {edu.location ? `, ${edu.location}` : ""}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {edu.startDate}
                          {edu.endDate ? ` - ${edu.endDate}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </SideSection>
              )}

              {(skills.length > 0 || techSkills.length > 0) && (
                <SideSection title="Skills">
                  <div className="space-y-3">
                    {[...skills, ...techSkills].map((skill, index) => (
                      <SkillLine
                        key={`${String(skill)}-${index}`}
                        name={typeof skill === "string" ? skill : skill.name}
                        value={getSkillWidth(index)}
                      />
                    ))}
                  </div>
                </SideSection>
              )}

              {certifications.length > 0 && (
                <SideSection title="Certifications">
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index}>
                        <h3 className="text-xs font-black text-slate-800">
                          {cert.name}
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          {[cert.issuer, cert.issuedDate, cert.expiresDate]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </SideSection>
              )}

              {interests.length > 0 && (
                <SideSection title="Interests">
                  <p className="text-xs leading-5 text-slate-600">
                    {interests.join(" • ")}
                  </p>
                </SideSection>
              )}
            </aside>

            <section>
              {data.summary && (
                <MainSection title="About Me">
                  <p className="text-xs leading-5 text-slate-700">
                    {data.summary}
                  </p>
                </MainSection>
              )}

              {workExperience.length > 0 && (
                <MainSection title="Work Experience">
                  <div className="space-y-6">
                    {workExperience.map((job, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-black uppercase text-slate-900">
                          {job.company || "Company Name"}
                        </h3>

                        <p className="text-xs font-bold text-slate-700">
                          {job.position}
                          {job.location ? ` • ${job.location}` : ""}
                          {job.startDate || job.endDate
                            ? ` | ${job.startDate || ""}${
                                job.endDate ? ` - ${job.endDate}` : ""
                              }`
                            : ""}
                        </p>

                        <BulletText text={job.description} />
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}

              {projects.length > 0 && (
                <MainSection title="Projects">
                  <div className="space-y-5">
                    {projects.map((project, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-black uppercase text-slate-900">
                          {project.name}
                        </h3>

                        {project.role && (
                          <p className="text-xs font-bold text-slate-700">
                            {project.role}
                          </p>
                        )}

                        <BulletText text={project.description} />

                        {!!project.technologies?.length && (
                          <p className="mt-1 text-[10px] font-bold text-slate-500">
                            {project.technologies.join(" • ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}

              {accomplishments.length > 0 && (
                <MainSection title="Achievements">
                  <div className="space-y-5">
                    {accomplishments.map((item, index) => (
                      <div key={index}>
                        <h3 className="text-sm font-black uppercase text-slate-900">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-600">
                          {[item.organization, item.date]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>

                        <BulletText text={item.description} />

                        {item.impact && (
                          <p className="mt-1 text-xs font-bold text-slate-700">
                            Impact: {item.impact}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}
            </section>
          </main>
        </div>
      </div>
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
    <section className="mb-7">
      <div className="mb-3 flex items-center gap-4">
        <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-900">
          {title}
        </h2>
        <div className="h-px flex-1 bg-slate-400" />
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
    <section className="mb-7">
      <h2 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillLine({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold text-slate-700">{name}</p>
      <div className="h-1.5 w-full bg-slate-300">
        <div className="h-full bg-[#0f4f45]" style={{ width: `${value}%` }} />
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
    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-5 text-slate-600">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getSkillWidth(index: number) {
  const widths = [85, 78, 72, 88, 80, 74, 90, 76];
  return widths[index % widths.length];
}
