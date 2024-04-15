import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { Cookie } from "lucide-react";
import { BannerTriggerGroup } from "./banner-trigger";
import { cn } from "@/lib/utils";
import { background } from "./constants";


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
    <div className="flex flex-col justify-center gap-y-2 mr-2 flex-1 text-sm">
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
  extends React.PropsWithChildren<IBannerContentProps> {
  bannerClass?: string;
  asChild?: boolean;
  buttonGroup?: React.ReactNode;
  leftElement?: React.ReactNode;
}

/**
 *
 * Responsible for rendering the shell and defining the structure of the banner components
 * orchestrates where and how each of the elements are positioned, and is configurable.
 * uses radix-ui's Slot primitive to facilitate this behavior by default as a wrapper around the children
 *
 * Meant to be used in conjunction with the BannerContent component to render the content inside the banner shell
 *
 * @export
 * @param {BannerProps} props: React.PropsWithChildren<{
 *   bannerClass?: string; asChild?: boolean; buttonGroup?: React.ReactNode; leftElement?: React.ReactNode;
 * }>
 * @return {*} {React.ReactNode}
 */
export default function Banner(props: IBannerProps) {
  const { asChild, leftElement, buttonGroup, bannerClass, ...rest } = props;

  const ContentSlot = asChild ? Slot : BannerContent;

  return (
    <div className="fixed inset-x-0 bottom-10 max-w-3xl z-10 mx-auto">
      <div className={cn(background, bannerClass)}>
        {leftElement ? leftElement : <Cookie className="w-8 h-8" />}
        <ContentSlot {...rest}>{props.children}</ContentSlot>
        {buttonGroup ? buttonGroup : <BannerTriggerGroup />}
      </div>
    </div>
  );
}
