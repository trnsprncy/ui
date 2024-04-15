"use client";

const background =
  "bg-muted/20 py-4 px-6 rounded-lg shadow-lg flex items-center justify-between gap-x-4 backdrop-blur-md";

type TagDetails = {
  [key in NecessaryTags | AnalyticsTags]: {
    label: string;
    description: string;
  };
};

export const tagDetails: TagDetails = {
  security_storage: {
    label: "Security Related Cookies",
    description: "Cookies necessary for securely authenticating users.",
  },
  functionality_storage: {
    label: "Functionality Related Cookies",
    description: "Cookies for measuring and improving site performance.",
  },
  personalization_storage: {
    label: "Personalization Related Cookies",
    description: "Cookies for enhanced functionality and personalization.",
  },
  ad_storage: {
    label: "Personalized Marketing Related Cookies",
    description: "Cookies for targeted content delivery based on interests.",
  },
  analytics_storage: {
    label: "Analytics Related Cookies",
    description: "Cookies for measuring and improving site performance.",
  },
  ad_personalization: {
    label: "Personalization Related Cookies",
    description: "Cookies for enhanced functionality and personalization.",
  },
  ad_user_data: {
    label: "User Data Related Cookies",
    description: "Cookies for targeted content delivery based on interests.",
  },
};

export const categoryDescriptions = {
  necessary: "These cookies are essential for the website to function",
  analytics: "These cookies help us to improve your experience on our website",
};

type NecessaryTags =
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage";

type AnalyticsTags =
  | "ad_storage"
  | "analytics_storage"
  | "ad_personalization"
  | "ad_user_data";

// key array expects a tuple of primary and secondary keys
type TagArray<T extends NecessaryTags | AnalyticsTags> = T[]; // Array of type T (either PKeys or SKeys)
type NecessaryAnalyticsTagsTupleArrays = [
  TagArray<NecessaryTags> | undefined,
  TagArray<AnalyticsTags> | undefined
];

type BrowserCookies = {
  [key in NecessaryTags | AnalyticsTags]: boolean;
};

import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { Cookie } from "lucide-react";
import { useConsent, useConsentDispatch } from "@trnsprncy/oss/dist/hooks";
import {
  convertTagsToCookies,
  NECESSARY_TAGS,
  ANALYTICS_TAGS,
} from "@trnsprncy/oss/dist/utils/";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";

interface ICookieSwitchProps {
  type: "category" | "tag";
  label: string;
  description: string;
  cookieName: string;
  isDisabled?: boolean;
  onCheckedChange: (checked: boolean) => void; // Function to update cookie state
  className?: string;
  isChecked: boolean;
}

export function CookieSwitch({
  type,
  label,
  description,
  cookieName,
  isDisabled,
  onCheckedChange,
  className,
  isChecked,
}: React.PropsWithChildren<ICookieSwitchProps>) {
  const isCategory = type === "category";
  const { id } = {
    id: isCategory ? label.toLowerCase() : cookieName,
  };

  return (
    <div
      className={cn(
        "flex items-center space-y-6",
        !isCategory && "text-sm",
        isDisabled && "hover:opacity-80 hover:cursor-not-allowed",
        className
      )}
    >
      <Switch
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-500",
          !isCategory && "scale-75"
        )}
        thumb={{
          className:
            "data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400",
        }}
      />
      <div className="w-full ml-6">
        <label
          htmlFor={id}
          className={cn(
            "text-lg font-medium",
            !isCategory && "text-base font-normal text-white/50"
          )}
        >
          {label}
        </label>
        <p className={cn("text-gray-500 text-sm", !isCategory && "text-xs")}>
          {description}
        </p>
      </div>
    </div>
  );
}
export interface IBannerTriggersProps {
  buttons?: ButtonProps[];
  asChild?: boolean;
}
export const _buttons = [
  { children: "Show Me", variant: "outline", type: "button", size: "sm" },
  { children: "Got it", variant: "default", type: "submit", size: "sm" },
];

/**
 * This component renders the trigger buttons for the consent banner.
 * It orchestrates the rendering of the default buttons and also allows for the addition of custom buttons.
 * It also allows for the rendering of the buttons directly as children of the component.
 *
 * When rendering default buttons or custom configured buttons the component will assign functionality based on the button's index
 * @export
 * @type {React.PropsWithChildren<BannerTriggersProps>}
 * @param  {BannerTriggerProps} { asChild, buttons: ButtonProps[], children }
 * @return {*} {React.ReactNode}
 */
