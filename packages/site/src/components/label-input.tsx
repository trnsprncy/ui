"use client";

import { Button } from "./ui/button";
import { Send } from "lucide-react";

// source: https://tailwindcomponents.com/component/tailwind-css-input-with-button-by-material-tailwind
export function LabelInput() {
  return (
    <>
      <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] shadow-xl">
        <Button
          className="!absolute -mt-0.5 right-0.5 top-1 z-10 select-none rounded bg-indigo-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
          type="submit"
          variant="gooeyLeft"
          aria-label="Submit"
        >
          <Send size={16} className="inline-block mr-1" />
        </Button>
        <input
          type="email"
          className="peer h-full w-full rounded-[7px] border border-indigo-200 bg-indigo-200/80 dark:bg-indigo-900/30 border-blue-gray-200 px-3 py-4 pr-14 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          required
          aria-label="Email Address"
        />
        <label
          htmlFor="email"
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          Email Address
        </label>
      </div>
    </>
  );
}
