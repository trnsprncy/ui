import { Registry } from "./schema";

// @TODO: rename extension to library
const extension: Registry = [
  {
    name: "banner-content",
    type: "components:library",
    dependencies: [],
    registryDependencies: [],
    uiDependencies: [],
    files: ["library/banner/banner-content.tsx"],
  },
  {
    name: "banner-shell",
    type: "components:library",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: ["banner-content", "utils", "logic"],
    uiDependencies: [],
    files: ["library/banner/banner-shell.tsx"],
  },
  {
    name: "banner-switch",
    type: "components:library",
    dependencies: [],
    registryDependencies: ["switch"],
    uiDependencies: [],
    files: ["library/banner/banner-switch.tsx"],
  },
  {
    name: "switch-w-thumb",
    type: "components:library",
    dependencies: ["@radix-ui/react-switch"],
    registryDependencies: [],
    uiDependencies: [],
    files: ["library/banner/switch-w-thumb.tsx"],
  },
  {
    name: "trnsprncy-button",
    type: "components:library",
    dependencies: [],
    registryDependencies: ["banner-options"],
    uiDependencies: ["button", "popover"],
    files: ["library/banner/trnsprncy-button.tsx"],
  },
];

const demos: Registry = [];

const examples: Registry = [];

export const registry: Registry = [...extension, ...demos, ...examples];
