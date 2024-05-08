import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

const bgSubtle =
  "before:content-[' '] before:absolute before:inset-0 before:dark:gradient-card before:gradient-card-dark before:rotate-180 before:bg-opacity-20 backdrop-blur-xl";

export function SubtleCard({ title, body }: { title: string; body: string[] }) {
  return (
    <Card
      className={cn(
        "w-full relative overflow-hidden rounded-lg shadow-xl",
        bgSubtle,
        "dark:text-muted-foreground/40 text-muted/40"
      )}
    >
      <CardHeader className="relative mb-4">
        <p className="absolute m-0 p-0 -top-2 -left-1 text-4xl text-center font-bold">
          {title}
        </p>
      </CardHeader>
      <CardContent className="relative w-full flex flex-col gap-y-4">
        {body?.length
          ? body.map((text, i) => (
              <p
                key={i}
                className="text-xs tracking-wide dark:text-muted-foreground/80 text-muted drop-shadow-lg"
              >
                {text}
              </p>
            ))
          : null}
      </CardContent>
    </Card>
  );
}
