"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

const SwitchWThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    thumb?: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>;
  }
>(({ className, thumb, ...props }, ref) => {
  const thumbClass =
    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0";
  thumb = {
    ...thumb,
    className: cn(thumb?.className ?? "", thumbClass),
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/20",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb {...thumb} />
    </SwitchPrimitives.Root>
  );
});
SwitchWThumb.displayName = SwitchPrimitives.Root.displayName;

export { SwitchWThumb as Switch };
