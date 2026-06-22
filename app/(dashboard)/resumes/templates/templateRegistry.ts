export type ResumeLayout =
  | "classic-left"
  | "centered-header"
  | "split-header"
  | "minimal"
  | "executive"
  | "right-header"
  | "boxed-header"
  | "accent-bar"
  | "two-column-minimal"
  | "corporate-panel"
  | "modern-sidebar"
  | "federal-clean"
  | "bold-topline"
  | "letterhead"
  | "simple-professional";

export type ResumeFontId = "professional" | "traditional" | "modern";

export interface ResumeThemeToken {
  id: string;
  name: string;
  category: string;
  layout: ResumeLayout;
  defaultColor: string;
  fontId: ResumeFontId;
  spacing: "compact" | "normal" | "relaxed";
  headerAlign: "left" | "center" | "right";
  showDivider: boolean;
  bestFor: string;
}

export const RESUME_THEME_REGISTRY: ResumeThemeToken[] = [
  {
    id: "classic-left",
    name: "Classic Left",
    category: "Professional",
    layout: "classic-left",
    defaultColor: "#111827",
    fontId: "traditional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
    bestFor: "traditional corporate resumes",
  },
  {
    id: "centered-modern",
    name: "Centered Modern",
    category: "Professional",
    layout: "centered-header",
    defaultColor: "#DC2626",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "center",
    showDivider: true,
    bestFor: "modern business resumes",
  },
  {
    id: "executive-red",
    name: "Executive",
    category: "Leadership",
    layout: "executive",
    defaultColor: "#B91C1C",
    fontId: "professional",
    spacing: "relaxed",
    headerAlign: "left",
    showDivider: true,
    bestFor: "leadership and management resumes",
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "Modern",
    layout: "minimal",
    defaultColor: "#0F172A",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
    bestFor: "clean ATS-friendly resumes",
  },
  {
    id: "split-corporate",
    name: "Split Corporate",
    category: "Professional",
    layout: "split-header",
    defaultColor: "#1F2937",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
    bestFor: "corporate, analyst, and finance resumes",
  },
  {
    id: "right-aligned-pro",
    name: "Right Aligned Pro",
    category: "Modern",
    layout: "right-header",
    defaultColor: "#0F172A",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "right",
    showDivider: true,
    bestFor: "formal professional resumes",
  },
  {
    id: "boxed-modern",
    name: "Boxed Modern",
    category: "Corporate",
    layout: "boxed-header",
    defaultColor: "#991B1B",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
    bestFor: "creative business resumes",
  },
  {
    id: "accent-bar-red",
    name: "Accent Bar",
    category: "Professional",
    layout: "accent-bar",
    defaultColor: "#DC2626",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
    bestFor: "modern standout resumes",
  },
  {
    id: "two-column-minimal",
    name: "Two Column Minimal",
    category: "Minimal",
    layout: "two-column-minimal",
    defaultColor: "#111827",
    fontId: "modern",
    spacing: "compact",
    headerAlign: "left",
    showDivider: false,
    bestFor: "compact resumes with strong skills sections",
  },
  {
    id: "corporate-panel",
    name: "Corporate Panel",
    category: "Modern",
    layout: "corporate-panel",
    defaultColor: "#DC2626",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
    bestFor: "business, finance, and operations resumes",
  },
  {
    id: "modern-sidebar",
    name: "Modern Sidebar",
    category: "Modern",
    layout: "modern-sidebar",
    defaultColor: "#111827",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
    bestFor: "tech, startup, and portfolio-style resumes",
  },
  {
    id: "federal-clean",
    name: "Federal Clean",
    category: "Government",
    layout: "federal-clean",
    defaultColor: "#1F2937",
    fontId: "traditional",
    spacing: "relaxed",
    headerAlign: "left",
    showDivider: true,
    bestFor: "federal and government resumes",
  },
  {
    id: "bold-topline",
    name: "Bold Topline",
    category: "Profesional",
    layout: "bold-topline",
    defaultColor: "#B91C1C",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
    bestFor: "confident career transition resumes",
  },
  {
    id: "letterhead",
    name: "Letterhead",
    category: "Professional",
    layout: "letterhead",
    defaultColor: "#111827",
    fontId: "traditional",
    spacing: "normal",
    headerAlign: "center",
    showDivider: true,
    bestFor: "formal and executive applications",
  },
  {
    id: "simple-professional",
    name: "Simple Professional",
    category: "Professional",
    layout: "simple-professional",
    defaultColor: "#DC2626",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
    bestFor: "general job applications",
  },
];
