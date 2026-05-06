// app/(dashboard)/coverletterbuilder/editor/stepsCoverLetter.ts

import CoverLetterGeneralInfoForm from "./CoverLetterGeneralInfoForm";
import CoverLetterPersonalInfoForm from "./CoverLetterPersonalInfoForm";
import CoverLetterEmployerInfo from "./CoverLetterEmployerInfo";
import CoverLetterBody from "./CoverLetterBody";
import SignatureForm from "./SignatureForm";
import { CoverLetterFormProps } from "@/lib/types";

export const allSteps: {
  key: string;
  title: string;
  component: React.ComponentType<CoverLetterFormProps>;
}[] = [
  {
    key: "general-info",
    title: "General",
    component: CoverLetterGeneralInfoForm,
  },
  {
    key: "personal-info",
    title: "Personal",
    component: CoverLetterPersonalInfoForm,
  },
  {
    key: "employer-info",
    title: "Employer",
    component: CoverLetterEmployerInfo,
  },
  {
    key: "body",
    title: "Letter",
    component: CoverLetterBody,
  },
  {
    key: "signature",
    title: "Signature",
    component: SignatureForm,
  },
];
