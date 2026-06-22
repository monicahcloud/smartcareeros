"use client";

import { ResumeData } from "./types";

type ExecutiveResumeLayoutProps = {
  data?: ResumeData;
};

export default function ExecutiveResumeLayout({
  data = {},
}: ExecutiveResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const contactItems = [
    data.email,
    data.phone,
    data.address,
    data.linkedin,
    data.github,
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
      <header className="border-b-4 border-slate-900 pb-6">
        <h1 className="text-5xl font-bold uppercase -tracking-normal">
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
          <SectionTitle noBorder>Executive Profile</SectionTitle>
          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Professional Experience</SectionTitle>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold uppercase text-slate-900">
                      {job.position}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs font-bold uppercase text-slate-500">
                    {job.startDate}
                    {job.endDate ? ` - ${job.endDate}` : ""}
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
          <SectionTitle>Education</SectionTitle>

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
                  {edu.startDate}
                  {edu.endDate ? ` - ${edu.endDate}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Certifications</SectionTitle>

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

                {cert.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {cert.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-10">
          <SectionTitle> Projects</SectionTitle>

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

                {project.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {project.description}
                  </p>
                )}

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
          <SectionTitle> Accomplishments</SectionTitle>

          <div className="space-y-5">
            {accomplishments.map((item, index) => (
              <div key={index}>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-slate-600">
                  {[item.organization, item.date].filter(Boolean).join(" • ")}
                </p>

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                )}

                {item.impact && (
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Impact: {item.impact}
                  </p>
                )}

                {skills.length > 0 && (
                  <section className="mt-8">
                    <SectionTitle noBorder>Core Competencies</SectionTitle>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
                      {skills.map((skill, index) => (
                        <p key={`${skill}-${index}`}>• {skill}</p>
                      ))}
                    </div>
                  </section>
                )}

                {techSkills.length > 0 && (
                  <section className="mt-8">
                    <SectionTitle noBorder>Technical Expertise</SectionTitle>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
                      {techSkills.map((skill, index) => (
                        <p key={`${String(skill)}-${index}`}>
                          • {typeof skill === "string" ? skill : skill.name}
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {interests.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Interests</SectionTitle>

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
}: {
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <h2
      className={
        noBorder
          ? "mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-900"
          : "mb-5 border-b border-slate-300 pb-2 text-sm font-black uppercase tracking-[0.25em] text-slate-900"
      }>
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
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-slate-700">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
