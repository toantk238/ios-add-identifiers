#! /usr/bin/env node

import yargs from "yargs";
import { StoryboardParser } from "./storyboard/storyboard_parser";

const argv: any = yargs
  .usage("hello")
  .command("gen", "Generate id of views")
  .demandOption(["f"])
  .nargs("f", 1)
  .alias("f", "file")
  .help("h")
  .alias("h", "help").argv;

const file = argv.file;

const main = async () => {
  const fileParser = new StoryboardParser(file);
  await fileParser.convert();
};
main();
