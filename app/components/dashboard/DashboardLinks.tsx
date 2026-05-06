"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import { GroupedSidebarLinks } from "@/app/utils/links";

interface DashboardLinksProps {
  userStats?: {
    level: string;
    interviewCount: number;
    resumeCount: number;
    letterCount: number;
  };
}

export function DashboardLinks({ userStats }: DashboardLinksProps) {
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col items-center">
      <div className="relative mb-6 shrink-0">
        <div className="relative h-32 w-32 rounded-full border-2 border-slate-100 bg-white p-1">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-9 w-9 text-slate-400" />
            )}
          </div>

          <div className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-red-600 p-2 shadow-md">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <div className="mb-8 shrink-0 text-center">
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-black">
          Identity Verified
        </p>

        <h2 className="text-lg font-black uppercase leading-tight tracking-tight text-slate-900">
          {user?.firstName || user?.username || "User"}
        </h2>

        <p className="mx-auto mt-1 max-w-[210px] truncate text-sm font-bold lowercase text-slate-400">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      <div className="w-full flex-1 overflow-y-auto px-2">
        <GroupedSidebarLinks userStats={userStats} />
      </div>
    </div>
  );
}
