import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Smart CareerOS | AI Resume Builder & Job Search Platform",
    template: "%s | Smart CareerOS",
  },
  description:
    "Smart CareerOS is an AI-powered career platform that helps job seekers create resumes, write cover letters, track job applications, prepare for interviews, and manage their job search in one place.",
  keywords: [
    "Smart CareerOS",
    "AI resume builder",
    "resume builder",
    "cover letter generator",
    "job search platform",
    "career operating system",
    "job application tracker",
    "interview preparation",
    "career tools",
    "MaxResumeBuilder",
    "CareerOS",
  ],
  authors: [{ name: "Smart CareerOS" }],
  creator: "Smart CareerOS",
  publisher: "Smart CareerOS",
  metadataBase: new URL("https://smartcareeros.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smart CareerOS | Your Career Operating System",
    description:
      "Build resumes, generate cover letters, track applications, and prepare for interviews with one AI-powered career platform.",
    url: "https://smartcareeros.com",
    siteName: "Smart CareerOS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart CareerOS - AI Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart CareerOS | AI Resume Builder & Job Search Platform",
    description:
      "An AI-powered platform for resumes, cover letters, job tracking, and interview preparation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
