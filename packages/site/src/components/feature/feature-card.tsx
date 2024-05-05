import { Badge } from "../ui/badge";
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
import { CheckIcon, CloudDownload, Landmark, Receipt } from "lucide-react";
import React from "react";

type IconProps = React.FC<React.SVGProps<SVGSVGElement>>;

const ICONS: Record<string, IconProps> = {
  gdpr: GDPR,
  eprivacy: GDPR,
  ccpa: CCPA,
  lcpd: LCPD,
};

const CARD_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  block: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 65.1 65.1"
        {...props}
      >
        <circle
          cx="32.55"
          cy="32.55"
          r="30.55"
          stroke="#8F8F8F"
          strokeWidth="4"
        />
        <path
          stroke="#8F8F8F"
          strokeWidth="4"
          d="m17.982 50.813 29.295-35.805"
        />
      </svg>
    );
  },
  data: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 69 69"
        {...props}
      >
        <path
          fill="#8F8F8F"
          d="M62.051 35.634a55.104 55.104 0 0 1-8.273-1.88 2.77 2.77 0 0 0-1.755-.004 54.45 54.45 0 0 1-8.28 1.884 2.796 2.796 0 0 0-2.345 2.767v9.575c0 6.876 4.079 13.094 10.382 15.837a2.841 2.841 0 0 0 2.237 0 17.24 17.24 0 0 0 10.379-15.826l.003-9.584a2.794 2.794 0 0 0-2.348-2.769Zm.043 12.357a14.94 14.94 0 0 1-8.999 13.714.477.477 0 0 1-.413 0 14.968 14.968 0 0 1-8.984-13.725v-9.575a.499.499 0 0 1 .414-.498 57.141 57.141 0 0 0 8.633-1.973.473.473 0 0 1 .302 0 57.481 57.481 0 0 0 8.63 1.974.496.496 0 0 1 .414.497l.003 9.586ZM34.301 33.337A3.449 3.449 0 1 0 29.9 37.74v1.359c0 .636.516 1.15 1.15 1.15a1.144 1.144 0 0 0 1.15-1.147v-1.36a3.452 3.452 0 0 0 2.102-4.405Zm-3.252 2.315a1.15 1.15 0 1 1 .001-2.3 1.15 1.15 0 0 1 0 2.3Z"
        />
        <path
          fill="#8F8F8F"
          d="M66.002 31.561a64.046 64.046 0 0 1-10.894-2.222 23.951 23.951 0 0 0-.932-5.184h2.171a3.45 3.45 0 0 0 3.45-3.45v-4.813a3.448 3.448 0 0 0 2.102-4.403 3.448 3.448 0 1 0-6.504 2.3 3.45 3.45 0 0 0 2.102 2.103v4.813a1.15 1.15 0 0 1-1.15 1.15H53.37A24.021 24.021 0 0 0 40.25 8.701V5.754c0-.635.515-1.15 1.15-1.15h4.812a3.448 3.448 0 1 0 6.504-2.3 3.448 3.448 0 0 0-6.504 0H41.4a3.45 3.45 0 0 0-3.45 3.45v2.148a24.315 24.315 0 0 0-5.75-.941v-5.81a1.15 1.15 0 1 0-2.3 0v5.807c-1.949.087-3.88.407-5.749.958V5.751a3.45 3.45 0 0 0-3.45-3.45H15.89a3.449 3.449 0 1 0 0 2.3H20.7c.636 0 1.15.515 1.15 1.15v2.98A24.272 24.272 0 0 0 8.735 21.852H5.753a1.15 1.15 0 0 1-1.15-1.15v-4.814a3.449 3.449 0 1 0-2.3-6.504A3.449 3.449 0 0 0 .2 13.786a3.462 3.462 0 0 0 2.102 2.106v4.813a3.45 3.45 0 0 0 3.45 3.45h2.164a23.996 23.996 0 0 0-.955 5.75H1.15a1.15 1.15 0 1 0 0 2.3h5.81c.083 1.95.406 3.882.954 5.75l-2.161-.002a3.45 3.45 0 0 0-3.45 3.45v4.813a3.449 3.449 0 1 0 2.3 6.504 3.449 3.449 0 0 0 0-6.504v-4.813c0-.635.515-1.15 1.15-1.15h2.98A24.277 24.277 0 0 0 21.847 53.37v2.98a1.15 1.15 0 0 1-1.15 1.15h-4.813a3.449 3.449 0 1 0-6.503 2.3 3.449 3.449 0 0 0 6.503 0l4.815.003a3.45 3.45 0 0 0 3.45-3.45v-2.165a24 24 0 0 0 5.75.955v5.81a1.15 1.15 0 0 0 2.3.003v-5.798a24.288 24.288 0 0 0 5.519-.904A21.837 21.837 0 0 0 49.937 68.03l1.587.688c.88.375 1.871.375 2.752 0l1.587-.688A21.838 21.838 0 0 0 69 47.994v-13.01a3.46 3.46 0 0 0-2.998-3.423Zm-7.355-20.06a1.15 1.15 0 1 1 0 2.301 1.15 1.15 0 0 1 0-2.3Zm-9.2-9.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Zm-36.796 2.3a1.15 1.15 0 1 1 .001-2.3 1.15 1.15 0 0 1 0 2.3Zm-9.199 9.2a1.15 1.15 0 1 1 .001-2.3 1.15 1.15 0 0 1-.001 2.3Zm0 36.805a1.151 1.151 0 1 1 .002-2.302 1.151 1.151 0 0 1-.002 2.302Zm9.2 9.198a1.15 1.15 0 0 1 0-2.3c.634.003 1.15.518 1.15 1.153s-.516 1.147-1.15 1.147ZM10.06 37.219C6.656 25.64 13.28 13.493 24.857 10.088c2.012-.594 4.1-.89 6.192-.887 11.191-.036 20.582 8.428 21.702 19.564A3.398 3.398 0 0 0 51.62 29a46.282 46.282 0 0 1-9.074 2.165v-2.414c0-2.54-2.06-4.6-4.6-4.6v-4.6c0-3.813-3.087-6.9-6.899-6.9a6.897 6.897 0 0 0-6.9 6.9v4.6a4.6 4.6 0 0 0-4.599 4.6v13.801c0 2.54 2.06 4.6 4.6 4.6h12.649v.839c.003 1.35.135 2.698.386 4.025-11.574 3.405-23.717-3.22-27.121-14.798h-.001Zm25.588-17.667v4.6h-9.2v-4.6a4.6 4.6 0 1 1 9.2 0Zm1.15 15.433v9.871H24.15a2.3 2.3 0 0 1-2.3-2.3V28.752a2.3 2.3 0 0 1 2.3-2.3H37.95a2.3 2.3 0 0 1 2.3 2.3v2.75c-.147.017-.315.041-.452.06a3.45 3.45 0 0 0-2.998 3.423Zm29.897 13.007a19.538 19.538 0 0 1-11.75 17.928l-1.59.688c-.29.126-.62.126-.913 0l-1.59-.688a19.54 19.54 0 0 1-11.754-17.928V34.985c.004-.575.425-1.06.994-1.139 3.138-.407 8.918-1.3 12.388-2.71.267-.107.564-.107.83 0 3.474 1.41 9.253 2.3 12.391 2.707.57.078.994.567.994 1.142l.003 13.007h-.003Z"
        />
      </svg>
    );
  },
  google: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="36.25 32 439.5 448"
        fill="#8F8F8F"
        {...props}
      >
        <path d="m473.16 221.48-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 0 1-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96Z" />
      </svg>
    );
  },
  install: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return <CloudDownload {...props} />;
  },
  money: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return <Receipt {...props} />;
  },
  govt: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return <Landmark {...props} />;
  },
  nextjs: ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 180 180"
        {...props}
      >
        <g clip-path="url(#a)">
          <mask
            id="b"
            // Width="180"
            // height="180"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
          >
            <path
              fill="#000"
              d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90Z"
            />
          </mask>
          <g mask="url(#b)">
            <path
              fill="#8F8F8F"
              d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90Z"
            />
            <path
              fill="url(#c)"
              d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 0 0 9.509-7.325Z"
            />
            <path fill="url(#d)" d="M127 54h-12v72h12V54Z" />
          </g>
        </g>
        <defs>
          <linearGradient
            id="c"
            x1="109"
            x2="144.5"
            y1="116.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#fff" />
            <stop offset="1" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="d"
            x1="121"
            x2="120.799"
            y1="54"
            y2="106.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#fff" />
            <stop offset="1" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h180v180H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
};

