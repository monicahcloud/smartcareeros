import { ResumeThemeToken } from "./templateRegistry";

type WorkExperience = {
  id?: string;
  position?: string | null;
  company?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
};

type Education = {
  id?: string;
  school?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

type Skill = {
  id?: string;
  name?: string | null;
};

export type ResumeTemplateData = {
  firstName?: string | null;
  lastName?: string | null;
  jobTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  summary?: string | null;
  workExperience?: WorkExperience[];
  education?: Education[];
  techSkills?: Skill[];
};

type Props = {
  resume: ResumeTemplateData;
  theme: ResumeThemeToken;
};

const fontMap = {
  professional: "font-sans",
  traditional: "font-serif",
  modern: "font-sans",
};

export default function ResumeTemplateRenderer({ resume, theme }: Props) {
  const fullName = `${resume.firstName ?? ""} ${resume.lastName ?? ""}`.trim();

  return (
    <article
      className={`mx-auto min-h-[1123px] w-[794px] bg-white p-12 text-slate-900 ${fontMap[theme.fontId]}`}>
      <header
        className={[
          "mb-8",
          theme.headerAlign === "center" && "text-center",
          theme.headerAlign === "right" && "text-right",
        ]
          .filter(Boolean)
          .join(" ")}>
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {fullName || "Your Name"}
        </h1>

        {resume.jobTitle && (
          <p
            style={{ color: theme.defaultColor }}
            className="mt-2 text-sm font-bold uppercase tracking-[0.2em]">
            {resume.jobTitle}
          </p>
        )}

        <div className="mt-4 text-xs font-medium text-slate-500">
          {[resume.email, resume.phone, resume.address]
            .filter(Boolean)
            .join(" • ")}
        </div>

        {theme.showDivider && (
          <div
            className="mt-5 h-[2px] w-full"
            style={{ backgroundColor: theme.defaultColor }}
          />
        )}
      </header>

      {resume.summary && (
        <section className="mb-7">
          <SectionTitle color={theme.defaultColor}>
            Professional Summary
          </SectionTitle>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {resume.summary}
          </p>
        </section>
      )}

      {!!resume.workExperience?.length && (
        <section className="mb-7">
          <SectionTitle color={theme.defaultColor}>Experience</SectionTitle>

          <div className="mt-4 space-y-5">
            {resume.workExperience.map((job) => (
              <div key={job.id ?? `${job.company}-${job.position}`}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-black uppercase text-black">
                      {job.position}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {job.company}
                    </p>
                  </div>

                  <p className="text-xs font-bold uppercase text-slate-400">
                    {[job.startDate, job.endDate].filter(Boolean).join(" - ")}
                  </p>
                </div>

                {job.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {!!resume.education?.length && (
        <section className="mb-7">
          <SectionTitle color={theme.defaultColor}>Education</SectionTitle>

          <div className="mt-4 space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id ?? `${edu.school}-${edu.degree}`}>
                <h3 className="text-sm font-black uppercase text-black">
                  {edu.degree}
                  {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                </h3>
                <p className="text-sm text-slate-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!resume.techSkills?.length && (
        <section>
          <SectionTitle color={theme.defaultColor}>Skills</SectionTitle>

          <div className="mt-4 flex flex-wrap gap-2">
            {resume.techSkills.map((skill) => (
              <span
                key={skill.id ?? skill.name}
                className="border border-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function SectionTitle({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <h2
      className="text-xs font-black uppercase tracking-[0.25em]"
      style={{ color }}>
      {children}
    </h2>
  );
}
