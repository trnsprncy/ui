import { BannerTriggerGroup } from "./banner-trigger";
import { background } from "./utils/constants";
import { useLockBodyScroll } from "./utils/use-lock-body-scroll";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Cookie } from "lucide-react";
import Link from "next/link";

export interface IBannerContentProps extends React.PropsWithChildren {
  heading?: string;
  description?: string;
  href?: string;
  label?: string;
}

/**
 * Responsible for rendering the content inside the banner shell
 * takes in 4 key static props: {heading, description, href, label}
 *
 * @export
 * @param {BannerContentProps} React.PropsWithChildren<{
 *   heading?: string, description?: string, href?: string, label?: string
 * }>
 * @return {*} {React.ReactNode}
 */
export function BannerContent(props: IBannerContentProps) {
  return (
    <div className="flex flex-col justify-center gap-y-2 mr-2 flex-1 text-sm text-foreground">
      <strong>{props.heading ?? "trnsprncy"}</strong>
      <p className="">
        {props.description ?? "We use cookies to improve your experience."} By
        using our site, you agree to the terms outlined in our{" "}
        <Link
          href={props.href ?? "/policies/cookies"}
          className="text-primary-500 dark:text-primary-400 hover:underline text-gray-500"
        >
          {props.label ?? "cookie policy"}
        </Link>
        .
      </p>
    </div>
  );
}

export interface IBannerProps
  extends React.PropsWithChildren<{
    bannerClass?: string;
    asChild?: boolean;
    buttonGroup?: React.ReactNode;
    leftElement?: React.ReactNode;
    lockBodyScroll?: boolean;
    placement?: "bottom" | "centered";
    className?: string;
    content?: IBannerContentProps;
  }> {}

/**
 *
 * Responsible for rendering the shell and defining the structure of the banner components
 * orchestrates where and how each of the elements are positioned, and is configurable.
 * uses radix-ui's `Slot` primitive to facilitate this behavior.
 *
 * @export
 * @param {BannerProps} props: React.PropsWithChildren<{
 *    asChild?: boolean; buttonGroup?: React.ReactNode; leftElement?: React.ReactNode; placement: 'centered' | 'bottom';
 *    bannerClass: string; className: string; content?: BannerContentProps;
 * }>
 * @return {*} {React.ReactNode}
 */
export default function Banner(props: IBannerProps) {
  const {
    asChild,
    buttonGroup,
    leftElement,
    placement,
    bannerClass,
    className,
    children,
    content,
  } = props;
  const ContentSlot = asChild ? Slot : BannerContent;
  useLockBodyScroll(!!props.lockBodyScroll);
  return (
    <>
      {props.lockBodyScroll ? (
        <div className="modal-overlay absolute inset-0 bg-background/30 backdrop-blur-md transition" />
      ) : null}

      <div
        className={cn(
          "py-9 absolute inset-0 flex flex-col items-center z-10",
          className,
          {
            "justify-end": placement === "bottom",
            "justify-center": placement === "centered",
          }
        )}
      >
        <div className="max-w-3xl z-50 animate-in slide-in-from-bottom-60 animate-out slide-out-top-60 duration-1000 delay-200">
          <div
            className={cn(background, bannerClass, "border-2 border-muted/30")}
          >
            {leftElement ? leftElement : <Icons.logo className="w-12 h-12" />}
            <ContentSlot {...content}>{children}</ContentSlot>
            {buttonGroup ? buttonGroup : <BannerTriggerGroup />}
          </div>
        </div>
      </div>
    </>
  );
}
