export type WorkExperience = {
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

export type FederalDetails = {
  citizenship: string;
  veteranPreference: string;
  securityClearance: string;
  federalEmploymentStatus: string;
  currentGsGrade: string;
  desiredGsGrade: string;
  workSchedule: string;
  availability: string;
  willingToRelocate: string;
  supervisorContactPermission: string;
};

export type CareerProfileFormState = {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  gitHub: string;
  summary: string;
  skills: string[];
  techSkills: string[];
  workExperience: WorkExperience[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  accomplishments: AccomplishmentItem[];
  federalDetails: FederalDetails;
};
