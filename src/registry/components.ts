import { Registry } from "./schema";

const extension: Registry = [
  {
    name: "boop",
    type: "components:library",
    dependencies: [""], // include radix & 3td party dependencies
    files: ["library/boop.tsx"],
  },
];

const demos: Registry = [];

const examples: Registry = [];

export const registry: Registry = [...extension, ...demos, ...examples];
