"use client";

import Image from "next/image";
import { ResumeData } from "./types";

interface ModernSidebarResumeLayoutProps {
  data?: ResumeData;
}

export default function ModernSidebarResumeLayout({
  data = {},
}: ModernSidebarResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#53c3bd";
  const darkBg = "#1f1f1f";

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const education = data.education ?? [];
  const workExperience = data.workExperience ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div
      className="mx-auto flex min-h-[1056px] w-[850px] font-sans text-white shadow-sm print:shadow-none"
      style={{ backgroundColor: darkBg }}>
      <aside
        className="w-[32%] text-[#111]"
        style={{ backgroundColor: themeColor }}>
        <ProfilePhoto
          showPhoto={showPhoto}
          photoSrc={photoSrc}
          fullName={fullName}
          firstName={data.firstName}
          lastName={data.lastName}
          themeColor={themeColor}
        />

        <div className="px-7 py-8">
          <SidebarSection title="Personal">
            {/* <SidebarRow label="Name" value={fullName || "Your Name"} />
            <SidebarRow label="Job Title" value={data.jobTitle} /> */}
            <SidebarRow label="Address" value={data.address} />
            <SidebarRow label="Telephone" value={data.phone} />
            <SidebarRow label="Email" value={data.email} />
            <SidebarRow label="LinkedIn" value={data.linkedin} />
            <SidebarRow label="GitHub" value={data.gitHub} />
            <SidebarRow label="Website" value={data.website} />
          </SidebarSection>

          {(skills.length > 0 || techSkills.length > 0) && (
            <div className="space-y-3">
              {skills.length > 0 && (
                <SidebarSection title="Professional Skills">
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <p
                        key={`${skill}-${index}`}
                        className="text-sm font-medium text-white leading-5">
                        • {skill}
                      </p>
                    ))}
                  </div>
                </SidebarSection>
              )}

              {techSkills.length > 0 && (
                <SidebarSection title="Technical Skills">
                  <div className="space-y-3">
                    {techSkills.map((skill, index) => (
                      <SkillBar
                        key={`${getTechSkillName(skill)}-${index}`}
                        name={getTechSkillName(skill)}
                        value={getSkillPercent(skill)}
                      />
                    ))}
                  </div>
                </SidebarSection>
              )}
            </div>
          )}
          {accomplishments.length > 0 && (
            <SidebarSection title="Achievements">
              <div className="space-y-5">
                {accomplishments.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-white/20 pb-4 last:border-none last:pb-0">
                    <h3 className="text-sm font-black text-white">
                      {item.title}
                    </h3>

                    {!![item.organization, item.date].filter(Boolean)
                      .length && (
                      <p className="mt-1 text-[11px] font-semibold opacity-75">
                        {[item.organization, item.date]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-2 text-xs leading-5">
                        {item.description}
                      </p>
                    )}

                    {item.impact && (
                      <p className="mt-2 text-xs font-bold text-white">
                        {item.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}
          {interests.length > 0 && (
            <SidebarSection title="Interests">
              <p className="text-sm font-medium text-white leading-5">
                {interests.join(" • ")}
              </p>
            </SidebarSection>
          )}
        </div>
      </aside>

      <main className="w-[68%] px-10 py-10">
        <header className="mb-9">
          <p
            className="mb-3 text-xs font-black uppercase tracking-[0.35em]"
            style={{ color: themeColor }}>
            Resume
          </p>

          <h1 className="text-5xl font-black uppercase leading-tight tracking-wide">
            {data.firstName || "Your"}
            <br />
            <span style={{ color: themeColor }}>{data.lastName || "Name"}</span>
          </h1>

          {data.jobTitle && (
            <div
              className="mt-5 inline-block px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#111]"
              style={{ backgroundColor: themeColor }}>
              {data.jobTitle}
            </div>
          )}

          {/* <ContactLine data={data} /> */}
        </header>

        {data.summary && (
          <MainSection title="Professional Summary" themeColor={themeColor}>
            <p className="text-sm leading-7 text-slate-200">{data.summary}</p>
          </MainSection>
        )}

        {workExperience.length > 0 && (
          <MainSection title="Work Experience" themeColor={themeColor}>
            <div className="space-y-7">
              {workExperience.map((job, index) => (
                <TimelineItem
                  key={index}
                  date={formatDateRange(job.startDate, job.endDate)}>
                  <h3 className="text-lg font-bold text-white">
                    {job.position || "Position Title"}
                  </h3>

                  <p
                    className="text-md font-semibold"
                    style={{ color: themeColor }}>
                    {job.company}
                    {job.location ? ` • ${job.location}` : ""}
                  </p>

                  <BulletText text={job.description} />
                </TimelineItem>
              ))}
            </div>
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" themeColor={themeColor}>
            <div className="space-y-5">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  date={formatDateRange(edu.startDate, edu.endDate)}>
                  <h3 className="text-base font-bold text-white">
                    {edu.school}
                  </h3>

                  <p className="text-sm leading-6 text-slate-300">
                    {edu.degree}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>
                </TimelineItem>
              ))}
            </div>
          </MainSection>
        )}

        {certifications.length > 0 && (
          <MainSection title="Certifications" themeColor={themeColor}>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-white">
                    {cert.name}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  {cert.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {cert.description}
                    </p>
                  )}
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
                  <h3 className="text-base font-bold text-white">
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
                    <p className="mt-2 text-xs font-bold text-slate-400">
                      {project.technologies.join(" • ")}
                    </p>
                  )}

                  {project.url && (
                    <p className="mt-1 break-all text-xs text-slate-500">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* {accomplishments.length > 0 && (
          <MainSection title="Accomplishments" themeColor={themeColor}>
            <div className="space-y-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300">
                    {[item.organization, item.date].filter(Boolean).join(" • ")}
                  </p>

                  {item.description && (
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  )}

                  {item.impact && (
                    <p
                      className="mt-2 text-sm font-bold"
                      style={{ color: themeColor }}>
                      Impact: {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )} */}
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
      <div className="h-[270px] bg-black/20">
        <Image
          src={photoSrc}
          alt={fullName || "Resume photo"}
          width={280}
          height={270}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[270px] w-full items-center justify-center bg-black/20 text-6xl font-black uppercase text-white">
      {getInitials(firstName, lastName)}
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2 className="mb-5 border-b-4 border-white/70 pb-2 text-xl text-white font-black uppercase tracking-wide">
        {title}
      </h2>

      {children}
    </section>
  );
}

function SidebarRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="border-b border-white/20 py-2 text-right">
      <p className="text-sm font-black text-white uppercase tracking-wide">
        {label}
      </p>
      <p className="break-words text-sm font-medium text-white">{value}</p>
    </div>
  );
}

// function ContactLine({ data }: { data: ResumeData }) {
//   const items = [data.linkedin, data.email, data.phone, data.website].filter(
//     Boolean,
//   );

//   if (items.length === 0) return null;

//   return (
//     <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
//       {items.map((item, index) => (
//         <span key={`${item}-${index}`}>{item}</span>
//       ))}
//     </div>
//   );
// }

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
    <section className="mb-9">
      <div className="mb-5 flex items-center gap-4">
        <h2
          className="text-2xl font-black uppercase tracking-wide"
          style={{ color: themeColor }}>
          {title}
        </h2>

        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${themeColor}70` }}
        />
      </div>

      {children}
    </section>
  );
}

function TimelineItem({
  date,
  children,
}: {
  date?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[115px_1fr] gap-6">
      <p className="text-sm font-bold text-white">{date}</p>
      <div>{children}</div>
    </div>
  );
}

function SkillBar({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-1 text-sm text-white font-medium">{name}</p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-[#ffffff]"
          style={{ width: `${value}%` }}
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
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-300">
      {bullets.map((bullet, index) => (
        <li key={index} className="text-white">
          {bullet}
        </li>
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

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getSkillPercent(skill: string | { rating?: number }) {
  const rating = typeof skill === "string" ? 3 : skill.rating || 3;

  return rating * 20;
}
