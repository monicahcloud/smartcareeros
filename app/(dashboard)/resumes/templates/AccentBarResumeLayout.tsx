"use client";

import { ResumeData } from "./types";

type AccentBarResumeLayoutProps = {
  data?: ResumeData;
};

export default function AccentBarResumeLayout({
  data = {},
}: AccentBarResumeLayoutProps) {
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
    <div className="mx-auto flex min-h-[1056px] w-[850px] bg-white shadow-sm print:shadow-none">
      <div className="w-6 bg-blue-700" />

      <div className="flex-1 px-12 py-10 text-slate-900">
        <header className="border-b border-slate-300 pb-8">
          <h1 className="text-5xl font-bold">{fullName || "Your Name"}</h1>

          {data.jobTitle && (
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">
              {data.jobTitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.address && <span>{data.address}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.github && <span>{data.github}</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        </header>

        {data.summary && (
          <Section title="Professional Summary">
            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </Section>
        )}

        {(skills.length > 0 || techSkills.length > 0) && (
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
              {skills.map((skill, index) => (
                <p key={`skill-${index}`}>• {skill}</p>
              ))}

              {techSkills.map((skill, index) => (
                <p key={`tech-${index}`}>
                  • {typeof skill === "string" ? skill : skill.name}
                </p>
              ))}
            </div>
          </Section>
        )}

        {workExperience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {job.position}
                      </h3>

                      <p className="text-sm font-medium text-slate-600">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
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
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs text-slate-500">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <div className="space-y-5">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {cert.name}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.credentialUrl && (
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {cert.credentialUrl}
                    </p>
                  )}

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
          <Section title="Projects">
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p className="text-sm font-medium text-slate-600">
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-2 text-xs font-semibold text-slate-500">
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
          </Section>
        )}

        {accomplishments.length > 0 && (
          <Section title="Accomplishments">
            <div className="space-y-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {[item.organization, item.date].filter(Boolean).join(" • ")}
                  </p>

                  <BulletText text={item.description} />

                  {item.impact && (
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      Impact: {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {interests.length > 0 && (
          <Section title="Interests">
            <p className="text-sm leading-6 text-slate-700">
              {interests.join(" • ")}
            </p>
          </Section>
        )}
      </div>
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
    <section className="mt-10">
      <h2 className="mb-5 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-blue-700">
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

  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-slate-700">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
