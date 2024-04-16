import { BannerOptions } from "./banner-options";
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
 * @param {ButtonProps} {...HTMLButtonProps, variant, asChild }
 * @return {*} {React.ReactNode}
 */
export function TrnsprncyButton(props: ButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* @FIXME: what should happen on click? */}
        <Button {...props} onClick={console.log} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={24}
        className={cn("relative, w-[500px] ", background)}
      >
        <BannerOptions />
      </PopoverContent>
    </Popover>
  );
}
