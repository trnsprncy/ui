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
 * This will open an options dialog allowing us to granularly control user preferences
 *
 * @type {React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>, {asChild?: Boolean}}
 *
 * @export
 * @param {ButtonProps} {...HTMLButtonProps, variant, asChild }
 * @return {*} {React.ReactNode}
 */
export function TrnsprncyButton({ ...rest }: ButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* @FIXME: what should happen on click? */}
        <Button {...rest} onClick={console.log} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className={cn("relative, w-[500px] ", background)}
      >
        <div className="absolute rotate-[270deg] -left-[2.2rem] pt-3 top-[3.5rem] opacity-90 z-0 drop-shadow-md flex gap-2">
          <p>trnsprncy</p>
        </div>
        <BannerOptions />
      </PopoverContent>
    </Popover>
  );
}
