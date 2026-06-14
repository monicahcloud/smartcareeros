"use client";

import {
  AppWindow,
  CircleHelp,
  CreditCard,
  HomeIcon,
  Layers,
  List,
  MessageSquare,
  FilePen,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type LinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type LinkGroup = {
  title: string;
  items: LinkItem[];
};

export const linkGroups: LinkGroup[] = [
  {
    title: "Career Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <HomeIcon className="h-5 w-5" />,
      },
      {
        label: "Career Profile",
        href: "/careerprofile",
        icon: <UserRound className="h-5 w-5" />,
      },

      {
        label: "Resumes",
        href: "/resumes",
        icon: <List className="h-5 w-5" />,
      },
      {
        label: "Cover Letters",
        href: "/coverletter",
        icon: <FilePen className="h-5 w-5" />,
      },
      {
        label: "Job Search",
        href: "/jobsearch",
        icon: <AppWindow className="h-5 w-5" />,
      },
      {
        label: "Job Tracker",
        href: "/jobtracker",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        label: "AI Mock Interview",
        href: "/interviews",
        icon: <MessageSquare className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        label: "Support",
        href: "/support",
        icon: <CircleHelp className="h-5 w-5" />,
      },
      {
        label: "Pricing",
        href: "/billing",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ],
  },
];

interface Props {
  onLinkClick?: () => void;
  userStats?: {
    level: string;
    interviewCount: number;
    resumeCount: number;
    letterCount: number;
  };
}

export function GroupedSidebarLinks({ onLinkClick, userStats }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-8">
        {linkGroups.map((group, groupIdx) => (
          <div key={group.title}>
            <h4 className="mb-4 px-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
              {group.title}
            </h4>

            <ul className="space-y-2">
              {group.items.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className={clsx(
                        "flex items-center gap-4 rounded-2xl px-4 py-3 text-[15px] font-bold transition-all",
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-black",
                      )}>
                      <span
                        className={clsx(
                          "transition-colors",
                          isActive ? "text-red-600" : "text-slate-400",
                        )}>
                        {link.icon}
                      </span>

                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {groupIdx < linkGroups.length - 1 && (
              <hr className="mx-3 my-8 border-slate-100" />
            )}
          </div>
        ))}

        {userStats && (
          <div className="mx-3 mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
              Plan: {userStats.level}
            </p>

            <div className="mt-4 space-y-3 text-xs font-bold uppercase text-slate-500">
              <div className="flex justify-between">
                <span>Resumes</span>
                <span>{userStats.resumeCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Letters</span>
                <span>{userStats.letterCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Interviews</span>
                <span>{userStats.interviewCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
