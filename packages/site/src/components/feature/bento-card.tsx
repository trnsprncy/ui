import { CCPA } from "@/components/regulatory-icons/ccpa";
import { GDPR } from "@/components/regulatory-icons/gdpr";
import { LCPD } from "@/components/regulatory-icons/lcpd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Slottable } from "@radix-ui/react-slot";
import { CheckIcon } from "lucide-react";
import React from "react";

type IconProps = React.FC<React.SVGProps<SVGSVGElement>>;

const ICONS: Record<string, IconProps> = {
  gdpr: GDPR,
  eprivacy: GDPR,
  ccpa: CCPA,
  lcpd: LCPD,
};

const slideUp =
  "opacity-0 animate-in motion-safe:animate-fade-up motion-safe:animate-out fade-out ease-in-out-sine duration-300";
const animationStyle = {
  animationFillMode: "forwards",
};

type FeatureCardProps = {
  title: string;
  description: string;
  body: string;
  list?: string[];
  footer: string[];
  className?: string;
  highlight?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  component?: React.FC;
};
export function BentoCard({
  title,
  description,
  body,
  list,
  footer,
  className,
  highlight,
  leftSlot,
  rightSlot,
  component,
}: FeatureCardProps) {
  const bg = highlight
    ? "bg-gradient-to-tr from-indigo-500 via-indigo-300 to-indigo-200 dark:from-indigo-100/[0.1] dark:via-indigo-300/[0.3] dark:to-indigo-400/[0.2]"
    : "bg-gradient-to-br from-slate-100/[0.1] via-slate-300/[0.3] to-slate-400/[0.2]";

  const Component = component;
  return (
    <Card
      className={cn(
        "w-full shadow-md mx-auto max-w-4xl border flex flex-col",
        bg,
        className,
        slideUp
      )}
      style={animationStyle}
    >
      <CardHeader className="relative text-foreground/50 min-h-24">
        <div
          className={cn("relative w-full flex justify-between items-center")}
        >
          <Slottable>{leftSlot}</Slottable>
          <Slottable>{rightSlot}</Slottable>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 h-full gap-y-4">
        <p className="font-bold text-2xl">{title}</p>
        <CardDescription>{description}</CardDescription>
        <p
          className={cn("max-w-sm text-sm text-muted-foreground", {
            "text-foreground/60": highlight,
          })}
        >
          {body}
        </p>
        <ul className="flex flex-col text-left gap-y-2">
          {list?.map((item, i) => (
            <li key={item} className="text-left text-xs flex gap-x-2">
              <CheckIcon className="w-3 opacity-80" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="w-full text-sm text-foreground/60 font-semibold min-h-16 flex flex-col items-start justify-end">
        {Component ? (
          <Component />
        ) : (
          footer?.map((item, i) => {
            const Icon = ICONS[item as keyof typeof ICONS];
            return (
              <div key={item} className="flex gap-x-2 gap-y-1 text-left">
                <Icon className="w-3 opacity-80" />
                <p className="text-left">{item.toUpperCase()}</p>
              </div>
            );
          })
        )}
      </CardFooter>
    </Card>
  );
}
