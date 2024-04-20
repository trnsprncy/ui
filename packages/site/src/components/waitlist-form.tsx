import { LabelInput } from "./label-input";
import React from "react";

export function WaitListForm() {
  return (
    <form
      className="motion-safe:animate-fade-up flex items-center justify-center gap-y-4 opacity-0 w-full"
      style={{
        animationDelay: "0.4s",
        animationFillMode: "forwards",
      }}
      // action={(data: FormData) => {
      //   console.log("Form submitted", data);
      // }}
    >
      <LabelInput />
    </form>
  );
}
