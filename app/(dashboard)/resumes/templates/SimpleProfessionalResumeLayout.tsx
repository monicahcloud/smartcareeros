"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type SimpleProfessionalResumeLayoutProps = {
  data?: ResumeData;
};

export default function SimpleProfessionalResumeLayout({
  data = {},
}: SimpleProfessionalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl;
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-14 py-12 font-sans text-slate-800 shadow-sm print:shadow-none">
      <header className="grid grid-cols-[180px_1fr] gap-12">
        <div>
          {showPhoto && (
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={150}
              height={150}
              className="h-[150px] w-[150px] object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-5xl font-black uppercase leading-none tracking-[0.14em] text-[#1594a8]">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-lg font-bold text-slate-600">
              {data.jobTitle}
            </p>
          )}

          <div className="mt-8 h-1 w-full bg-slate-600" />

          <div className="mt-5 grid grid-cols-3 gap-4 text-xs text-slate-500">
            {data.address && <p>{data.address}</p>}
            <div>
              {data.phone && <p>{data.phone}</p>}
              {data.email && <p>{data.email}</p>}
            </div>
            <div>
              {data.website && <p>{data.website}</p>}
              {data.linkedin && <p>{data.linkedin}</p>}
              {data.github && <p>{data.github}</p>}
            </div>
          </div>
        </div>
      </header>

      <main className="mt-12 space-y-10">
        {data.summary && (
          <ResumeRow title="Summary">
            <p className="text-sm leading-6 text-slate-600">{data.summary}</p>
          </ResumeRow>
        )}

        {workExperience.length > 0 && (
          <ResumeRow title="Experience">
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <TimelineItem
                  key={index}
                  leftTitle={job.position}
                  leftSubtitle={`${job.startDate || ""}${
                    job.endDate ? ` - ${job.endDate}` : ""
                  }`}>
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
          <ResumeRow title="Education">
            <div className="space-y-6">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  leftTitle={edu.degree}
                  leftSubtitle={`${edu.startDate || ""}${
                    edu.endDate ? ` - ${edu.endDate}` : ""
                  }`}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ""}
                  </h3>
                </TimelineItem>
              ))}
            </div>
          </ResumeRow>
        )}

        {(skills.length > 0 || techSkills.length > 0) && (
          <div className="grid grid-cols-[1fr_1fr] gap-10">
            <ResumeRow title="Skills" compact>
              <SkillBars skills={skills} />
            </ResumeRow>

            <ResumeRow title="Technical Skills" compact>
              <SkillBars
                skills={techSkills.map((skill) =>
                  typeof skill === "string" ? skill : skill.name,
                )}
              />
            </ResumeRow>
          </div>
        )}

        {certifications.length > 0 && (
          <ResumeRow title="Certifications">
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
          <ResumeRow title="Projects">
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-semibold text-slate-700">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p className="text-sm font-semibold text-[#1594a8]">
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeRow>
        )}

        {accomplishments.length > 0 && (
          <ResumeRow title="Achievements">
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
                      Impact: {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeRow>
        )}

        {interests.length > 0 && (
          <ResumeRow title="Interests">
            <p className="text-sm leading-6 text-slate-600">
              {interests.join(" • ")}
            </p>
          </ResumeRow>
        )}
      </main>
    </div>
  );
}

function ResumeRow({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={
        compact
          ? "grid grid-cols-[150px_1fr] gap-8"
          : "grid grid-cols-[150px_1fr] gap-8"
      }>
      <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">
        {title}
      </h2>

      <div>
        <div className="mb-6 h-px w-full bg-slate-500" />
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  leftTitle,
  leftSubtitle,
  children,
}: {
  leftTitle?: string;
  leftSubtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-8">
      <div className="text-right">
        <h3 className="text-base font-black leading-5 text-[#1594a8]">
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

function SkillBars({ skills }: { skills: string[] }) {
  return (
    <div className="space-y-2">
      {skills.map((skill, index) => (
        <div
          key={`${skill}-${index}`}
          className="grid grid-cols-[90px_1fr] gap-3">
          <p className="text-xs text-slate-600">{skill}</p>
          <div className="mt-1 h-2 bg-slate-300">
            <div
              className="h-full bg-[#1594a8]"
              style={{ width: `${getSkillWidth(index)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getSkillWidth(index: number) {
  const widths = [78, 85, 74, 88, 70, 82, 76, 90];
  return widths[index % widths.length];
}
