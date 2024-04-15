import { registry } from "@/registry/registry";
import { registryIndexSchema } from "@/registry/schema";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * Responsible for fetching and parsing the bundled registry
 *
 * @export
 * @return {*}
 */
export async function getParsedRegistry() {
  try {
    const registryData = registryIndexSchema.parse(registry);
    return registryData;
  } catch (error) {
    console.error("Failed to fetch registry:", error);
  }
}

/**
 * Retrieves component information from the component registry based on the provided component names.
 *
 * @export
 * @param componentRegistry - The component registry to search in.
 * @param componentName - An array of component names to retrieve information for.
 * @returns An array of component objects matching the provided component names.
 */
export async function getComponentInfo(
  componentRegistry: z.infer<typeof registryIndexSchema>,
  componentName: string[] | undefined
) {
  if (!componentName) {
    console.log("no components selected");
    process.exit(1);
  }
  const tree: z.infer<typeof registryIndexSchema> = [];
  for (const name of componentName) {
    const component = componentRegistry.find(
      (component: { name: string }) => component.name === name
    );
    if (!component) {
      // @FIXME: If we're going to exit, we should do so with a non-zero exit code
      // i.e. process.exit(1)?
      console.log(`Component ${name} not found in registry`);
      continue;
    } else {
      // only push the component if it's found
      tree.push(component);
    }
  }
  return tree;
}

export function printContentsOfFile(basePath: string, filePath: string) {
  const combinedPath: string = path.join(basePath, filePath);
  try {
    const fileContents: string = fs.readFileSync(
      path.resolve(__dirname, combinedPath),
      "utf8"
    );
    return fileContents;
  } catch (error) {
    console.error(`Error reading file ${combinedPath}:`, error);
  }
}
