"use client";

import { BannerContent, BannerContentProps } from "./banner-content";
import { BannerTriggerGroup, BannerTriggers } from "./logic/banner-trigger";
import { background } from "./utils/constants";
import { useLockBodyScroll } from "./utils/use-lock-body-scroll";
// @FIXME: add icons directly
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export type BannerProps = React.PropsWithChildren<{
  bannerClass?: string;
  asChild?: boolean;
  buttonGroup?: React.ReactNode;
  leftElement?: React.ReactNode;
  lockBodyScroll?: boolean;
  placement?: "bottom" | "centered";
  className?: string;
  content?: BannerContentProps;
}>;

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
export default function Banner(props: BannerProps) {
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
  const ButtonSlot = buttonGroup ? Slot : BannerTriggers;
  useLockBodyScroll(!!props.lockBodyScroll);
  return (
    <>
      {props.lockBodyScroll ? (
        <div className="modal-overlay absolute inset-0 bg-background/30 backdrop-blur-md transition z-20" />
      ) : null}

      <div
        className={cn(
          "py-9 absolute inset-0 flex flex-col items-center z-50",
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
            {leftElement ? (
              leftElement
            ) : (
              <img
                src="https://cdn.jsdelivr.net/gh/trnsprncy/ui@dev/packages/site/public/trnsprncy.png"
                alt="trnsprncy logo"
                width="64px"
              />
            )}
            <ContentSlot {...content}>{children}</ContentSlot>
            <BannerTriggerGroup>
              <ButtonSlot>{buttonGroup}</ButtonSlot>
            </BannerTriggerGroup>
          </div>
        </div>
      </div>
    </>
  );
}

function BannerShell(props: React.PropsWithChildren<{}>) {
  return <div>{props.children}</div>;
}
