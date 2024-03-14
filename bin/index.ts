#! /usr/bin/env node

import { readFile } from "fs/promises";
import { inspect } from "util";
import { JSDOM } from "jsdom";

const main = async () => {
  console.log("ABC");

  const file =
    "/mnt/Data/Workspace/4.MobileHealth/5.iOS/appointment-ios/MaNaDr/Modules/User/User Profile/UserProfile.storyboard";
  const contentFile = await readFile(file, { encoding: "utf-8" });
  // console.log(`contentFile = ${contentFile}`);
  // const parser = new XMLParser({
  //   ignoreAttributes: false,
  // });
  // const json = parser.parse(contentFile);
  const dom = new JSDOM(contentFile, { contentType: "text/xml" });
  const button = dom.window.document.querySelectorAll("button")[0];
  const temp = button.outerHTML
  console.log(inspect(temp));
};

main();
