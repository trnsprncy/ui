"use client";

import { LabelInput } from "../label-input";
import { Loading } from "../loading";
import { Button } from "../ui/button";
import { useFormStateResponse } from "./hooks/use-form-state-response";
import { FormState, addToWaitList } from "@/lib/actions/add-to-waitlist";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import React, { ComponentProps, Fragment, createRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const fields = [
  {
    type: "email",
    placeholder: "you@youremail.com",
    name: "email",
    autoComplete: "off",
    defaultValue: "",
    required: true,
  },
];

export function FormMessage({
  hasError,
  message,
}: {
  hasError: boolean;
  message: string;
}) {
  return (
    <div
      className={cn(
        hasError
          ? "scale-y-100 visible opacity-100 my-4"
          : "scale-y-0 hidden opacity-0",
        "transition-all ease-in-out text-sm p-2 bg-gray-950/40 rounded-md text-gray-400 flex gap-4"
      )}
    >
      {message}
    </div>
  );
}

function SubmitButton({ className, ...props }: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(
        className,
        "!absolute right-1 top-1 z-10 select-none rounded bg-indigo-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none",
        { "bg-transparent pointer-events-none": pending }
      )}
      type="submit"
      variant="gooeyLeft"
      aria-label="Submit"
      disabled={pending}
      aria-disabled={pending}
      size="sm"
      {...props}
    >
      {pending ? (
        <Loading className="scale-90" />
      ) : (
        <Send size={16} className="inline-block mr-1" />
      )}
    </Button>
  );
}

export function WaitListForm() {
  const [state, addToWaitListAction] = useFormState(addToWaitList, {
    email: "",
  } as FormState);
  const { success, message, field } = useFormStateResponse(state);

  const formRef = createRef<HTMLFormElement>();

  useEffect(() => {
    if (success) {
      formRef.current?.reset();
    }
  }, [success, state.message, formRef]);
  return (
    <form action={addToWaitListAction} ref={formRef}>
      {fields.map((field, index) => (
        <Fragment key={index}>
          <LabelInput asChild key={index} {...field}>
            <SubmitButton />
          </LabelInput>
          <div className={cn(!field && !!message ? "my-0" : "-my-2")}>
            <FormMessage hasError={!field && !!message} message={message} />
          </div>
        </Fragment>
      ))}
    </form>
  );
}
