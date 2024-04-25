"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { BannerTriggerGroup } from "@/registry/alpha/library/banner/logic/banner-trigger";
import { BareBannerTriggers } from "@/registry/alpha/library/banner/logic/bare-banner-trigger";
import {
  _buttons,
  background,
} from "@/registry/alpha/library/banner/utils/constants";
import React from "react";

export default function FakeBannerDemo({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center z-10 justify-center p-0.5 rounded-xl overflow-hidden"
      )}
    >
      <div
        className={cn(
          "bg-background max-w-3xl z-50 animate-in slide-in-from-bottom-60 animate-out slide-out-top-60 duration-1000 delay-200 rounded-xl overflow-hidden"
        )}
      >
        <div className={cn(background, "border-2 border-muted/30")}>
          <Icons.logo className="w-12 h-12" />
          {children}
          <BannerTriggerGroup className="gap-y-1 md:gap-x-1">
            <BareBannerTriggers
              tags={[
                [
                  "functionality_storage",
                  "personalization_storage",
                  "security_storage",
                ],
                [
                  "ad_personalization",
                  "ad_storage",
                  "ad_user_data",
                  "analytics_storage",
                ],
              ]}
              buttons={_buttons}
              open={open}
              onClose={() => setOpen(false)}
            />
          </BannerTriggerGroup>
        </div>
      </div>
    </div>
  );
}
