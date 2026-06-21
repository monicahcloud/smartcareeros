export type WorkExperienceItem = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate: string;
  credentialUrl: string;
  description: string;
};

export type ProjectItem = {
  name: string;
  role: string;
  description: string;
  technologies: string[];
  url: string;
};

export type AccomplishmentItem = {
  title: string;
  organization: string;
  date: string;
  description: string;
  impact: string;
};

export type ResumeFormState = {
  id?: string;

  resumeTitle: string;
  resumeType: string;
  description: string;

  themeId?: string;
  themeColor?: string;
  borderStyle?: string;

  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  gitHub?: string;
  github?: string;

  summary: string;
  skills: string[];
  techSkills: string[];
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  accomplishments: AccomplishmentItem[];
  interests: string[];

  photo?: File | string | null;
  photoUrl?: string;
  showPhoto?: boolean;
};
