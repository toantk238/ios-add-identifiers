import { JSDOM } from "jsdom";
import { readFile, writeFile } from "fs/promises";
import { getChildNode } from "@utils/xml";

export class StoryboardParser {
  private file: string;

  public constructor(file: string) {
    this.file = file;
  }

  public async convert() {
    const contentFile = await readFile(this.file, { encoding: "utf-8" });
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
    const xmlOutput = dom.serialize();
    console.log(`content = \n${xmlOutput}`);
    await writeFile(this.file, xmlOutput);
  }
}
