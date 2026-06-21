/* ---------- 1. TYPES ---------- */
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

export type ResumeCategory =
  | "Professional"
  | "Modern"
  | "Leadership"
  | "Minimal"
  | "Corporate"
  | "Creative"
  | "Government"
  | "Bold";

export type ResumeFontId = "professional" | "traditional" | "modern";

export interface ResumeThemeToken {
  id: string;
  name: string;
  category: ResumeCategory;
  layout: ResumeLayout;
  defaultColor: string;
  fontId: ResumeFontId;
  spacing: "compact" | "normal" | "relaxed";
  headerAlign: "left" | "center" | "right";
  showDivider: boolean;
  bestFor: string;
}
/* ---------- 2. INGREDIENTS ---------- */

export const SPACING_OPTIONS: ("compact" | "normal" | "relaxed")[] = [
  "compact",
  "normal",
  "relaxed",
];

export const ColorPalettes = {
  "classic-business": {
    label: "Chronological Classic",
    description:
      "Traditional top-down flow. Ideal for steady career progression in finance or law.",
    primary: "#000000",
    secondary: "#475569",
    accent: "#DC2626",
  },
  "combination-pro": {
    label: "Combination Pro",
    description:
      "A hybrid layout balancing skills and work history for tech and engineering.",
    primary: "#2563EB",
    secondary: "#1E293B",
    accent: "#38BDF8",
  },
  "federal-standard": {
    label: "Federal Standard",
    description:
      "Data-dense, single-column compliance layout for government and GS roles.",
    primary: "#0F172A",
    secondary: "#475569",
    accent: "#CBD5E1",
  },
  "functional-creative": {
    label: "Functional Creative",
    description:
      "Focuses on skills and competencies over timeline. Perfect for career changers.",
    primary: "#BE123C",
    secondary: "#881337",
    accent: "#FFE4E6",
  },
  "modern-tech": {
    label: "Modern Tech",
    description:
      "Clean blue and slate tones suited for technology, engineering, and startup environments.",
    primary: "#2563EB",
    secondary: "#1E293B",
    accent: "#38BDF8",
  },
  "executive-navy": {
    label: "Executive Navy",
    description:
      "Deep navy and neutral gray for leadership, management, and senior professionals.",
    primary: "#0F172A",
    secondary: "#334155",
    accent: "#94A3B8",
  },
  "professional-charcoal": {
    label: "Professional Charcoal",
    description:
      "Dark charcoal with subtle contrast. Clean, modern, and highly versatile.",
    primary: "#111827",
    secondary: "#4B5563",
    accent: "#9CA3AF",
  },
  "medical-teal": {
    label: "Healthcare & Medical",
    description:
      "Calming teal tones ideal for healthcare, wellness, and clinical roles.",
    primary: "#0D9488",
    secondary: "#115E59",
    accent: "#CCFBF1",
  },
  "education-blue": {
    label: "Education Blue",
    description:
      "Trustworthy blue palette suitable for education, academia, and public service.",
    primary: "#1D4ED8",
    secondary: "#1E40AF",
    accent: "#DBEAFE",
  },
  "government-slate": {
    label: "Government Slate",
    description:
      "Muted slate tones designed for federal, government, and compliance-heavy roles.",
    primary: "#0F172A",
    secondary: "#475569",
    accent: "#CBD5E1",
  },
  "legal-burgundy": {
    label: "Legal Burgundy",
    description:
      "Rich burgundy with neutral balance. Excellent for legal, policy, and advisory roles.",
    primary: "#7F1D1D",
    secondary: "#1F2933",
    accent: "#FCA5A5",
  },
  "finance-emerald": {
    label: "Finance Emerald",
    description:
      "Confident green tones associated with growth, stability, and financial expertise.",
    primary: "#047857",
    secondary: "#064E3B",
    accent: "#A7F3D0",
  },
  "creative-rose": {
    label: "Creative Professional",
    description:
      "Bold yet refined rose tones for marketing, branding, and creative industries.",
    primary: "#BE123C",
    secondary: "#881337",
    accent: "#FFE4E6",
  },
  "marketing-purple": {
    label: "Marketing Purple",
    description:
      "Strategic purple palette for marketing, communications, and brand roles.",
    primary: "#6D28D9",
    secondary: "#4C1D95",
    accent: "#EDE9FE",
  },
  "startup-indigo": {
    label: "Startup Indigo",
    description:
      "Energetic indigo tones for early-career professionals and startup environments.",
    primary: "#4338CA",
    secondary: "#312E81",
    accent: "#E0E7FF",
  },
  "design-neutral": {
    label: "Design Neutral",
    description:
      "Minimal grayscale palette that keeps focus on content and layout.",
    primary: "#1F2937",
    secondary: "#6B7280",
    accent: "#E5E7EB",
  },
  "operations-olive": {
    label: "Operations Olive",
    description:
      "Earthy olive tones suitable for logistics, operations, and supply chain roles.",
    primary: "#3F6212",
    secondary: "#365314",
    accent: "#ECFCCB",
  },
  "engineering-steel": {
    label: "Engineering Steel",
    description:
      "Cool steel blues designed for engineering and technical professionals.",
    primary: "#1E3A8A",
    secondary: "#1E293B",
    accent: "#BFDBFE",
  },
  "consulting-slate": {
    label: "Consulting Slate",
    description:
      "Polished slate tones ideal for consulting, strategy, and advisory work.",
    primary: "#020617",
    secondary: "#334155",
    accent: "#CBD5E1",
  },
  "nonprofit-blue": {
    label: "Nonprofit Blue",
    description:
      "Approachable blue palette for nonprofit, social impact, and community roles.",
    primary: "#1E40AF",
    secondary: "#1E3A8A",
    accent: "#DBEAFE",
  },
  "hospitality-sand": {
    label: "Hospitality Sand",
    description:
      "Warm neutral tones for hospitality, tourism, and customer-facing roles.",
    primary: "#78350F",
    secondary: "#92400E",
    accent: "#FEF3C7",
  },
  "data-graphite": {
    label: "Data & Analytics",
    description:
      "Modern graphite tones designed for data, analytics, and BI professionals.",
    primary: "#030712",
    secondary: "#374151",
    accent: "#9CA3AF",
  },
  "early-career-blue": {
    label: "Early Career Blue",
    description:
      "Friendly, confident blue ideal for students, graduates, and entry-level roles.",
    primary: "#2563EB",
    secondary: "#60A5FA",
    accent: "#EFF6FF",
  },
  "executive-black-gold": {
    label: "Executive Black",
    description:
      "High-contrast black with muted gold accent for senior-level professionals.",
    primary: "#000000",
    secondary: "#1F2937",
    accent: "#D4AF37",
  },
} as const;

export const FontPairs = {
  professional: { heading: "Inter", body: "Roboto" },
  traditional: { heading: "Playfair Display", body: "Source Sans Pro" },
  technical: { heading: "JetBrains Mono", body: "Inter" },
  modern: { heading: "Montserrat", body: "Open Sans" },
} as const;

/* ---------- 3. CURATED REGISTRY (15 THEMES) ---------- */

export const THEME_REGISTRY: ResumeThemeToken[] = [
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
    category: "Modern",
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
    category: "Minimal",
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
    category: "Corporate",
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
    category: "Professional",
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
    category: "Modern",
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
    category: "Creative",
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
    category: "Corporate",
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
    category: "Bold",
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
