import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// used by the root layout
export const SkipNav = ({ href }: { href?: string }) => {
  return (
    <Link
      className={cn(
        "absolute left-0 p-3 m-3 transition -translate-y-24 opacity-0 focus:translate-y-4 focus:opacity-1 z-20",
        buttonVariants({ variant: "default" })
      )}
      href={href ?? "#main-content"}
    >
      Skip Navigation
    </Link>
  );
};
