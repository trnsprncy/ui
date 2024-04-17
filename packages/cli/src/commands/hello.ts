import { ascii_logo } from "./ascii-logo";
import {
  getComponentInfo,
  fetchFileContentFromGithub
} from "@/utils/registry/index";
// import { renderTitle } from "@/utils/render-title.js";
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { z } from "zod";

const highlights = {
  info: (text: string) => chalk.cyan.underline(text),
  success: (text: string) => chalk.greenBright(text),
  error: (text: string) => chalk.redBright(text),
  warning: (text: string) => chalk.yellowBright(text),
};

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
});

export const helloCommand = new Command()
  .name("hello")
  .description("Prints a greeting message")
  .argument("[components...]", "the components to add")
  .action(async (components) => {
    console.log(ascii_logo);
    const options = addOptionsSchema.parse({ components });
    if (!options.components?.length) {
      // validate command arguments
      ora(
        highlights.warning(`no component was requested!\n  exiting.....`)
      ).fail();
      process.exit(1);
    }

    const selectedComponents = await getComponentInfo(options.components);
    // // get the path of the selected component
    const pathArray: string[] = selectedComponents
      .map((obj) => obj.files)
      .flat();

    const data = await fetchFileContentFromGithub(pathArray[0]);
    console.log(data);
    process.exit(0);
  });
