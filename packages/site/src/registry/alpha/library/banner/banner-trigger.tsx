"use client";

import { BannerOptions } from "./logic/banner-options";
import { TrnsprncyButton } from "./trnsprncy-button";
import { TriggerButton, _buttons } from "./utils/triggers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsent, useConsentDispatch } from "@trnsprncy/oss/dist/hooks";
import { convertTagsToCookies } from "@trnsprncy/oss/dist/utils/";

export type BannerTriggersProps = {
  buttons?: TriggerButton[];
  asChild?: boolean;
};

/**
 * This component renders the trigger buttons for the consent banner.
 * It orchestrates the rendering of the default buttons and can support completely custom buttons.
 *
 * When rendering default buttons or custom configured buttons the component will assign functionality based on the button's type
 * @export
 * @type {React.PropsWithChildren<BannerTriggersProps>}
 * @param  {BannerTriggerProps} { asChild?:boolean, buttons?: ButtonProps[] }
 * @return {*} {React.ReactNode}
 */
export function BannerTriggers({ buttons }: BannerTriggersProps) {
  const { handleConsentUpdate, setHasConsent } = useConsentDispatch();
  const { tags } = useConsent();

  let btns = buttons ?? _buttons;
  if (btns && btns.length > 2) {
    btns.length = 2; // removes all buttons after the 2nd
    console.warn("BannerTriggers: Only 2 buttons are supported");
  }

  return (
    <>
      {btns
        ? btns.map(({ label, ...btn }, i) => {
            if (btn.type === "submit") {
              return (
                <Button
                  key={label}
                  {...btn}
                  onClick={() => {
                    setHasConsent(true);
                    handleConsentUpdate(convertTagsToCookies(tags));
                  }}
                >
                  {label}
                </Button>
              );
            }
            return (
              <TrnsprncyButton key={label} {...btn} label={label}>
                <BannerOptions />
              </TrnsprncyButton>
            );
          })
        : null}
    </>
  );
}

type ButtonGroupProps = React.PropsWithChildren<{
  className?: string;
}>;

/**
 * Used as a default button group wrapper around the consent banner's interaction buttons
 * uses radix-ui's Slot primitive to allow this behavior by default as a wrapper around the children
 *
 * @export
 * @param {ButtonGroupProps} {className?: string; children: React.ReactNode}
 * @return {*}
 */
export function BannerTriggerGroup({ className, children }: ButtonGroupProps) {
  // const ButtonGroupSlot = children;
  return (
    <div
      className={cn(
        className,
        "w-full md:w-auto flex flex-row justify-end md:justify-start items-center gap-x-2 mt-4 md:mt-0"
      )}
    >
      {children}
    </div>
  );
}
