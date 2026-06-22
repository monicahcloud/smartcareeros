"use client";

import { ResumeData } from "./types";

type LetterheadResumeLayoutProps = {
  data?: ResumeData;
};

export default function LetterheadResumeLayout({
  data = {},
}: LetterheadResumeLayoutProps) {
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
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white font-serif text-black shadow-sm print:shadow-none">
      <header className="bg-[#061b49] px-14 py-10 text-center text-white">
        <h1 className="text-6xl uppercase tracking-wide">
          {fullName || "Your Name"}
        </h1>

        <div className="mt-4 text-lg">
          {[data.address, data.email, data.phone, data.linkedin]
            .filter(Boolean)
            .join(" | ")}
        </div>
      </header>

      <main className="px-14 py-8">
        {data.jobTitle && (
          <p className="mb-8 text-center text-2xl">{data.jobTitle}</p>
        )}

        {data.summary && (
          <section className="mb-8">
            <p className="text-lg leading-6">{data.summary}</p>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section className="mb-10 bg-gray-200 p-4">
            <h2 className="mb-3 text-xl font-bold">Career Highlights</h2>

            <ul className="list-square space-y-1 pl-6 text-lg leading-6">
              {accomplishments.slice(0, 3).map((item, index) => (
                <li key={index}>
                  {item.description || item.impact || item.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(skills.length > 0 || techSkills.length > 0) && (
          <section className="mb-10">
            <BarTitle>Key Skills</BarTitle>

            <div className="mt-6 space-y-5 text-lg">
              {skills.length > 0 && (
                <div className="grid grid-cols-[180px_1fr] gap-6">
                  <h3 className="font-bold">Professional Skills</h3>
                  <p>{skills.join(" | ")}</p>
                </div>
              )}

              {techSkills.length > 0 && (
                <div className="grid grid-cols-[180px_1fr] gap-6">
                  <h3 className="font-bold">Technical Skills</h3>
                  <p>
                    {techSkills
                      .map((skill) =>
                        typeof skill === "string" ? skill : skill.name,
                      )
                      .join(" | ")}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-10">
            <BarTitle>Professional Experience</BarTitle>

            <div className="mt-6 space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <p className="text-lg">
                    <strong>
                      {job.company || "Company Name"}
                      {job.location ? `, ${job.location}` : ""}
                    </strong>
                    {" | "}
                    {job.startDate}
                    {job.endDate ? ` – ${job.endDate}` : ""}
                  </p>

                  <p className="mt-2 bg-gray-300 px-1 text-lg font-bold">
                    {job.position || "Job Title"}
                  </p>

                  <BulletText text={job.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-10">
            <BarTitle>Education</BarTitle>

            <div className="mt-6 space-y-5">
              {education.map((edu, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{edu.degree}</p>
                  <p className="text-lg">
                    {edu.school}
                    {edu.location ? ` | ${edu.location}` : ""}
                    {edu.startDate || edu.endDate
                      ? ` | ${edu.startDate || ""} – ${edu.endDate || ""}`
                      : ""}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-10">
            <BarTitle>Certifications</BarTitle>

            <div className="mt-6 space-y-4 text-lg">
              {certifications.map((cert, index) => (
                <p key={index}>
                  <strong>{cert.name}</strong>
                  {[cert.issuer, cert.issuedDate, cert.expiresDate].filter(
                    Boolean,
                  ).length > 0 &&
                    ` | ${[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" | ")}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-10">
            <BarTitle>Projects</BarTitle>

            <div className="mt-6 space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{project.name}</p>
                  {project.role && <p className="text-lg">{project.role}</p>}
                  <BulletText text={project.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <BarTitle>Interests</BarTitle>
            <p className="mt-6 text-lg">{interests.join(" | ")}</p>
          </section>
        )}
      </main>
    </div>
  );
}

function BarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="bg-[#061b49] py-1 text-center text-2xl uppercase tracking-wide text-white">
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
    <ul className="mt-2 list-disc space-y-1 pl-8 text-lg leading-6">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
