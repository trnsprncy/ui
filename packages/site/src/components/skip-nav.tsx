import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// used by the root layout
export const SkipNav = () => {
  return (
    <Link
      className={cn(
        "absolute left-0 p-3 m-3 transition -translate-y-16 focus:translate-y-0 z-20",
        buttonVariants({ variant: "ghost" })
      )}
      href="#main-content"
    >
      Skip Navigation
    </Link>
  );
};
