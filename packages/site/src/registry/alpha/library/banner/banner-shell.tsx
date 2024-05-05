"use client";

import { BannerContent, BannerContentProps } from "./banner-content";
import { BannerTriggerGroup, BannerTriggers } from "./banner-trigger";
// @FIXME: add icons directly
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { background } from "@trnsprncy/oss/dist/utils/styles";
import React from "react";

function useLockBodyScroll(enabled: boolean) {
  // this hook was extended from the original at https://usehooks.com/uselockbodyscroll
  React.useLayoutEffect(() => {
    if (!enabled) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}

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
        id="trnsprncy"
        className={cn("flex flex-col md:items-center z-50", className, {
          "absolute inset-0 justify-end py-9 ": placement === "bottom",
          "absolute inset-0 justify-center py-9": placement === "centered",
        })}
      >
        <div
          className="max-w-3xl z-50 opacity-0 animate-in slide-in-from-bottom-60 animate-out slide-out-top-60 duration-1000 delay-200"
          style={{
            animationFillMode: "forwards",
          }}
        >
          <div
            className={cn(background, bannerClass, "border-2 border-muted/30")}
          >
            {leftElement ? (
              leftElement
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://cdn.jsdelivr.net/gh/trnsprncy/ui@dev/packages/site/public/trnsprncy.png"
                alt="trnsprncy logo"
                className="w-0 md:w-20"
              />
            )}
            <div className="flex flex-col md:flex-row">
              <ContentSlot {...content}>{children}</ContentSlot>
              <BannerTriggerGroup>
                <ButtonSlot>{buttonGroup}</ButtonSlot>
              </BannerTriggerGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
