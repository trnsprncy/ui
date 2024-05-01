import { BannerSwitch } from "./banner-switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EssentialTags,
  NonEssentialTags,
  type BrowserCookies,
  type TagArray,
} from "@trnsprncy/oss/dist/types";
import {
  categoryDescriptions,
  tagDetails,
} from "@trnsprncy/oss/dist/utils/data";

type CategorizedOptions = {
  tagGroup: TagArray<EssentialTags> | TagArray<NonEssentialTags> | undefined;
  index: number;
  updateCookiesState: (cookies: Partial<BrowserCookies>) => void;
  isChecked: (boolean | undefined)[];
  cookies: Partial<BrowserCookies>;
};
/**
 * This component renders the categorized options for the consent banner.\
 * It orchestrates the rendering of the essential and nonEssential options.
 * nested within the categorized headers.
 *
 * @export
 * @param {CategorizedOptions} {
 *   tagGroup: TagArray<EssentialTags> | TagArray<NonEssentialTags> | undefined,
 *   index: number,
 *   updateCookiesState: (cookies: Partial<BrowserCookies>) => void,
 *   isChecked: (boolean | undefined)[],
 *   cookies: Partial<BrowserCookies>,
 * }
 * @return {*}
 */
export const CategorizedOptions = ({
  tagGroup,
  index,
  updateCookiesState,
  isChecked,
  cookies,
}: CategorizedOptions) => {
  const category = index ? "NonEssential" : "Essential";
  if (!tagGroup?.length) return null;
  const isDisabled = category === "Essential";

  return (
    <div key={category} className="p-2">
      <BannerSwitch
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
            <p className="ml-auto pr-2 text-foreground/50">
              Show all {category.toLowerCase()} cookies
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <>
              {Array.isArray(tagGroup) &&
                tagGroup.map((tag) => {
                  return (
                    <BannerSwitch
                      type="tag"
                      key={tag}
                      className="ml-4 p-2"
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
