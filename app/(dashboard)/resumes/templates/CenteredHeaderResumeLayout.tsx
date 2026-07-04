"use client";

import { ResumeData } from "./types";

type CenterHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function CenterHeaderResumeLayout({
  data = {},
}: CenterHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#b7a56b";

  const contactItems = [
    data.phone,
    data.email,
    data.address,
    data.linkedin,
    data.gitHub,
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
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-12 py-10 font-sans text-slate-800 shadow-sm print:shadow-none">
      <header
        className="border px-10 py-8 text-center"
        style={{ borderColor: themeColor }}>
        <h1 className="text-5xl font-light uppercase tracking-[0.14em] text-slate-500">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.4em] text-slate-600">
            {data.jobTitle}
          </p>
        )}
      </header>

      {contactItems.length > 0 && (
        <div
          className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 border-b pb-4 text-xs text-slate-600"
          style={{ borderColor: themeColor }}>
          {contactItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      )}

      {data.summary && (
        <section className="mt-5 text-center">
          <h2
            className="mb-2 text-xs font-black uppercase tracking-[0.35em]"
            style={{ color: themeColor }}>
            Professional Summary
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-5 text-slate-600">
            {data.summary}
          </p>
        </section>
      )}

      <main className="mt-8 grid grid-cols-[230px_1fr] gap-8">
        <aside>
          {education.length > 0 && (
            <SideSection title="Education" themeColor={themeColor}>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 text-right">
                  <h3 className="text-xs font-black uppercase tracking-wide">
                    {edu.degree}
                  </h3>

                  <p className="text-xs text-slate-600">{edu.school}</p>

                  {edu.location && (
                    <p className="text-xs text-slate-500">{edu.location}</p>
                  )}

                  <p className="text-[10px] text-slate-500">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                </div>
              ))}
            </SideSection>
          )}

          {skills.length > 0 && (
            <SideSection title="Skills" themeColor={themeColor}>
              <div className="space-y-2 text-right text-xs text-slate-600">
                {skills.map((skill, index) => (
                  <p key={`${skill}-${index}`}>{skill}</p>
                ))}
              </div>
            </SideSection>
          )}

          {techSkills.length > 0 && (
            <SideSection title="Technical Skills" themeColor={themeColor}>
              <div className="space-y-3">
                {techSkills.map((skill, index) => (
                  <SkillMeter
                    key={`${getTechSkillName(skill)}-${index}`}
                    name={getTechSkillName(skill)}
                    rating={getTechSkillRating(skill)}
                    themeColor={themeColor}
                  />
                ))}
              </div>
            </SideSection>
          )}

          {certifications.length > 0 && (
            <SideSection title="Certifications" themeColor={themeColor}>
              <div className="space-y-3 text-right text-xs text-slate-600">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-bold">{cert.name}</p>
                    {cert.issuer && <p>{cert.issuer}</p>}
                    <p className="text-[10px]">
                      {[cert.issuedDate, cert.expiresDate]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {interests.length > 0 && (
            <SideSection title="Interests" themeColor={themeColor}>
              <p className="text-right text-xs leading-5 text-slate-600">
                {interests.join(" • ")}
              </p>
            </SideSection>
          )}
        </aside>

        <section>
          {workExperience.length > 0 && (
            <MainSection
              title="Professional Experience"
              themeColor={themeColor}>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wide text-slate-700">
                          {job.position || "Position Title"}
                        </h3>

                        <p className="text-xs font-semibold uppercase text-slate-600">
                          {job.company}
                          {job.location ? ` - ${job.location}` : ""}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-[10px] font-bold uppercase text-slate-500">
                        {formatDateRange(job.startDate, job.endDate)}
                      </p>
                    </div>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection title="Projects" themeColor={themeColor}>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-black uppercase tracking-wide">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p className="text-xs font-semibold text-slate-600">
                        {project.role}
                      </p>
                    )}

                    <BulletText text={project.description} />

                    {!!project.technologies?.length && (
                      <p className="mt-1 text-[10px] font-bold text-slate-500">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {accomplishments.length > 0 && (
            <MainSection title="Accomplishments" themeColor={themeColor}>
              <div className="space-y-4">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-black uppercase tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600">
                      {[item.organization, item.date]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>

                    <BulletText text={item.description} />

                    {item.impact && (
                      <p className="mt-1 text-xs font-bold text-slate-700">
                        <span style={{ color: themeColor }}>Impact: </span>
                        {item.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </MainSection>
          )}
        </section>
      </main>
    </div>
  );
}

function MainSection({
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
        className="mb-4 border-b pb-2 text-xs font-black uppercase tracking-[0.35em]"
        style={{
          color: themeColor,
          borderColor: themeColor,
        }}>
        {title}
      </h2>

      {children}
    </section>
  );
}

function SideSection({
  title,
  children,
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mb-7 border-b pb-4" style={{ borderColor: themeColor }}>
      <h2
        className="mb-3 text-right text-xs font-black uppercase tracking-[0.35em]"
        style={{ color: themeColor }}>
        {title}
      </h2>

      {children}
    </section>
  );
}

function SkillMeter({
  name,
  rating,
  themeColor,
}: {
  name?: string;
  rating?: number;
  themeColor: string;
}) {
  if (!name) return null;

  const percent = getSkillPercent(rating);

  return (
    <div className="text-right">
      <div className="mb-1 flex items-center justify-between gap-3 text-[10px]">
        <span className="font-bold text-slate-500">{rating || 3}/5</span>
        <span className="font-semibold text-slate-600">{name}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
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

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (bullets.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}

function getSkillPercent(rating?: number) {
  return Math.min(Math.max((rating || 3) * 20, 20), 100);
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
}
