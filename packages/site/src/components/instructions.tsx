/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kxL0zu7EIdu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const PREVIEW = true;

const INSTRUCTION_STEPS = [
  {
    title: "Install our package",
    description:
      "Start by installing trnsprncy into your existing project with your package manager.",
    // code: "$ npm i @trnsprncy/oss",
  },
  {
    title: "Add the Next.js component",
    description:
      "Import and use the `<ConsentProvder/>` React context component into your app's layout or your main file.",
    // code: "import { ConsentProvider } from '@trnsprncy/oss'",
    link: {
      href: "#",
      text: "For full examples and further reference, please refer to our documentation",
    },
  },
  {
    title: "Create your UI",
    description:
      "You can simply use our prebuilt UI components or create your own using our primitives.",
    note: "You can either copy and paste components or use our Shadcn-inspired CLI to generate them.",
  },
];

export function Instructions() {
  return (
    <div className="flex flex-col space-y-8 px-6 md:p-0">
      <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-x-4">
        {INSTRUCTION_STEPS.map((step, index) => (
          <InstructionCard key={index} order={index + 1} {...step} />
        ))}
      </div>
    </div>
  );
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

type InstructionCardProps = {
  order: number;
  title: string;
  description: string;
  code?: string;
  link?: {
    href: string;
    text: string;
  };
  note?: string;
};

function InstructionCard({
  order,
  title,
  description,
  code,
  link,
  note,
}: InstructionCardProps) {
  return (
    <Card className="flex-1 w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{order}</Badge>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
        {code ? (
          <pre className="p-4 rounded-md mt-4 text-xs bg-muted/60 max-w-xs overflow-x-hidden">
            <code>{code}</code>
          </pre>
        ) : null}
        {link ? (
          <Link
            className="text-xs text-blue-600 hover:underline mt-4 block"
            href={link?.href ?? ""}
          >
            {link?.text}
            <ExternalLinkIcon className="inline-block ml-1" />
          </Link>
        ) : null}
        {note ? (
          <p className="text-xs text-yellow-600 hover:underline mt-4 block">
            {note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
