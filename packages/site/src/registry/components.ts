import { Registry } from "./schema";

// @TODO rename extension to library
const extension: Registry = [
  {
    name: "banner-shell",
    type: "components:library",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: ["banner-trigger"],
    uiDependencies: [],
    files: ["library/banner/banner-shell.tsx"],
  },
  // {
  //   name: "banner-options",
  //   type: "components:library",
  //   dependencies: ["trnsprncy/oss"],
  //   registryDependencies: ["banner-switch"],
  //   uiDependencies: ["accordion", "button"],
  //   files: ["library/banner/banner-options.tsx"],
  // },
  {
    name: "banner-switch",
    type: "components:library",
    dependencies: [],
    registryDependencies: [],
    uiDependencies: ["switch"],
    files: ["library/banner/banner-switch.tsx"],
  },
  {
    name: "banner-trigger",
    type: "components:library",
    dependencies: ["@radix-ui/react-slot", "trnsprncy/oss"],
    registryDependencies: ["trnsprncy-button"],
    uiDependencies: ["button"],
    files: ["library/banner/banner-switch.tsx"],
  },
  {
    name: "trnsprncy-button",
    type: "components:library",
    dependencies: ["@radix-ui/react-slot", "trnsprncy/oss"],
    registryDependencies: ["banner-options"],
    uiDependencies: ["button", "popover"],
    files: ["library/banner/trnsprncy-button.tsx"],
  },
];

const demos: Registry = [];

const examples: Registry = [];

export const registry: Registry = [...extension, ...demos, ...examples];
