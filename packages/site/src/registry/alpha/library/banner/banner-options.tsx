"use-client";

import { CookieSwitch } from "./banner-switch";
import { categoryDescriptions, tagDetails } from "./constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsent, useConsentDispatch } from "@trnsprncy/oss/dist/hooks";
import {
  AnalyticsTags,
  type BrowserCookies,
  type EssentialAnalyticsTagsTupleArrays,
  EssentialTags,
  type TagArray,
} from "@trnsprncy/oss/dist/types";
import { convertTagsToCookies } from "@trnsprncy/oss/dist/utils";
import { useCallback, useState } from "react";

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
    convertTagsToCookies(tags as EssentialAnalyticsTagsTupleArrays)
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

  const renderSwitch = (
    tagGroup: TagArray<EssentialTags> | TagArray<AnalyticsTags> | undefined,
    index: number
  ) => {
    const category = index ? "Analytics" : "Essential";
    if (!tagGroup?.length) return null;
    const isDisabled = category === "Essential";

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
