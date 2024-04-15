"use client";

import {
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbSeparator,
} from "@/components/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DocsBreadcrumbProps = {
  slug: string[];
};

// used by the docs pages
export const DocsBreadcrumb = ({ slug }: DocsBreadcrumbProps) => {
  const pathname = usePathname();
  const pathItems = pathname.split("/");
  pathItems.shift();
  return (
    <BreadCrumb
      variant={"ghost"}
      className="flex items-center justify-start gap-1"
    >
      {pathItems.map((path, index) => {
        const isActive = slug.join("/") === path;
        return (
          <div
            key={`${index}`}
            className="flex items-center justify-start gap-1"
          >
            <Link href={`/${pathItems.slice(0, index + 1).join("/")}`}>
              <BreadCrumbItem
                index={index + 1}
                isActive={isActive}
                activeVariant={{ variant: "secondary" }}
                className={cn(
                  "h-7 px-1 capitalize text-foreground/50 select-none focus-within:bg-transparent",
                  {
                    "text-foreground": isActive,
                  }
                )}
              >
                {path.replaceAll("-", " ")}
              </BreadCrumbItem>
            </Link>
            {index !== pathItems.length - 1 && (
              <BreadCrumbSeparator key={`${index}-separator`} />
            )}
          </div>
        );
      })}
    </BreadCrumb>
  );
};
