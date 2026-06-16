import CoverLetterGeneralInfoForm from "../../../components/coverletterbuilder/CoverLetterGeneralInfoForm";
import CoverLetterPersonalInfoForm from "../../../components/coverletterbuilder/CoverLetterPersonalInfoForm";
import CoverLetterEmployerInfo from "../../../components/coverletterbuilder/CoverLetterEmployerInfo";
import CoverLetterBody from "../../../components/coverletterbuilder/CoverLetterBody";
import SignatureForm from "@/app/components/coverletterbuilder/SignatureForm";

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
