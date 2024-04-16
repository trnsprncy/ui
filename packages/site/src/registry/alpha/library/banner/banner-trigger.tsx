import { TrnsprncyButton } from "./trnsprncy-button";
import { _buttons } from "./utils/constants";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { useConsent, useConsentDispatch } from "@trnsprncy/oss/dist/hooks";
import { convertTagsToCookies } from "@trnsprncy/oss/dist/utils/";

export interface IBannerTriggersProps
  extends React.PropsWithChildren<{
    buttons?: ButtonProps[];
    asChild?: boolean;
  }> {}

/**
 * This component renders the trigger buttons for the consent banner.
 * It orchestrates the rendering of the default buttons and can support completely custom buttons.
 *
 * When rendering default buttons or custom configured buttons the component will assign functionality based on the button's type
 * @export
 * @type {React.PropsWithChildren<BannerTriggersProps>}
 * @param  {BannerTriggerProps} { asChild, buttons: ButtonProps[], children }
 * @return {*} {React.ReactNode}
 */
export function BannerTriggers(props: IBannerTriggersProps) {
  const { asChild, buttons, children } = props;
  const { handleConsentUpdate, setHasConsent } = useConsentDispatch();
  const { tags } = useConsent();

  let btns = buttons ?? (_buttons as ButtonProps[]);
  if (btns && btns.length > 2) {
    btns.length = 2; // removes all buttons after the 2nd
    console.warn("BannerTriggers: Only 2 buttons are supported");
  }

  return asChild ? (
    <Slot>{children}</Slot>
  ) : (
    <>
      {btns
        ? btns.map((btn, i) => {
            if (btn.type === "submit") {
              return (
                <Button
                  key={i}
                  {...btn}
                  onClick={() => {
                    setHasConsent(true);
                    handleConsentUpdate(convertTagsToCookies(tags));
                  }}
                />
              );
            }
            return <TrnsprncyButton key={i} {...btn} />;
          })
        : null}
    </>
  );
}

type ButtonGroupProps = React.PropsWithChildren<{
  asChild?: boolean;
}>;

/**
 * Used as a default button group wrapper around the consent banner's interaction buttons
 * uses radix-ui's Slot primitive to allow this behavior by default as a wrapper around the children
 *
 * @export
 * @param {ButtonGroupProps} {asChild?: boolean | undefined, children: React.ReactNode}
 * @return {*}
 */
export function BannerTriggerGroup({ asChild, children }: ButtonGroupProps) {
  const ButtonGroupSlot = asChild ? Slot : BannerTriggers;
  return (
    <div className="flex flex-col md:flex-row">
      <ButtonGroupSlot>{children}</ButtonGroupSlot>
    </div>
  );
}
