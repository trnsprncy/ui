"use-client";

import { CategorizedOptions } from "../categorized-options";
import { cn } from "@/lib/utils";
import { useConsent, useConsentDispatch } from "@trnsprncy/oss/dist/hooks";
import {
  type BrowserCookies,
  type EssentialTagsTupleArrays,
} from "@trnsprncy/oss/dist/types";
import { convertTagsToCookies } from "@trnsprncy/oss/dist/utils";
import { useCallback, useState } from "react";

/**
 * Responsible for building up and syncing the options object from cookies with the consent manager context
 * Delegates renderSwitch to render out the options and assign functionality.
 *
 * @export
 * @return {*} {React.ReactNode}
 */
export function BannerOptions() {
  const { handleConsentUpdate } = useConsentDispatch();
  const { tags } = useConsent(); // provide only the options that the user has selected
  const [cookies, setCookies] = useState<Partial<BrowserCookies>>(() =>
    convertTagsToCookies(tags as EssentialTagsTupleArrays)
  );

  const [ESSENTIAL, ANALYTICS] = tags;
  const [isChecked, setIsChecked] = useState([
    ESSENTIAL?.every((tag) => !!cookies[tag as keyof typeof cookies]),
    ANALYTICS?.every((tag) => !!cookies[tag as keyof typeof cookies]),
  ]);

  const updateCookiesState = useCallback(
    (cookies: Partial<BrowserCookies>) => {
      setCookies((prev) => {
        const updatedCookies = { ...prev, ...cookies };

        setIsChecked([
          ESSENTIAL?.every(
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
    [ESSENTIAL, ANALYTICS, handleConsentUpdate]
  );

  return (
    <div className="grid gap-2 min-w-2xl w-full">
      <div
        className={cn(
          "w-full p-2 bg-background/40 backdrop-blur-md rounded-md z-10 [&:not(:first-child)]:border-t transition-opacity duration-150"
        )}
      >
        {tags.map((tagGroup, index) => (
          <CategorizedOptions
            key={index}
            tagGroup={tagGroup}
            index={index}
            updateCookiesState={updateCookiesState}
            isChecked={isChecked}
            cookies={cookies}
          />
        ))}
      </div>
    </div>
  );
}
