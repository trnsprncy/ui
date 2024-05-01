"use client";

import { TriggerButton, _buttons } from "./utils/triggers";
import { Button } from "@/components/ui/button";
import { EssentialTagsTupleArrays } from "@trnsprncy/oss/dist/types";
import { convertTagsToCookies } from "@trnsprncy/oss/dist/utils";
import { Fragment } from "react";
import { toast } from "sonner";

export type BannerTriggersProps = React.PropsWithChildren<{
  buttons?: TriggerButton[];
  asChild?: boolean;
  tags?: EssentialTagsTupleArrays;
}>;

/**
 * This component renders the trigger buttons for the consent banner.
 * It orchestrates the rendering of the default buttons and can support completely custom buttons.
 *
 * When rendering default buttons or custom configured buttons the component will assign functionality based on the button's type
 * @export
 * @type {React.PropsWithChildren<BannerTriggersProps>}
 * @param  {BannerTriggerProps} { asChild?:boolean, buttons?: ButtonProps[], tags: EssentialAnalyticsTagsTupleArrays, open?: boolean, onClose?: () => void, onAccept?: () => void }
 * @return {React.ReactNode}
 */
export function BareBannerTriggers(props: BannerTriggersProps) {
  const { buttons } = props;

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
                  key={i}
                  {...btn}
                  onClick={() => {
                    toast.success(
                      JSON.stringify(convertTagsToCookies(props.tags!))
                    );
                  }}
                >
                  {label}
                </Button>
              );
            }
            return props.tags?.length ? (
              <Fragment key={i}>{props.children}</Fragment>
            ) : null;
          })
        : null}
    </>
  );
}
