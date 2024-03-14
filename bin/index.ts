#! /usr/bin/env node

import { readFile } from "fs/promises";
import { inspect } from "util";
import { JSDOM } from "jsdom";

const main = async () => {
  const file =
    "/mnt/Data/Workspace/4.MobileHealth/5.iOS/appointment-ios/MaNaDr/Main/MainTabs/Profile/ProfileSetting.storyboard";
  const contentFile = await readFile(file, { encoding: "utf-8" });
  // console.log(`contentFile = ${contentFile}`);
  // const parser = new XMLParser({
  //   ignoreAttributes: false,
  // });
  // const json = parser.parse(contentFile);
  const dom = new JSDOM(contentFile, { contentType: "text/xml" });
  const buttons = dom.window.document.querySelectorAll("button");

  buttons.forEach((it) => {
    console.log(getChildNode(it, "rect").outerHTML);
  });

  const missingIdentifiersViews = Array.from(buttons).filter((button) => {
    const accessibility = getChildNode(button, "accessibility");
    return accessibility == undefined;
  });
  console.log(`buttons size = ${missingIdentifiersViews.length}`);

  var index = 0;
  missingIdentifiersViews.forEach((it) => {
    const newThing = new JSDOM(
      `<accessibility key="accessibilityConfiguration" identifier="button_${index}"/>`,
      { contentType: "text/xml" },
    );
    index++;
  });
};

function getChildNode(
  node: HTMLButtonElement,
  tag: string,
): ChildNode | undefined {
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let item = childNodes[i];
    if (item.nodeName == tag) return item;
  }
  return undefined;
}
main();
