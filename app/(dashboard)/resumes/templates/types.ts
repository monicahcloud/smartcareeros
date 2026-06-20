export type ResumeData = {
  id?: string;

  firstName?: string | null;
  lastName?: string | null;
  jobTitle?: string | null;

  userEmail?: string | null;
  userPhone?: string | null;
  userAddress?: string | null;

  website?: string | null;
  linkedin?: string | null;
  gitHub?: string | null;

  summary?: string | null;

  resumeTitle?: string | null;
  resumeType?: string | null;

  themeId?: string | null;
  themeColor?: string | null;

  showPhoto?: boolean | null;
  userPhoto?: File | string | null;
  userPhotoUrl?: string | null;

  workExperiences?: {
    id?: string;
    position?: string | null;
    company?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    description?: string | null;
  }[];

  educations?: {
    id?: string;
    school?: string | null;
    degree?: string | null;
    fieldOfStudy?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }[];

  techSkills?: {
    id?: string;
    skill?: string | null;
    name?: string | null;
  }[];

  certifications?: {
    id?: string;
    name?: string | null;
    issuer?: string | null;
    date?: string | null;
  }[];

  projects?: {
    id?: string;
    name?: string | null;
    description?: string | null;
    url?: string | null;
  }[];
};
