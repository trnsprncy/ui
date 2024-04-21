import { registryIndexSchema, Registry } from "@/registry/schema";
import { decide, hasSrcPath } from "@/utils/get-json";
import fs from "fs";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import path from "path";
import { z } from "zod";

const GithubUrl = "https://raw.githubusercontent.com/trnsprncy/ui/main";
const baseUrl =
  process.env.COMPONENTS_REGISTRY_URL ?? "https://trnsprncy.vercel.app";
const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

/**
 * Responsible for fetching the bundled registry
 *
 * @export
 * @return {*}
 */

export async function fetchRegistry() {
  try {
    const response = await fetch(`${baseUrl}/registry/index.json`, {
      agent,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch registry from ${baseUrl}.`);
  }
}

/**
 * Retrieves component information from the component registry based on the provided component names.
 *
 * @export
 * @param componentName - An array of component names to retrieve information for.
 * @returns An array of component objects matching the provided component names.
 */
export async function getComponentInfo(componentName: string[] | undefined) {
  const componentRegistry = registryIndexSchema.parse(await fetchRegistry());

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

export function getPaths(components: Registry) {
  const pathArray: string[] = components.map((obj) => obj.files).flat();
  return pathArray;
}

export async function fetchFileContentFromGithub(
  paths: string[]
): Promise<string[]> {
  try {
    const contents: string[] = [];

    for (const path of paths) {
      const rawUrl = `${GithubUrl}/packages/site/src/registry/alpha/${path}`;

      const response = await fetch(rawUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch file '${path}': ${response.statusText}`
        );
      }

      const content = await response.text();
      contents.push(content);
    }

    return contents;
  } catch (error) {
    console.error("Error fetching files from GitHub:", error);
    throw error;
  }
}

export function createFiles(fileNames: string[], contents: string[]): void {
  const srcPath = hasSrcPath() ? "true" : "false";
  const basePath = decide[srcPath];

  if (fileNames.length !== contents.length) {
      console.error("Number of file names and contents must be equal");
      return;
  }

  try {
      fileNames.forEach((fileName, index) => {
          const filePath = path.join(basePath, fileName + ".tsx");
          fs.writeFileSync(filePath, contents[index], 'utf8');
          console.log(`File ${fileName} created successfully.`);
      });
  } catch (err) {
      console.error("Error creating files:", err);
  }
}