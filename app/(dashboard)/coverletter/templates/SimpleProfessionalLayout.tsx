import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

export function SimpleProfessionalLayout() {
  return (
    <>
      <header className="flex items-center justify-between gap-8">
        <NameTitle />
        <Contact align="right" />
      </header>

      <div className="h-px bg-slate-200" />

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
