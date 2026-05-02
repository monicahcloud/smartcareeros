import {
  Mic,
  Search,
  Lightbulb,
  Download,
  FileText,
  BarChart3,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

export const featureCards = {
  interview: {
    icon: Mic,
    title: "AI Interview Simulator",
    description:
      "Practice real-time behavioral interviews. Get instant feedback on your pacing, keywords, and confidence.",
    bars: [0.4, 0.7, 1, 0.5, 0.8, 0.3, 0.9, 1, 0.6, 0.8, 0.4],
  },
  jobSearch: {
    icon: Search,
    title: "Smart Job Search",
    label: "Real-Time Engine",
    description:
      "Access millions of listings. Use AI Match Scores to prioritize applications where your profile stands out most.",
    actionIcon: ArrowUpRight,
  },
  strategy: {
    icon: Lightbulb,
    title: "Expert Strategy",
    description: "Curated resume & interview tips.",
  },
  ebook: {
    icon: BookOpen,
    title: "Free E-Book",
    description: "Download Guide",
    bgIcon: Download,
  },
};

export const secondaryTools = [
  {
    icon: BarChart3,
    title: "Job Tracking",
    desc: "Track applications, interviews, follow-ups, and next steps from one organized dashboard.",
  },
  {
    icon: BookOpen,
    title: "Career Blog",
    desc: "Read practical career advice, job search strategies, resume guidance, and interview tips.",
  },
  {
    icon: FileText,
    title: "Resume & Interview Tips",
    desc: "Get actionable resume guidance, interview strategies, and career advice to help you stand out and succeed.",
  },
];
