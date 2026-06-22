"use client";

import { ResumeData } from "./types";

type TwoColumnMinimalResumeLayoutProps = {
  data?: ResumeData;
};

export default function TwoColumnMinimalResumeLayout({
  data = {},
}: TwoColumnMinimalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

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
      <header className="mb-8">
        <h1 className="text-5xl font-black uppercase tracking-tight text-slate-800">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-2 text-2xl font-black text-slate-500">
            {data.jobTitle}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold text-slate-700">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && <span>{data.github}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </header>

      <div className="grid grid-cols-[1.08fr_0.88fr] gap-12">
        <main>
          <SectionTitle>Summary</SectionTitle>

          {data.summary && (
            <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
          )}

          {workExperience.length > 0 && (
            <>
              <SectionTitle>Experience</SectionTitle>

              <div className="space-y-7">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-medium text-slate-900">
                      {job.position}
                    </h3>

                    <p className="mt-1 text-sm font-black text-slate-500">
                      {job.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ""}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </>
          )}

          {education.length > 0 && (
            <>
              <SectionTitle>Education</SectionTitle>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-700">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>

                    <p className="text-xs text-slate-500">
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        <aside>
          {(skills.length > 0 || techSkills.length > 0) && (
            <section>
              <SectionTitle>Skills</SectionTitle>

              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {[...skills, ...techSkills].map((skill, index) => (
                  <span
                    key={`${String(skill)}-${index}`}
                    className="border-b border-slate-300 pb-1 text-sm font-bold text-slate-700">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {accomplishments.length > 0 && (
            <section>
              <SectionTitle>Key Achievements</SectionTitle>

              <div className="space-y-5">
                {accomplishments.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-dashed border-slate-300 pb-4">
                    <h3 className="text-base font-black text-slate-800">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.description}
                      </p>
                    )}

                    {item.impact && (
                      <p className="mt-2 text-sm font-bold text-slate-800">
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
              <SectionTitle>Training / Courses</SectionTitle>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-600">
                      {cert.name}
                    </h3>

                    {cert.issuer && (
                      <p className="text-sm font-semibold text-slate-500">
                        {cert.issuer}
                      </p>
                    )}

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
              <SectionTitle>Projects</SectionTitle>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black text-slate-800">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p className="text-sm font-semibold text-slate-500">
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
              <SectionTitle>Interests</SectionTitle>

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-8 border-b-[3px] border-slate-800 pb-1 text-2xl font-black uppercase tracking-tight text-slate-800">
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
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
