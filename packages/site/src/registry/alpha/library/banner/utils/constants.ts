import { ButtonProps } from "@/components/ui/button";
import { EssentialTags, NonEssentialTags } from "@trnsprncy/oss/dist/types";

export const background =
  "bg-muted/20 py-4 px-6 rounded-lg shadow-lg flex items-center justify-between gap-x-4 backdrop-blur-md";

export const categoryDescriptions = {
  essential: "These cookies are essential for the website to function",
  nonessential:
    "These cookies help us to improve your experience on our website",
};

export type TagDetails = {
  [key in EssentialTags | NonEssentialTags]: {
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
    description:
      "Cookies that provide enhanced functionalities and allow usage of modern features.",
  },
  personalization_storage: {
    label: "Personalization Related Cookies",
    description:
      "Cookies for custom personalization to provide the best experience possible.",
  },
};

export type TriggerButton = ButtonProps & { label: string };

export const _buttons = [
  { label: "Show Me", variant: "outline", type: "button", size: "sm" },
  { label: "Got it", variant: "default", type: "submit", size: "sm" },
] as TriggerButton[];