const slideUp =
  "opacity-0 animate-in motion-safe:animate-fade-up motion-safe:animate-out fade-out ease-in-out-sine duration-300";
const animationStyle = {
  animationFillMode: "forwards",
};

type FeatureCardProps = {
  cardIcon?: string;
  title: string;
  description: string;
  body: string;
  list: string[];
  footer: string[];
  badge?: string;
  className?: string;
  iconPosition?: "left" | "right";
  highlight?: boolean;
};
export function FeatureCard({
  cardIcon,
  title,
  description,
  body,
  list,
  footer,
  badge,
  className,
  iconPosition,
  highlight,
}: FeatureCardProps) {
  const bg = highlight
    ? "bg-gradient-to-tr from-indigo-500 via-indigo-300 to-indigo-200 dark:from-indigo-100/[0.1] dark:via-indigo-300/[0.3] dark:to-indigo-400/[0.2]"
    : "bg-gradient-to-br from-slate-100/[0.1] via-slate-300/[0.3] to-slate-400/[0.2]";

  const badgePosition =
    iconPosition === "right" ? "left-4 top-4" : "right-4 top-4";

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
        {cardIcon ? (
          <CardIcon cardIcon={cardIcon} iconPosition={iconPosition} />
        ) : null}
        {badge ? (
          <div className={cn("absolute", badge && badgePosition)}>
            <Badge className="bg-indigo-300">{badge}</Badge>
          </div>
        ) : null}
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
        {footer?.map((item, i) => {
          const Icon = ICONS[item as keyof typeof ICONS];
          return (
            <div key={item} className="flex gap-x-2 gap-y-1 text-left">
              <Icon className="w-3 opacity-80" />
              <p className="text-left">{item.toUpperCase()}</p>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
}

function CardIcon({
  cardIcon,
  iconPosition,
}: Pick<FeatureCardProps, "cardIcon" | "iconPosition">) {
  const _iconPosition = iconPosition || "left";
  const CardIcon = CARD_ICONS[cardIcon as keyof typeof cardIcon];

  return (
    <div
      className={cn("absolute top-6", {
        "left-6": _iconPosition === "left",
        "right-6": _iconPosition === "right",
      })}
    >
      <CardIcon width="48px" height="48px" />
    </div>
  );
}
