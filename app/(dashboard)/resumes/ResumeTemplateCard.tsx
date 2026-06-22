"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeThemeToken } from "@/app/(dashboard)/resumes/templates/templateRegistry";
import ResumePreview from "./ResumePreview";
import { ResumeData } from "./templates/types";

const MOCK_DATA: ResumeData = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Business Analyst",

  email: "janedoe@email.com",
  phone: "123-456-7890",
  address: "New York, NY",
  linkedin: "linkedin.com/in/janedoe",
  github: "github.com/janedoe",
  website: "janedoe.dev",

  photoUrl: "/images/jobseeker.jpg",

  summary:
    "Results-driven professional with experience in analytics, reporting, dashboard development, and process improvement. Skilled at transforming complex data into actionable business insights.",

  skills: [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Project Management",
  ],

  techSkills: ["Excel", "SQL", "Power BI", "Tableau", "Python"],

  workExperience: [
    {
      position: "Business Analyst",
      company: "ABC Corporation",
      location: "New York, NY",
      startDate: "2022",
      endDate: "Present",
      description:
        "Created dashboards and automated reporting processes that reduced manual work by 40%. Collaborated with stakeholders to improve business operations.",
    },
    {
      position: "Data Analyst",
      company: "XYZ Company",
      location: "Boston, MA",
      startDate: "2020",
      endDate: "2022",
      description:
        "Performed data analysis and built KPI reports for executive leadership.",
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Systems",
      school: "University Example",
      location: "New York, NY",
      startDate: "2016",
      endDate: "2020",
    },
  ],

  certifications: [
    {
      name: "Microsoft Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issuedDate: "2024",
      expiresDate: "2027",
      credentialUrl: "https://learn.microsoft.com/",
      description:
        "Validated skills in Power BI data modeling and visualization.",
    },
    {
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      issuedDate: "2023",
    },
  ],

  projects: [
    {
      name: "Sales Dashboard",
      role: "Lead Analyst",
      description:
        "Built interactive dashboards providing executive visibility into sales performance.",
      technologies: ["Power BI", "SQL", "Excel"],
      url: "github.com/janedoe/sales-dashboard",
    },
    {
      name: "HR Analytics Portal",
      role: "Business Analyst",
      description:
        "Created employee retention analytics and reporting solution.",
      technologies: ["Python", "Snowflake", "Tableau"],
    },
  ],

  accomplishments: [
    {
      title: "Employee of the Year",
      organization: "ABC Corporation",
      date: "2024",
      description:
        "Recognized for outstanding contributions and process improvements.",
      impact: "Reduced reporting time by 60%",
    },
    {
      title: "Innovation Award",
      organization: "XYZ Company",
      date: "2022",
      description: "Developed automation tools that increased efficiency.",
      impact: "Saved 15 hours per week",
    },
  ],

  interests: ["Hiking", "Chess", "Volunteering", "Travel", "Photography"],
};

export default function ResumeTemplateCard({
  theme,
}: {
  theme: ResumeThemeToken;
}) {
  const router = useRouter();

  function handleSelect() {
    router.push(`/resumebuilder/editor?themeId=${theme.id}`);
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group text-left transition-transform hover:-translate-y-2">
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all group-hover:border-red-500 group-hover:shadow-2xl">
        <CardContent className="p-0">
          <div className="relative h-[420px] overflow-hidden bg-slate-100">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/30" />

            <div className="pointer-events-none absolute left-1/2 top-4 origin-top -translate-x-1/2 scale-[0.4]">
              <ResumePreview themeId={theme.layout} data={MOCK_DATA} />
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  {theme.name}
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {theme.category}
                </p>
              </div>

              <div
                className="h-5 w-5 border border-slate-200"
                style={{ backgroundColor: theme.defaultColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
