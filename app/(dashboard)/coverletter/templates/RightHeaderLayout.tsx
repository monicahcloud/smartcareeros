import { Body } from "../preview/Body";
import { Contact } from "../preview/Contact";
import { NameTitle } from "../preview/NameTitle";
import { Recipient } from "../preview/Recipient";
import { Signature } from "../preview/Signature";

export function RightHeaderLayout() {
  return (
    <>
      <header className="border-b border-slate-200 pb-6 text-right">
        <NameTitle align="right" />
        <div className="mt-3">
          <Contact align="right" />
        </div>
      </header>

      <Recipient />
      <Body />
      <Signature />
    </>
  );
}
