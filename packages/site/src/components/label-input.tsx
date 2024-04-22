import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, PropsWithChildren } from "react";

// source: https://tailwindcomponents.com/component/tailwind-css-input-with-button-by-material-tailwind
export function LabelInput({
  asChild,
  className,
  children,
  ...props
}: PropsWithChildren<InputProps> & { asChild?: boolean }) {
  const SubmitButton = asChild ? Slot : Button;

  return (
    <div className="flex items-center  justify-center gap-y-4 w-full relative h-10 min-w-[400px] sm:max-w-[16rem] max-w-[24rem]">
      <SubmitButton>{children}</SubmitButton>
      <input
        {...props}
        className={cn(
          className,
          "peer h-full w-full rounded-[7px] border border-indigo-200  bg-indigo-400/30 dark:bg-indigo-900/30 border-blue-gray-200 px-3 py-4 pr-14 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        )}
      />
      <label
        htmlFor="email"
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
      >
        {props.placeholder ?? props.name}
      </label>
    </div>
  );
}
