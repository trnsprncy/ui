import { AnalyticsTags, NecessaryTags } from "@trnsprncy/oss/dist/types";

export const background =
  "bg-muted/20 py-4 px-6 rounded-lg shadow-lg flex items-center justify-between gap-x-4 backdrop-blur-md";

export const categoryDescriptions = {
  necessary: "These cookies are essential for the website to function",
  analytics: "These cookies help us to improve your experience on our website",
};

export type TagDetails = {
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

export const _buttons = [
  { children: "Show Me", variant: "outline", type: "button", size: "sm" },
  { children: "Got it", variant: "default", type: "submit", size: "sm" },
];