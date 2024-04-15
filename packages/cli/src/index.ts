#! /usr/bin/env node
import { helloWorldCommand } from "./commands/hello-world.js";
import { helloCommand } from "./commands/hello.js";
import { init } from "./commands/init.js";
import { packageJSON } from "@/utils/package-json.js";
import { Command } from "commander";

(async () => {
  const program = new Command();

  program
    .name(">")
    .description("⚡️ transparency/ui.")
    .version(
      packageJSON.version,
      "-v, --version",
      "display the version number"
    );

  program
    .addCommand(init)
    .addCommand(helloCommand)
    .addCommand(helloWorldCommand);
  program.parse();
})();
