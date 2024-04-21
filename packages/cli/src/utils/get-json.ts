import fs from "fs";
import path from "path";

export const TRNSPRNCY_PATH = "@/components/ui/trnsprncy";

export const COMPONENTS_JSON_PATH = path.join(process.cwd(), "components.json");
export function parseComponentsJson() {
  if (fs.existsSync(COMPONENTS_JSON_PATH)) {
    return JSON.parse(fs.readFileSync(COMPONENTS_JSON_PATH, "utf-8"));
  } else {
    return {};
  }
}

const TSCONFIG_JSON_PATH = path.join(process.cwd(), "tsconfig.json");
export function parseTsconfigJson() {
  if (fs.existsSync(TSCONFIG_JSON_PATH)) {
    return JSON.parse(fs.readFileSync(TSCONFIG_JSON_PATH, "utf-8"));
  } else {
    return {};
  }
}

export function hasSrcPath(): boolean {
  try {
    const tsconfig = parseTsconfigJson();
    const paths = tsconfig.compilerOptions?.paths || {};
    return !!paths["@/*"] && paths["@/*"][0] === "./src/*";
  } catch (error) {
    console.error("Error parsing tsconfig:", error);
    return false;
  }
}

export const mkdir_components = (path: string) => {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err);
    }
  });
};

export const decide = {
  true: path.join(process.cwd(), "/src", TRNSPRNCY_PATH.replace("@", "")),
  false: path.join(process.cwd(), TRNSPRNCY_PATH.replace("@", "")),
};
