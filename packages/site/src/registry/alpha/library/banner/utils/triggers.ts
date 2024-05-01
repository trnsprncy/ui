import { ButtonProps } from "@/components/ui/button";

export type TriggerButton = ButtonProps & { label: string };

export const _buttons = [
  { label: "Show Me", variant: "outline", type: "button", size: "sm" },
  { label: "Got it", variant: "default", type: "submit", size: "sm" },
] as TriggerButton[];
