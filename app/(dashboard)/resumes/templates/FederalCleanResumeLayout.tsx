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
  const themeColor = data.themeColor || "#1d4ed8";

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-12 py-10 font-sans text-[13px] leading-snug text-slate-900 shadow-sm print:shadow-none">
      <header className="border-b-4 pb-4" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-black uppercase tracking-wide">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p
            className="mt-1 text-xl font-black uppercase tracking-wide"
            style={{ color: themeColor }}>
            {data.jobTitle}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-700">
          {[
            data.email,
            data.phone,
            data.address,
            data.linkedin,
            data.gitHub,
            data.website,
          ]
            .filter(Boolean)
            .map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
        </div>
      </header>

      <Section title="Eligibility Summary" themeColor={themeColor}>
        <InfoGrid
          items={[
            ["Citizenship", "U.S. Citizen"],
            ["Veteran's Preference", "N/A"],
            ["Federal Employment Status", "Not a current federal employee"],
            ["Highest GS Level Held", "N/A"],
            [
              "Security Clearance",
              getFirstValue(workExperience, "clearance") || "N/A",
            ],
            [
              "Specialized Experience Eligibility",
              data.summary ||
                "Meets specialized experience requirements based on relevant professional experience, technical knowledge, leadership, and measurable accomplishments.",
            ],
          ]}
        />
      </Section>

      {data.summary && (
        <Section title="Professional Summary" themeColor={themeColor}>
          <p className="text-sm leading-5 text-slate-800">{data.summary}</p>
        </Section>
      )}

      {(skills.length > 0 || techSkills.length > 0) && (
        <Section title="Core Qualifications" themeColor={themeColor}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-800">
            {[...skills, ...techSkills].map((skill, index) => (
              <p key={`${String(skill)}-${index}`}>
                • {typeof skill === "string" ? skill : skill.name}
              </p>
            ))}
          </div>
        </Section>
      )}

      {workExperience.length > 0 && (
        <Section title="Professional Experience" themeColor={themeColor}>
          <div className="space-y-7">
            {workExperience.map((job, index) => (
              <div key={index}>
                <h3 className="text-lg font-black text-slate-950">
                  {job.position || "Position Title"}
                </h3>

                <p className="mt-1 font-bold" style={{ color: themeColor }}>
                  {job.company || "Organization"}
                  {job.location ? ` | ${job.location}` : ""}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {formatDateRange(job.startDate, job.endDate)}
                </p>

                <InfoLine
                  items={[
                    ["Hours/week", job.hours || job.hoursPerWeek],
                    ["Grade", job.grade || job.status],
                    ["Series", job.grade || job.status],
                    ["Clearance", job.clearance],
                    ["Employment Type", job.employmentType],
                  ]}
                />

                <InfoLine
                  items={[
                    ["Supervisor", job.supervisor],
                    ["Supervisor Phone", job.supervisorPhone],
                    ["May Contact", job.mayContactSupervisor],
                  ]}
                />

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
        <Section title="Education" themeColor={themeColor}>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-bold text-slate-950">{edu.degree}</h3>
                <p className="text-sm text-slate-700">
                  {[
                    edu.school,
                    edu.location,
                    formatDateRange(edu.startDate, edu.endDate),
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications" themeColor={themeColor}>
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
        <Section title="Relevant Projects" themeColor={themeColor}>
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
        <Section title="Awards & Accomplishments" themeColor={themeColor}>
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
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mt-7">
      <h2
        className="mb-3 border-b-[3px] pb-1 text-xl font-black uppercase tracking-tight"
        style={{ borderColor: themeColor }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoGrid({ items }: { items: [string, string | undefined][] }) {
  return (
    <div className="space-y-1 text-sm text-slate-800">
      {items.map(([label, value], index) => (
        <p key={`${label}-${index}`}>
          <strong>{label}:</strong> {value || "N/A"}
        </p>
      ))}
    </div>
  );
}

function InfoLine({
  items,
}: {
  items: [string, string | number | undefined][];
}) {
  const validItems = items.filter(([, value]) => value);

  if (validItems.length === 0) return null;

  return (
    <p className="mt-1 text-xs text-slate-800">
      {validItems.map(([label, value], index) => (
        <span key={`${label}-${index}`}>
          {index > 0 && " | "}
          <strong>{label}:</strong> {value}
        </span>
      ))}
    </p>
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
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-800">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  return `${startDate || "Start"} - ${endDate || "Present"}`;
}

function getFirstValue(items: any[], key: string) {
  return items.find((item) => item?.[key])?.[key];
}
