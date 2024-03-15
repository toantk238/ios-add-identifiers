#! /usr/bin/env node

import yargs from "yargs";
import { StoryboardParser } from "./storyboard/storyboard_parser";
import { walk } from "@utils/files";
import { inspect } from "util";

const argv: any = yargs
  .usage("hello")
  .command("gen", "Generate id of views")
  // .demandOption(["f"])
  // .nargs("f", 1)
  .alias("f", "file")
  .alias("d", "dir")
  .help("h")
  .alias("h", "help").argv;

const file = argv.file;
const dir = argv.dir;

async function internalMain() {
  if (file) {
    const fileParser = new StoryboardParser(file);
    await fileParser.convert();
  }

  if (dir) {
    // console.log(`dir = ${dir}`);
    const files = await walk(dir, (f) => {
      if (f.endsWith(".storyboard")) {
        return true;
      }
      return false;
    });

    for (const file of files) {
      const conveter = new StoryboardParser(file);
      await conveter.convert();
    }
  }
}

const main = async () => {
  internalMain();
};
main();
