/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ResumeData } from "./types";

type FederalCleanResumeLayoutProps = {
  data?: ResumeData;
};

export default function FederalCleanResumeLayout({
  data = {},
}: FederalCleanResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-12 py-10 font-sans text-[13px] leading-snug text-slate-900 shadow-sm print:shadow-none">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-wide">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-1 text-xl font-black text-blue-600">
            {data.jobTitle}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-700">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && <span>{data.github}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </header>

      <Section title="Eligibility Summary">
        <div className="space-y-0.5 text-sm text-slate-800">
          <p>
            <strong>Citizenship:</strong> U.S. Citizen
          </p>
          <p>
            <strong>Veteran&apos;s Preference:</strong> N/A
          </p>
          <p>
            <strong>Federal Employment Status:</strong> Not a current federal
            employee
          </p>
          <p>
            <strong>Highest GS Level Held:</strong> N/A
          </p>
          <p>
            <strong>Security Clearance:</strong>{" "}
            {getFirstValue(workExperience, "clearance") || "N/A"}
          </p>
          <p>
            <strong>Specialized Experience Eligibility:</strong>{" "}
            {data.summary ||
              "Meets specialized experience requirements based on relevant professional experience, leadership, technical knowledge, and measurable accomplishments."}
          </p>
        </div>
      </Section>

      {data.summary && (
        <Section title="Summary">
          <p className="text-sm leading-5 text-slate-800">{data.summary}</p>
        </Section>
      )}

      {(skills.length > 0 || techSkills.length > 0) && (
        <Section title="Core Qualifications">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-800">
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
          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-slate-950">
                  {job.position || "Position Title"}
                </h3>

                <p className="mt-1 font-bold text-blue-600">
                  {job.company || "Organization"}
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  {job.startDate || "Start"} - {job.endDate || "Present"}
                  {job.location ? ` | ${job.location}` : ""}
                </p>

                <p className="mt-1 text-xs text-slate-800">
                  {job.hours || job.hoursPerWeek ? (
                    <>
                      <strong>Hours/week:</strong>{" "}
                      {job.hours || job.hoursPerWeek}
                    </>
                  ) : null}
                  {job.grade || job.status ? (
                    <>
                      {" "}
                      | <strong>Grade/Series:</strong> {job.grade || job.status}
                    </>
                  ) : null}
                  {job.clearance ? (
                    <>
                      {" "}
                      | <strong>Clearance:</strong> {job.clearance}
                    </>
                  ) : null}
                  {job.employmentType ? (
                    <>
                      {" "}
                      | <strong>Employment Type:</strong> {job.employmentType}
                    </>
                  ) : null}
                </p>

                {(job.supervisor ||
                  job.supervisorPhone ||
                  job.mayContactSupervisor) && (
                  <p className="mt-1 text-xs text-slate-800">
                    <strong>Supervisor:</strong> {job.supervisor || "N/A"}
                    {job.supervisorPhone ? ` | ${job.supervisorPhone}` : ""}
                    {job.mayContactSupervisor
                      ? ` | May contact: ${job.mayContactSupervisor}`
                      : ""}
                  </p>
                )}

                <BulletText
                  text={
                    job.description || job.duties || job.responsibilities || ""
                  }
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-bold text-slate-950">{edu.degree}</h3>
                <p className="text-sm text-slate-700">
                  {edu.school}
                  {edu.location ? ` | ${edu.location}` : ""}
                  {edu.startDate || edu.endDate
                    ? ` | ${edu.startDate || ""} - ${edu.endDate || ""}`
                    : ""}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-bold">{cert.name}</h3>
                <p className="text-sm text-slate-700">
                  {[cert.issuer, cert.issuedDate, cert.expiresDate]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
                {cert.description && (
                  <p className="text-sm text-slate-700">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Relevant Projects">
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold">{project.name}</h3>
                {project.role && (
                  <p className="text-sm font-semibold text-slate-700">
                    {project.role}
                  </p>
                )}
                <BulletText text={project.description} />
                {!!project.technologies?.length && (
                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {project.technologies.join(" | ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {accomplishments.length > 0 && (
        <Section title="Awards & Accomplishments">
          <div className="space-y-3">
            {accomplishments.map((item, index) => (
              <div key={index}>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-slate-700">
                  {[item.organization, item.date].filter(Boolean).join(" | ")}
                </p>
                <BulletText text={item.description} />
                {item.impact && (
                  <p className="mt-1 text-sm font-semibold">
                    Impact: {item.impact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
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
    <section className="mt-7">
      <h2 className="mb-3 border-b-[3px] border-black pb-1 text-xl font-black uppercase tracking-tight">
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
    .filter(Boolean)
    .slice(0, 5);

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-800">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getFirstValue(items: any[], key: string) {
  return items.find((item) => item?.[key])?.[key];
}
