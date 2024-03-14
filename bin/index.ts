#! /usr/bin/env node

import { readFile, writeFile } from "fs/promises";
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

  // buttons.forEach((it) => {
  //   console.log(getChildNode(it, "rect").outerHTML);
  // });

  const missingIdentifiersViews = Array.from(buttons).filter((button) => {
    const accessibility = getChildNode(button, "accessibility");
    return accessibility == undefined;
  });

  var index = 0;
  const doc = dom.window.document;
  missingIdentifiersViews.forEach((it) => {
    const newEl = doc.createElement("accessibility");
    newEl.setAttribute("key", "accessibilityConfiguration");
    newEl.setAttribute("identifier", `button-${index}`);
    index++;
    it.appendChild(newEl);
  });

  // missingIdentifiersViews.forEach((it) => {
  //   console.log(it.outerHTML);
  // });
  const xmlOutput = dom.serialize()
  console.log(`content = \n${xmlOutput}`);
  await writeFile(file, xmlOutput);
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
