"use client";

import { background } from "./utils/constants";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * This button renders with a popup trigger wrapped around it.
 * It is used to allow the default popover behavior from shadcn-ui
 * This will open an options dialog allowing users insight into their cookie preferences
 *
 * @type {React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>, {asChild?: Boolean}}
 *
 * @export
 * @param {ButtonProps} {...HTMLButtonProps, typeof buttonVariants , asChild?: Boolean, label: string} }
 * @return {*} {React.ReactNode}
 */
export function TrnsprncyButton({
  children,
  label,
  open,
  ...props
}: React.PropsWithChildren<ButtonProps & { label: string; open?: boolean }>) {
  return (
    <Popover open={open}>
      <PopoverTrigger>
        <Button {...props}>{label}</Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={24}
        className={cn("relative, w-[500px] ", background)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
