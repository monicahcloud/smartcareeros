// components/cover-letter/types.ts

export type CoverLetterData = {
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

  recipientName?: string | null;
  companyName?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;

  body?: string | null;
  content?: unknown;

  template?: string | null;
  themeId?: string | null;
  themeColor?: string | null;
  borderStyle?: string | null;

  showPhoto?: boolean | null;
  userPhoto?: File | string | null;
  userPhotoUrl?: string | null;

  signatureUrl?: string | null;
  signatureColor?: string | null;
};

export type CoverLetterFontPair = {
  heading: string;
  body: string;
};

export type CoverLetterPreviewContextValue = {
  data: CoverLetterData;
  primaryColor: string;
  fullName: string;
  currentDate: string;
  photoSrc: string | null;
  showPhoto: boolean;
  contactItems: string[];
  fonts: CoverLetterFontPair;
};
