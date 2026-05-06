export type CoverLetterLayout =
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

export type CoverLetterFontId = "professional" | "traditional" | "modern";

export interface CoverLetterThemeToken {
  id: string;
  name: string;
  category: string;
  layout: CoverLetterLayout;
  defaultColor: string;
  fontId: CoverLetterFontId;
  spacing: "compact" | "normal" | "relaxed";
  headerAlign: "left" | "center" | "right";
  showDivider: boolean;
  bestFor: string;
}

export const COVER_LETTER_THEME_REGISTRY: CoverLetterThemeToken[] = [
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
    bestFor: "traditional corporate roles",
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
    bestFor: "modern business roles",
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
    bestFor: "leadership and management roles",
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
    bestFor: "clean ATS-friendly letters",
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
    bestFor: "corporate and analyst roles",
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
    bestFor: "formal professional applications",
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
    bestFor: "creative business roles",
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
    bestFor: "modern standout letters",
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
    bestFor: "compact professional layouts",
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
    bestFor: "business, finance, and operations roles",
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
    bestFor: "tech and startup roles",
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
    bestFor: "federal and government applications",
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
    bestFor: "confident career transitions",
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
    bestFor: "formal applications",
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
