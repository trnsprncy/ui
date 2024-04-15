import { Registry } from "./schema";

const extension: Registry = [
  {
    name: "banner-shell",
    type: "components:library",
    dependencies: ["@trnsprncy/oss", "@radix-ui/react/slot", "@radix-ui/react-slot", "lucide-react", ], // include radix & 3td party dependencies
    registryDependencies: ["accordion", "button", "popover", "switch"],
    files: ["library/banner/banner-shell.tsx"],
  },
];

const demos: Registry = [];

const examples: Registry = [];

export const registry: Registry = [...extension, ...demos, ...examples];
