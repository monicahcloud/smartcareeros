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
  const themeColor = data.themeColor || "#8A6A1F";
  const softThemeBg = `${themeColor}18`;

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-[#f7f3ea] px-10 py-10 font-serif text-slate-950 shadow-sm print:shadow-none">
      <header
        className="grid grid-cols-[240px_1fr] gap-8 border-b-[6px] pb-8"
        style={{ borderColor: themeColor }}>
        <ProfilePhoto
          showPhoto={showPhoto}
          photoSrc={photoSrc}
          fullName={fullName}
          firstName={data.firstName}
          lastName={data.lastName}
          themeColor={themeColor}
        />

        <div className="flex flex-col justify-center">
          <p
            className="mb-3 text-xs font-black uppercase tracking-[0.35em]"
            style={{ color: themeColor }}>
            Resume
          </p>

          <h1 className="text-5xl font-black leading-none tracking-tight">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p
              className="mt-4 text-xl font-black uppercase tracking-[0.12em]"
              style={{ color: themeColor }}>
              {data.jobTitle}
            </p>
          )}

          <ContactBlock data={data} />
        </div>
      </header>

      <main className="mt-8 grid grid-cols-[250px_1fr] gap-10">
        <aside>
          {data.summary && (
            <Panel title="About Me" themeColor={themeColor}>
              <p className="text-[13px] leading-6 text-slate-700">
                {data.summary}
              </p>
            </Panel>
          )}

          {skills.length > 0 && (
            <Panel title="Skills" themeColor={themeColor}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full px-3 py-1 text-[11px] font-bold"
                    style={{
                      backgroundColor: softThemeBg,
                      color: themeColor,
                    }}>
                    {skill}
                  </span>
                ))}
              </div>
            </Panel>
          )}

          {techSkills.length > 0 && (
            <Panel title="Technical Skills" themeColor={themeColor}>
              <div className="space-y-3">
                {techSkills.map((skill, index) => (
                  <TechSkillBar
                    key={`${getTechSkillName(skill)}-${index}`}
                    name={getTechSkillName(skill)}
                    rating={getTechSkillRating(skill)}
                    themeColor={themeColor}
                  />
                ))}
              </div>
            </Panel>
          )}

          {education.length > 0 && (
            <Panel title="Education" themeColor={themeColor}>
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-black">{edu.degree}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      {edu.school}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {[
                        edu.location,
                        formatDateRange(edu.startDate, edu.endDate),
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {certifications.length > 0 && (
            <Panel title="Certifications" themeColor={themeColor}>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-black">{cert.name}</h3>
                    <p className="text-[11px] text-slate-600">
                      {[cert.issuer, cert.issuedDate, cert.expiresDate]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {interests.length > 0 && (
            <Panel title="Interests" themeColor={themeColor}>
              <p className="text-xs leading-5 text-slate-700">
                {interests.join(" • ")}
              </p>
            </Panel>
          )}
        </aside>

        <section>
          {workExperience.length > 0 && (
            <Section title="Professional Experience" themeColor={themeColor}>
              <div className="space-y-7">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-base font-black uppercase">
                          {job.position || "Position Title"}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {job.company}
                          {job.location ? ` • ${job.location}` : ""}
                        </p>
                      </div>

                      <p
                        className="whitespace-nowrap text-[11px] font-black uppercase"
                        style={{ color: themeColor }}>
                        {formatDateRange(job.startDate, job.endDate)}
                      </p>
                    </div>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects" themeColor={themeColor}>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black uppercase">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {project.role}
                      </p>
                    )}

                    <BulletText text={project.description} />

                    {!!project.technologies?.length && (
                      <p
                        className="mt-2 text-[11px] font-bold"
                        style={{ color: themeColor }}>
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {accomplishments.length > 0 && (
            <Section title="Achievements" themeColor={themeColor}>
              <div className="space-y-6">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-base font-black uppercase">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {[item.organization, item.date]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>

                    <BulletText text={item.description} />

                    {item.impact && (
                      <p className="mt-2 text-xs font-bold text-slate-700">
                        <span style={{ color: themeColor }}>Key Result: </span>
                        {item.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </section>
      </main>
    </div>
  );
}

function ProfilePhoto({
  showPhoto,
  photoSrc,
  fullName,
  firstName,
  lastName,
  themeColor,
}: {
  showPhoto: boolean;
  photoSrc: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  themeColor: string;
}) {
  if (showPhoto) {
    return (
      <div
        className="h-[240px] w-[240px] overflow-hidden border-[6px] bg-white p-2"
        style={{ borderColor: `${themeColor}55` }}>
        <Image
          src={photoSrc}
          alt={fullName || "Resume photo"}
          width={240}
          height={240}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-[240px] w-[240px] items-center justify-center border-[6px] bg-white text-6xl font-black uppercase"
      style={{
        borderColor: `${themeColor}55`,
        color: themeColor,
      }}>
      {getInitials(firstName, lastName)}
    </div>
  );
}

function ContactBlock({ data }: { data: ResumeData }) {
  const contactItems = [
    data.phone,
    data.email,
    data.address,
    data.website,
    data.linkedin,
    data.gitHub,
  ].filter(Boolean);

  if (contactItems.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-700">
      {contactItems.map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </div>
  );
}

function Panel({
  title,
  children,
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mb-7">
      <h2
        className="mb-3 border-b pb-2 text-sm font-black uppercase tracking-[0.18em]"
        style={{
          color: themeColor,
          borderColor: `${themeColor}55`,
        }}>
        {title}
      </h2>

      {children}
    </section>
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
    <section className="mb-8">
      <h2
        className="mb-4 border-b pb-2 text-xl font-black uppercase tracking-[0.12em]"
        style={{
          color: themeColor,
          borderColor: `${themeColor}55`,
        }}>
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

  if (bullets.length === 0) return null;

  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] leading-6 text-slate-700">
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

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
}
function TechSkillBar({
  name,
  rating,
  themeColor,
}: {
  name?: string;
  rating?: number;
  themeColor: string;
}) {
  if (!name) return null;

  const percent = Math.min(Math.max((rating || 3) * 20, 20), 100);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold text-slate-700">{name}</p>
        <p className="text-[10px] font-bold text-slate-500">{rating || 3}/5</p>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-300">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            backgroundColor: themeColor,
          }}
        />
      </div>
    </div>
  );
}

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}
