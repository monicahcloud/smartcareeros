"use client";

import { PropsWithChildren, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardLinks } from "./DashboardLinks";
import { GroupedSidebarLinks } from "@/app/utils/links";

interface DashboardLayoutClientProps extends PropsWithChildren {
  userStats?: {
    level: string;
    resumeCount: number;
    letterCount: number;
    interviewCount: number;
  };
}

export default function DashboardLayoutClient({
  children,
  userStats = {
    level: "free",
    resumeCount: 0,
    letterCount: 0,
    interviewCount: 0,
  },
}: DashboardLayoutClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <main className="grid min-h-screen w-full bg-slate-50 md:grid-cols-[300px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r border-slate-200 bg-white md:block">
          <div className="flex h-screen flex-col">
            <div className="flex h-24 items-center justify-center border-b border-slate-100 px-6">
              <Link href="/dashboard">
                <Image
                  src="/images/logo.png"
                  alt="Smart CareerOS"
                  priority
                  width={210}
                  height={60}
                  className="h-auto w-auto"
                />
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-8">
              <DashboardLinks userStats={userStats} />
            </nav>

            <div className="border-t border-slate-100 bg-slate-50/70 p-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                </span>

                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                  AI Engine: Active
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[320px] p-0">
                <SheetTitle className="sr-only">
                  Smart CareerOS Navigation
                </SheetTitle>

                <div className="flex h-full flex-col">
                  <div className="flex h-24 items-center justify-center border-b border-slate-100 px-6">
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <Image
                        src="/images/logo.png"
                        alt="Smart CareerOS"
                        priority
                        width={200}
                        height={58}
                        className="h-auto w-auto"
                      />
                    </Link>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-5 py-8">
                    <GroupedSidebarLinks
                      onLinkClick={() => setOpen(false)}
                      userStats={userStats}
                    />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-600">
                Smart CareerOS
              </p>
              <h1 className="text-sm font-black text-slate-900 sm:text-base">
                Career Command Center
              </h1>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-6 md:p-2 ">{children}</main>
        </div>
      </main>

      <Toaster richColors closeButton theme="light" />
    </>
  );
}
