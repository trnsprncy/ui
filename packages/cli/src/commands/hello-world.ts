import { ascii_logo_tease } from "./ascii-logo";
import { Command } from "commander";

export const helloWorldCommand = new Command()
  .name("hello-world")
  .description("Prints a greeting message")
  .argument("[components...]", "the components to add")
  .action(async (components) => {
    console.log(ascii_logo_tease);
    process.exit(0);
  });
