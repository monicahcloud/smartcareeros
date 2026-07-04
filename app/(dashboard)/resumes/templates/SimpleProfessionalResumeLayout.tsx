"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type SimpleProfessionalResumeLayoutProps = {
  data?: ResumeData;
};
type TechnicalSkill = {
  name: string;
  rating: number;
};
export default function SimpleProfessionalResumeLayout({
  data = {},
}: SimpleProfessionalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#1594a8";

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
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-14 py-12 font-sans text-slate-800 shadow-sm print:shadow-none">
      <header className="grid grid-cols-[160px_1fr] gap-10">
        <ProfilePhoto
          showPhoto={showPhoto}
          photoSrc={photoSrc}
          fullName={fullName}
          firstName={data.firstName}
          lastName={data.lastName}
          themeColor={themeColor}
        />

        <div>
          <h1
            className="text-5xl font-black uppercase leading-none tracking-[0.12em]"
            style={{ color: themeColor }}>
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className=" text-lg font-bold uppercase tracking-[0.08em] text-slate-600">
              {data.jobTitle}
            </p>
          )}

          <div
            className="mt-3 h-1 w-full"
            style={{ backgroundColor: themeColor }}
          />

          <ContactGrid data={data} />
        </div>
      </header>

      <main className="mt-12 space-y-10">
        {data.summary && (
          <ResumeRow title="Summary" themeColor={themeColor}>
            <p className="text-sm leading-6 text-slate-600">{data.summary}</p>
          </ResumeRow>
        )}

        {workExperience.length > 0 && (
          <ResumeRow title="Experience" themeColor={themeColor}>
            <div className="space-y-5">
              {workExperience.map((job, index) => (
                <TimelineItem
                  key={index}
                  leftTitle={job.position || "Position Title"}
                  leftSubtitle={formatDateRange(job.startDate, job.endDate)}
                  themeColor={themeColor}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {job.company}
                    {job.location ? `, ${job.location}` : ""}
                  </h3>

                  <BulletText text={job.description} />
                </TimelineItem>
              ))}
            </div>
          </ResumeRow>
        )}

        {education.length > 0 && (
          <ResumeRow title="Education" themeColor={themeColor}>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  leftTitle={edu.degree}
                  leftSubtitle={formatDateRange(edu.startDate, edu.endDate)}
                  themeColor={themeColor}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ""}
                  </h3>
                </TimelineItem>
              ))}
            </div>
          </ResumeRow>
        )}

        <div className="">
          {skills.length > 0 && (
            <ResumeRow title="Skills" themeColor={themeColor}>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                {skills.map((skill, index) => (
                  <p
                    key={`${skill}-${index}`}
                    className="text-sm font-medium text-slate-700">
                    • {skill}
                  </p>
                ))}
              </div>
            </ResumeRow>
          )}
        </div>

        {techSkills.length > 0 && (
          <ResumeRow title="Technical Skills" themeColor={themeColor} compact>
            <TechSkillBars skills={techSkills} themeColor={themeColor} />
          </ResumeRow>
        )}

        {certifications.length > 0 && (
          <ResumeRow title="Licenses" themeColor={themeColor}>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {cert.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.description && (
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeRow>
        )}

        {projects.length > 0 && (
          <ResumeRow title="Projects" themeColor={themeColor}>
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p
                      className="text-sm font-semibold"
                      style={{ color: themeColor }}>
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                  {project.url && (
                    <p className="mt-2 break-all text-xs text-slate-500">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeRow>
        )}

        {accomplishments.length > 0 && (
          <ResumeRow title="Achievements" themeColor={themeColor}>
            <div className="space-y-4">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {[item.organization, item.date].filter(Boolean).join(" • ")}
                  </p>

                  {item.description && (
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      {item.description}
                    </p>
                  )}

                  {item.impact && (
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      <span style={{ color: themeColor }}>Impact: </span>
                      {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeRow>
        )}

        {interests.length > 0 && (
          <ResumeRow title="Interests" themeColor={themeColor}>
            <p className="text-sm leading-6 text-slate-600">
              {interests.join(" • ")}
            </p>
          </ResumeRow>
        )}
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
        className="flex h-[150px] w-[150px] items-center justify-center border-[5px] bg-white p-1"
        style={{ borderColor: `${themeColor}40` }}>
        <Image
          src={photoSrc}
          alt={fullName || "Resume photo"}
          width={140}
          height={140}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-[150px] w-[150px] items-center justify-center border-[5px] bg-slate-50 text-5xl font-black uppercase"
      style={{
        color: themeColor,
        borderColor: `${themeColor}40`,
      }}>
      {getInitials(firstName, lastName)}
    </div>
  );
}

function ContactGrid({ data }: { data: ResumeData }) {
  const contactItems = [
    data.address,
    data.phone,
    data.email,
    data.website,
    data.linkedin,
    data.gitHub,
  ].filter(Boolean);

  if (contactItems.length === 0) return null;

  return (
    <div className="mt-2 grid grid-cols-3 gap-2 text-xs leading-5 text-slate-500">
      {contactItems.map((item, index) => (
        <p key={`${item}-${index}`} className="break-words">
          {item}
        </p>
      ))}
    </div>
  );
}

function ResumeRow({
  title,
  children,
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
  compact?: boolean;
}) {
  return (
    <section className="grid grid-cols-[150px_1fr] gap-8">
      <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">
        {title}
      </h2>

      <div>
        <div
          className="mb-3 h-px w-full"
          style={{ backgroundColor: `${themeColor}70` }}
        />
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  leftTitle,
  leftSubtitle,
  children,
  themeColor,
}: {
  leftTitle?: string;
  leftSubtitle?: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-2">
      <div className="text-left">
        <h3
          className="text-base font-black leading-5"
          style={{ color: themeColor }}>
          {leftTitle}
        </h3>

        {leftSubtitle && (
          <p className="mt-2 text-xs text-slate-500">{leftSubtitle}</p>
        )}
      </div>

      <div>{children}</div>
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
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
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

function TechSkillBars({
  skills,
  themeColor,
}: {
  skills: Array<string | TechnicalSkill>;
  themeColor: string;
}) {
  return (
    <div className="space-y-3">
      {skills.map((skill, index) => {
        const name = typeof skill === "string" ? skill : skill.name;
        const rating = typeof skill === "string" ? 3 : skill.rating || 3;

        if (!name) return null;

        return (
          <div
            key={`${name}-${index}`}
            className="grid grid-cols-[110px_1fr] gap-4">
            <p className="text-xs text-slate-700">{name}</p>

            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(rating / 5) * 100}%`,
                  backgroundColor: themeColor,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
