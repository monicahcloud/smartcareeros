"use client";

import { ResumeFormState } from "../[id]/types";

type ResumePreviewProps = {
  form: ResumeFormState;
};

export default function ResumePreview({ form }: ResumePreviewProps) {
  return (
    <section className="border border-slate-200 bg-white p-8 shadow-sm">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        Live Preview
      </p>

      <div className="min-h-[720px] border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-3xl font-black uppercase tracking-tight text-black">
          {form.firstName || "First"} {form.lastName || "Last"}
        </h2>

        <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">
          {form.jobTitle || "Target Job Title"}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          {[form.email, form.phone, form.address].filter(Boolean).join(" • ")}
        </p>

        <PreviewText title="Professional Summary">
          {form.summary || "Your professional summary will appear here."}
        </PreviewText>

        <PreviewTags
          title="Skills"
          items={form.skills}
          empty="Skills will appear here."
        />

        <PreviewTags
          title="Technical Skills"
          items={form.techSkills}
          empty="Technical skills will appear here."
        />

        <PreviewList
          title="Work Experience"
          empty="Experience will appear here.">
          {form.workExperience.map((exp, index) => (
            <div key={index}>
              <h3 className="font-black">{exp.position}</h3>

              <p className="text-sm text-slate-500">
                {[exp.company, exp.location].filter(Boolean).join(" • ")}
              </p>

              <p className="text-xs text-slate-400">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>

              {exp.description && (
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </PreviewList>

        <PreviewList title="Education" empty="Education will appear here.">
          {form.education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-black">{edu.degree}</h3>

              <p className="text-sm text-slate-500">{edu.school}</p>

              <p className="text-xs text-slate-400">
                {edu.startDate} - {edu.endDate || "Present"}
              </p>

              {edu.location && (
                <p className="text-sm text-slate-500">{edu.location}</p>
              )}
            </div>
          ))}
        </PreviewList>

        <PreviewList
          title="Certifications"
          empty="Certifications will appear here.">
          {form.certifications.map((cert, index) => (
            <div key={index}>
              <h3 className="font-black">{cert.name}</h3>

              {cert.issuer && (
                <p className="text-sm text-slate-500">{cert.issuer}</p>
              )}

              <p className="text-xs text-slate-400">
                {cert.issuedDate}
                {cert.expiresDate ? ` - ${cert.expiresDate}` : ""}
              </p>

              {cert.credentialUrl && (
                <p className="mt-1 text-xs text-red-600">
                  {cert.credentialUrl}
                </p>
              )}

              {cert.description && (
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {cert.description}
                </p>
              )}
            </div>
          ))}
        </PreviewList>

        <PreviewList title="Projects" empty="Projects will appear here.">
          {form.projects.map((project, index) => (
            <div key={index}>
              <h3 className="font-black">{project.name}</h3>

              {project.role && (
                <p className="text-sm text-slate-500">{project.role}</p>
              )}

              {project.description && (
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {project.description}
                </p>
              )}

              {project.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.url && (
                <p className="mt-2 text-xs text-red-600">{project.url}</p>
              )}
            </div>
          ))}
        </PreviewList>

        <PreviewList
          title="Accomplishments"
          empty="Accomplishments will appear here.">
          {form.accomplishments.map((item, index) => (
            <div key={index}>
              <h3 className="font-black">{item.title}</h3>

              {item.organization && (
                <p className="text-sm text-slate-500">{item.organization}</p>
              )}

              {item.date && (
                <p className="text-xs text-slate-400">{item.date}</p>
              )}

              {item.description && (
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {item.description}
                </p>
              )}

              {item.impact && (
                <p className="mt-2 text-sm font-bold text-slate-700">
                  Impact: {item.impact}
                </p>
              )}
            </div>
          ))}
        </PreviewList>
      </div>
    </section>
  );
}

function PreviewText({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
        {title}
      </p>

      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
        {children}
      </p>
    </div>
  );
}

function PreviewTags({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <div className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">{empty}</p>
        ) : (
          items.map((item) => (
            <span
              key={item}
              className="border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function PreviewList({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : Boolean(children);

  return (
    <div className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
        {title}
      </p>

      <div className="mt-4 space-y-6">
        {hasChildren ? (
          children
        ) : (
          <p className="text-sm text-slate-500">{empty}</p>
        )}
      </div>
    </div>
  );
}
