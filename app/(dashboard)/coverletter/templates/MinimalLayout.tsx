import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

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
      <Signature/>
    </>
  );
}
