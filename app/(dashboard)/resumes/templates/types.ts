export type TechSkill = {
  name: string;
  rating: number;
};

export type ResumeData = {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  summary?: string;
  linkedin?: string;
  gitHub?: string;
  website?: string;
  themeId?: string;
  themeColor?: string;
  borderStyle?: string;
  showPhoto?: boolean;
  photo?: File;
  photoUrl?: string;
  skills?: string[];
  techSkills?: TechSkill[];

  workExperience?: {
    position?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    duties?: string;
    responsibilities?: string;
    accomplishments?: string;
    status?: string;
    grade?: string;
    clearance?: string;
    hours?: string;
    hoursPerWeek?: string;
    employmentType?: string;
    supervisor?: string;
    supervisorPhone?: string;
    mayContactSupervisor?: string;
  }[];

  education?: {
    school?: string;
    degree?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
  }[];

  certifications?: {
    name?: string;
    issuer?: string;
    issuedDate?: string;
    expiresDate?: string;
    credentialUrl?: string;
    description?: string;
  }[];

  projects?: {
    name?: string;
    role?: string;
    description?: string;
    technologies?: string[];
    url?: string;
  }[];

  accomplishments?: {
    title?: string;
    organization?: string;
    date?: string;
    description?: string;
    impact?: string;
  }[];

  interests?: string[];
};