export function BannerTriggers(
  props: React.PropsWithChildren<IBannerTriggersProps>
) {
  const { asChild, buttons, children } = props;
  const { handleConsentUpdate, setHasConsent } = useConsentDispatch();
  const { tags } = useConsent();

  let btns = buttons ?? (_buttons as ButtonProps[]);
  if (btns && btns.length > 2) {
    btns.length = 2; // removes all buttons after the 2nd
    console.log(btns);
    console.warn("BannerTriggers: Only 2 buttons are supported");
  }

  return asChild ? (
    <Slot>{children}</Slot>
  ) : (
    <>
      {btns
        ? btns.map((btn, i) => {
            // only show the feature button if the user has pro subscription
            return <TrnsprncyButton key={i} {...btn} />;
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
    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2">
      <ButtonGroupSlot>{children}</ButtonGroupSlot>
    </div>
  );
}

import { useCallback, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Responsible for building up and syncing the options object from cookies with the consent manager context
 * Delegates GroupedOptions to render out the options and assign functionality.
 *
 * @export
 * @return {*} {React.ReactNode}
 */
export function BannerOptions() {
  const { setHasConsent, handleConsentUpdate } = useConsentDispatch();
  const { tags, hasConsent } = useConsent(); // provide only the options that the user has selected
  const [cookies, setCookies] = useState<Partial<BrowserCookies>>(() =>
    convertTagsToCookies(tags as NecessaryAnalyticsTagsTupleArrays)
  );

  const [NECESSARY, ANALYTICS] = tags;
  const [isChecked, setIsChecked] = useState([
    NECESSARY?.every((tag) => !!cookies[tag as keyof typeof cookies]),
    ANALYTICS?.every((tag) => !!cookies[tag as keyof typeof cookies]),
  ]);

  const updateCookiesState = useCallback(
    (cookies: Partial<BrowserCookies>) => {
      setCookies((prev) => {
        const updatedCookies = { ...prev, ...cookies };

        setIsChecked([
          NECESSARY?.every(
            (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
          ),
          ANALYTICS?.every(
            (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
          ),
        ]);
        return updatedCookies;
      });

      handleConsentUpdate(cookies);
    },
    [NECESSARY, ANALYTICS, handleConsentUpdate]
  );

  const renderSwitch = (
    tagGroup: TagArray<NecessaryTags> | TagArray<AnalyticsTags> | undefined,
    index: number
  ) => {
    const category = index ? "Analytics" : "Necessary";
    if (!tagGroup?.length) return null;
    const isDisabled = category === "Necessary";

    return (
      <div key={category} className="p-2">
        <CookieSwitch
          type="category"
          label={category}
          description={
            categoryDescriptions[
              category.toLowerCase() as keyof typeof categoryDescriptions
            ]
          }
          isDisabled={isDisabled}
          cookieName={tagGroup[index]}
          onCheckedChange={(checked) => {
            updateCookiesState(
              tagGroup?.reduce((acc, tag) => {
                acc[tag as keyof typeof acc] = checked;
                return acc;
              }, {} as Partial<BrowserCookies>)
            );
          }}
          isChecked={!!isChecked[index]}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value={category}>
            <AccordionTrigger className="text-xs">
              <p className="ml-auto pr-2">
                Show all {category.toLowerCase()} cookies
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <>
                {Array.isArray(tagGroup) &&
                  tagGroup.map((tag) => {
                    return (
                      <CookieSwitch
                        type="tag"
                        key={tag}
                        className="ml-4"
                        {...tagDetails[tag as keyof typeof tagDetails]}
                        isDisabled={isDisabled}
                        cookieName={tagGroup[index]}
                        onCheckedChange={(checked) => {
                          updateCookiesState({ [tag]: checked });
                        }}
                        isChecked={cookies[tag as keyof typeof cookies]!}
                      />
                    );
                  })}
              </>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return (
    <div className="grid gap-4 min-w-2xl">
      <div
        className={cn(
          "w-full p-2 bg-background/40 backdrop-blur-md rounded-md z-10 [&:not(:first-child)]:border-t transition-opacity duration-150"
        )}
      >
        {tags.map(renderSwitch)}
      </div>
      <div className="flex flex-row w-full p-1">
        <Button
          type="button"
          size="sm"
          className="ml-auto"
          onClick={() => {
            if (!hasConsent) {
              handleConsentUpdate(cookies);
              setHasConsent(true);
            }
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

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
