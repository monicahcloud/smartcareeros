import { Body } from "@/app/components/coverletter/Body";
import { Contact } from "@/app/components/coverletter/Contact";
import { NameTitle } from "@/app/components/coverletter/NameTitle";
import { Recipient } from "@/app/components/coverletter/Recipient";
import { Signature } from "@/app/components/coverletter/Signature";
export function MinimalLayout() {
  return (
    <>
      <header className="space-y-3">
        <NameTitle size="small" />
        <Contact />
      </header>

      <div className="h-px bg-slate-200" />

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
