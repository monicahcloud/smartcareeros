"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type LetterheadResumeLayoutProps = {
  data?: ResumeData;
};

export default function LetterheadResumeLayout({
  data = {},
}: LetterheadResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#061b49";

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white font-serif text-slate-950 shadow-sm print:shadow-none">
      <header
        className="px-14 py-10 text-white"
        style={{ backgroundColor: themeColor }}>
        <div className="flex items-center justify-center gap-8 text-center">
          <ProfilePhoto
            showPhoto={showPhoto}
            photoSrc={photoSrc}
            fullName={fullName}
          />

          <div className="min-w-0">
            <h1 className="break-words text-5xl uppercase leading-tight tracking-wide">
              {fullName || "Your Name"}
            </h1>

            {data.jobTitle && (
              <p className="mt-3 text-xl font-semibold tracking-wide text-white/90">
                {data.jobTitle}
              </p>
            )}

            <ContactLine data={data} />
          </div>
        </div>
      </header>

      <main className="px-14 py-9">
        {data.summary && (
          <section className="mb-9">
            <p className="text-[17px] leading-7 text-slate-800">
              {data.summary}
            </p>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section
            className="mb-10 border-l-4 p-5"
            style={{
              borderColor: themeColor,
              backgroundColor: `${themeColor}10`,
            }}>
            <h2
              className="mb-3 text-xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}>
              Career Highlights
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-[16px] leading-6 text-slate-800">
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
            <BarTitle themeColor={themeColor}>Key Skills</BarTitle>

            <div className="mt-6 space-y-5 text-[16px]">
              {skills.length > 0 && (
                <SkillGroup title="Professional Skills" skills={skills} />
              )}

              {techSkills.length > 0 && (
                <SkillGroup
                  title="Technical Skills"
                  skills={techSkills.map((skill) =>
                    typeof skill === "string" ? skill : skill.name,
                  )}
                />
              )}
            </div>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-10">
            <BarTitle themeColor={themeColor}>Professional Experience</BarTitle>

            <div className="mt-6 space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <p className="text-lg font-bold">
                        {job.company || "Company Name"}
                        {job.location ? `, ${job.location}` : ""}
                      </p>

                      <p
                        className="mt-2 inline-block px-2 py-1 text-[16px] font-bold text-white"
                        style={{ backgroundColor: themeColor }}>
                        {job.position || "Job Title"}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-slate-600">
                      {formatDateRange(job.startDate, job.endDate)}
                    </p>
                  </div>

                  <BulletText text={job.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-10">
            <BarTitle themeColor={themeColor}>Education</BarTitle>

            <div className="mt-6 space-y-5">
              {education.map((edu, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{edu.degree}</p>

                  <p className="text-[16px] text-slate-700">
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
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-10">
            <BarTitle themeColor={themeColor}>Certifications</BarTitle>

            <div className="mt-6 space-y-4 text-[16px]">
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
            <BarTitle themeColor={themeColor}>Projects</BarTitle>

            <div className="mt-6 space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{project.name}</p>

                  {project.role && (
                    <p
                      className="text-[16px] font-semibold"
                      style={{ color: themeColor }}>
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-2 text-sm font-bold text-slate-600">
                      {project.technologies.join(" | ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <BarTitle themeColor={themeColor}>Interests</BarTitle>

            <p className="mt-6 text-[16px] text-slate-700">
              {interests.join(" | ")}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function ProfilePhoto({
  showPhoto,
  photoSrc,
  fullName,
}: {
  showPhoto: boolean;
  photoSrc: string;
  fullName: string;
}) {
  if (!showPhoto) return null;

  return (
    <div className="flex h-50 w-50 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white p-1">
      <Image
        src={photoSrc}
        alt={fullName || "Resume photo"}
        width={104}
        height={104}
        className="h-46 w-46 rounded-full object-cover"
      />
    </div>
  );
}

function ContactLine({ data }: { data: ResumeData }) {
  const items = [
    data.address,
    data.email,
    data.phone,
    data.website,
    data.linkedin,
    data.gitHub,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-white/90">
      {items.join(" | ")}
    </div>
  );
}

function BarTitle({
  children,
  themeColor,
}: {
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <h2
      className="py-1.5 text-center text-xl font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: themeColor }}>
      {children}
    </h2>
  );
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  const cleanSkills = skills.filter(Boolean);

  if (cleanSkills.length === 0) return null;

  return (
    <div className="grid grid-cols-[180px_1fr] gap-6">
      <h3 className="font-bold">{title}</h3>
      <p className="leading-6 text-slate-700">{cleanSkills.join(" | ")}</p>
    </div>
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
    <ul className="mt-3 list-disc space-y-1.5 pl-8 text-[16px] leading-6 text-slate-800">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getInitials(firstName?: string, lastName?: string) {
  const first = firstName?.trim()?.[0] ?? "Y";
  const last = lastName?.trim()?.[0] ?? "N";

  return `${first}${last}`.toUpperCase();
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} – ${endDate}`;

  return startDate || endDate || "";
}
