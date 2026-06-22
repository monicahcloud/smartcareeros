"use client";

import { ResumeData } from "./types";

type CenterHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function CenterHeaderResumeLayout({
  data = {},
}: CenterHeaderResumeLayoutProps) {
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
      <header className="text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-red-600">
            {data.jobTitle}
          </p>
        )}

        {contactItems.length > 0 && (
          <p className="mt-4 break-words text-xs font-medium leading-5 text-slate-500">
            {contactItems.join(" • ")}
          </p>
        )}
      </header>

      {data.summary && (
        <section className="mt-8">
          <CenterTitle>Professional Summary</CenterTitle>

          <p className="text-center text-sm leading-7 text-slate-700">
            {data.summary}
          </p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-10">
          <CenterTitle>Skills</CenterTitle>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Pill key={`${skill}-${index}`}>{skill}</Pill>
            ))}
          </div>
        </section>
      )}

      {techSkills.length > 0 && (
        <section className="mt-10">
          <CenterTitle>Technical Skills</CenterTitle>

          <div className="flex flex-wrap justify-center gap-3">
            {techSkills.map((skill, index) => (
              <Pill key={`${skill}-${index}`}>
                {typeof skill === "string" ? skill : skill.name}
              </Pill>
            ))}
          </div>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Work Experience</SectionTitle>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-4">
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
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Education</SectionTitle>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {edu.school}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>
                </div>

                <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
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
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Projects</SectionTitle>

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

                {project.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {project.description}
                  </p>
                )}

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
        </section>
      )}

      {accomplishments.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Accomplishments</SectionTitle>

          <div className="space-y-5">
            {accomplishments.map((item, index) => (
              <div key={index}>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600">
                  {[item.organization, item.date].filter(Boolean).join(" • ")}
                </p>

                {item.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                )}

                {item.impact && (
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    Impact: {item.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {interests.length > 0 && (
        <section className="mt-10">
          <CenterTitle>Interests</CenterTitle>

          <p className="text-center text-sm leading-6 text-slate-700">
            {interests.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
      {children}
    </h2>
  );
}

function CenterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-800">
      {children}
    </h2>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
      {children}
    </span>
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
