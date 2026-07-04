import Image from "next/image";
import { ResumeData } from "./types";

type ClassicLeftResumeLayoutProps = {
  data?: ResumeData;
};

export default function ClassicLeftResumeLayout({
  data = {},
}: ClassicLeftResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#2563eb";

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
    <div className="mx-auto flex min-h-[1123px] w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      <aside
        className="w-[32%] px-6 py-8 text-white"
        style={{ backgroundColor: themeColor }}>
        {showPhoto && (
          <div className="mb-6 flex justify-center">
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={112}
              height={112}
              className="h-36 w-36 rounded-full border-4 border-white object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              {data.jobTitle}
            </p>
          )}
        </div>

        <section className="mb-8">
          <SidebarTitle>Contact</SidebarTitle>
          <ContactList data={data} />
        </section>

        {skills.length > 0 && (
          <section className="mb-8">
            <SidebarTitle>Skills</SidebarTitle>

            <ul className="space-y-2 text-sm text-white/90">
              {skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}

        {techSkills.length > 0 && (
          <section className="mb-8">
            <SidebarTitle>Technical Skills</SidebarTitle>

            <div className="space-y-3">
              {techSkills.map((skill, index) => (
                <SkillMeter
                  key={`${getTechSkillName(skill)}-${index}`}
                  name={getTechSkillName(skill)}
                  rating={getTechSkillRating(skill)}
                />
              ))}
            </div>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <SidebarTitle>Interests</SidebarTitle>

            <p className="text-sm leading-6 text-white/90">
              {interests.join(" • ")}
            </p>
          </section>
        )}
      </aside>

      <main className="w-[68%] px-8 py-8">
        {data.summary && (
          <section className="mb-8">
            <MainTitle themeColor={themeColor}>Professional Summary</MainTitle>
            <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-8">
            <MainTitle themeColor={themeColor}>Work Experience</MainTitle>

            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {job.position || "Position Title"}
                      </h3>

                      <p className="text-sm font-medium text-slate-700">
                        {job.company}
                        {job.location ? ` | ${job.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
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
          <section className="mb-8">
            <MainTitle themeColor={themeColor}>Education</MainTitle>

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {edu.degree}
                      </h3>

                      <p className="text-sm font-medium text-slate-700">
                        {edu.school}
                        {edu.location ? ` | ${edu.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-8">
            <MainTitle themeColor={themeColor}>Certifications</MainTitle>

            <div className="space-y-5">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {cert.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500">
                    {[cert.issuer, cert.issuedDate, cert.expiresDate]
                      .filter(Boolean)
                      .join(" | ")}
                  </p>

                  {cert.credentialUrl && (
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {cert.credentialUrl}
                    </p>
                  )}

                  <BulletText text={cert.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-8">
            <MainTitle themeColor={themeColor}>Projects</MainTitle>

            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p className="text-sm font-medium text-slate-700">
                      {project.role}
                    </p>
                  )}

                  <BulletText text={project.description} />

                  {!!project.technologies?.length && (
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {project.technologies.join(" • ")}
                    </p>
                  )}

                  {project.url && (
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section>
            <MainTitle themeColor={themeColor}>Accomplishments</MainTitle>

            <div className="space-y-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-700">
                    {[item.organization, item.date].filter(Boolean).join(" | ")}
                  </p>

                  <BulletText text={item.description} />

                  {item.impact && (
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                      <span style={{ color: themeColor }}>Impact: </span>
                      {item.impact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ContactList({ data }: { data: ResumeData }) {
  const items = [
    data.email,
    data.phone,
    data.address,
    data.linkedin,
    data.gitHub,
    data.website,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="space-y-2 break-words text-sm text-white/90">
      {items.map((item, index) => (
        <p key={`${item}-${index}`}>{item}</p>
      ))}
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-white/50 pb-2 text-xs font-bold uppercase tracking-[0.2em]">
      {children}
    </h2>
  );
}

function MainTitle({
  children,
  themeColor,
}: {
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <h2
      className="mb-4 border-b pb-2 text-sm font-bold uppercase tracking-[0.18em]"
      style={{
        color: themeColor,
        borderColor: themeColor,
      }}>
      {children}
    </h2>
  );
}

function SkillMeter({ name, rating }: { name?: string; rating?: number }) {
  if (!name) return null;

  const percent = getSkillPercent(rating);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-sm text-white/90">{name}</p>
        <p className="text-[10px] font-bold text-white/70">{rating || 3}/5</p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${percent}%` }}
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
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
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
