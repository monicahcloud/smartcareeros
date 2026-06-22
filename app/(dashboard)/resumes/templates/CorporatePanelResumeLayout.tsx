"use client";

import Image from "next/image";
import { ResumeData } from "./types";

interface CorporatePanelResumeLayoutProps {
  data?: ResumeData;
}

export default function CorporatePanelResumeLayout({
  data = {},
}: CorporatePanelResumeLayoutProps) {
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
    <div className="mx-auto min-h-[1056px] w-[850px] bg-[#fff3c9] px-10 py-10 font-serif text-black shadow-sm print:shadow-none">
      <section className="grid grid-cols-[1fr_1fr] gap-8">
        <div>
          {showPhoto ? (
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={300}
              height={260}
              className="h-[260px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[260px] w-full items-center justify-center bg-[#f3d98b] text-5xl font-black">
              {data.firstName?.[0] || "Y"}
              {data.lastName?.[0] || "N"}
            </div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black">About me</h2>

          {data.summary && (
            <p className="mx-auto mt-3 max-w-[280px] text-xs leading-4">
              {data.summary}
            </p>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-black">Contact</h2>
            <div className="mt-2 text-xs leading-4">
              {data.phone && <p>{data.phone}</p>}
              {data.email && <p>{data.email}</p>}
              {data.address && <p>{data.address}</p>}
              {data.website && <p>{data.website}</p>}
              {data.linkedin && <p>{data.linkedin}</p>}
              {data.github && <p>{data.github}</p>}
            </div>
          </div>
        </div>
      </section>

      <header className="mt-8 bg-[#ffe28f] px-8 py-5">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black leading-none">
              Hi, I’m {fullName || "Your Name"}
            </h1>

            {data.jobTitle && (
              <p className="mt-2 text-xl font-black">{data.jobTitle}</p>
            )}
          </div>

          <div className="text-right text-xs font-bold">
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </div>
      </header>

      <main className="px-8 py-6">
        {workExperience.length > 0 && (
          <Section title="Work experience">
            <div className="grid grid-cols-2 gap-8">
              {workExperience.slice(0, 4).map((job, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-black">{job.position}</h3>
                  <p className="text-sm font-semibold">{job.company}</p>
                  <p className="text-xs">
                    {job.startDate}
                    {job.endDate ? ` - ${job.endDate}` : ""}
                  </p>

                  <BulletText text={job.description} center />
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            <div className="grid grid-cols-2 gap-8">
              {education.slice(0, 4).map((edu, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-black">{edu.degree}</h3>
                  <p className="text-sm">{edu.school}</p>
                  <p className="text-xs">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {(skills.length > 0 || techSkills.length > 0) && (
          <div className="mt-6 grid grid-cols-2 gap-8">
            {skills.length > 0 && (
              <Section title="Skills">
                <div className="text-center text-sm leading-5">
                  {skills.map((skill, index) => (
                    <p key={`${skill}-${index}`}>{skill}</p>
                  ))}
                </div>
              </Section>
            )}

            {techSkills.length > 0 && (
              <Section title="Technical Skills">
                <div className="text-center text-sm leading-5">
                  {techSkills.map((skill, index) => (
                    <p key={`${String(skill)}-${index}`}>
                      {typeof skill === "string" ? skill : skill.name}
                    </p>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <div className="grid grid-cols-2 gap-8">
              {certifications.slice(0, 4).map((cert, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-black">{cert.name}</h3>
                  <p className="text-sm">{cert.issuer}</p>
                  <p className="text-xs">
                    {[cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" - ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            <div className="grid grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-black">{project.name}</h3>
                  {project.role && <p className="text-sm">{project.role}</p>}
                  <BulletText text={project.description} center />
                </div>
              ))}
            </div>
          </Section>
        )}

        {accomplishments.length > 0 && (
          <Section title="Achievements">
            <div className="grid grid-cols-2 gap-8">
              {accomplishments.slice(0, 4).map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-black">{item.title}</h3>
                  <p className="text-sm">{item.organization}</p>
                  {item.impact && <p className="text-xs">{item.impact}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {interests.length > 0 && (
          <Section title="Interests">
            <p className="text-center text-sm">{interests.join(" • ")}</p>
          </Section>
        )}
      </main>
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
    <section className="mt-6">
      <h2 className="mb-4 text-center text-xl font-black">{title}</h2>
      {children}
    </section>
  );
}

function BulletText({
  text,
  center = false,
}: {
  text?: string;
  center?: boolean;
}) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <ul
      className={
        center
          ? "mx-auto mt-2 max-w-[260px] list-disc space-y-1 pl-5 text-left text-xs leading-4"
          : "mt-2 list-disc space-y-1 pl-5 text-xs leading-4"
      }>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
