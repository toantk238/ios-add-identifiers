import { JSDOM } from "jsdom";
import { readFile, writeFile } from "fs/promises";
import { getChildNode, getChildNodes } from "@utils/xml";
import { inspect } from "util";
import { exists } from "fs";

export class StoryboardParser {
  private file: string;
  private count: number = 0;
  private existedIds = new Set();
  private dom: JSDOM = new JSDOM();

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
    this.dom = new JSDOM(contentFile, { contentType: "text/xml" });
    // missingIdentifiersViews.forEach((it) => {
    //   console.log(it.outerHTML);
    // });
    this.insertId(
      "button",
      ["textLocalizedKey", "normalTitleLocalizedKey"],
      "btn",
    );
    this.insertId("textField", ["placeholderLocalizedKey"], "tf");
    this.insertId("switch", [], "switch");
    this.insertId("label", [], "label");
    const xmlOutput = this.dom.serialize();
    // console.log(`content = \n${xmlOutput}`);
    const firstLine = '<?xml version="1.0" encoding="UTF-8"?>';
    const modifiedContent = firstLine + "\n" + xmlOutput + "\n";
    await writeFile(this.file, modifiedContent);
  }

  insertId(tagInXml: string, keyPath: string[], idPrefix: string) {
    const buttons = this.dom.window.document.querySelectorAll(tagInXml);

    // buttons.forEach((it) => {
    //   console.log(getChildNode(it, "rect").outerHTML);
    // });

    const missingIdentifiersViews = Array.from(buttons).filter((button) => {
      // getLocalizedKeyValue(button);
      return undefinedIdentifier(button);
    });

    var index = 0;
    const doc = this.dom.window.document;
    missingIdentifiersViews.forEach((it) => {
      const localizedKey = getLocalizedKeyValue(it, keyPath);
      var suffix = localizedKey ?? (this.count++).toString();
      // suffix = this.findAvailableSuffix(suffix);
      const generatedId = `${idPrefix}-${suffix}`;
      const newEl = doc.createElement("accessibility");
      newEl.setAttribute("key", "accessibilityConfiguration");
      newEl.setAttribute("identifier", generatedId);
      index++;
      it.appendChild(newEl);
    });
  }

  // findAvailableSuffix(tag: string): string {
  //   if (!this.existedIds.has(tag)) {
  //     this.existedIds.add(tag);
  //     return tag;
  //   }
  //
  //   var temp = tag;
  //   while (this.existedIds.has(temp)) {
  //     this.count++;
  //     temp = `${temp}-${this.count}`;
  //   }
  //   this.existedIds.add(temp);
  //
  //   return temp;
  // }
}

function undefinedIdentifier(node: Element) {
  const accessibility = getChildNode(node, "accessibility");
  return accessibility == undefined;
}

function getLocalizedKeyValue(
  node: Element,
  keyPath: string[],
): string | null | undefined {
  const temp: any = getChildNode(node, "userDefinedRuntimeAttributes");
  if (temp == undefined) return undefined;

  const localizedKeys = getChildNodes(
    temp,
    "userDefinedRuntimeAttribute",
  ).filter((x) => {
    return keyPath.includes(x.getAttribute("keyPath") ?? "");
  });
  const localizedKeyTag =
    localizedKeys.length > 0 ? localizedKeys[0] : undefined;

  return localizedKeyTag?.getAttribute("value");
}
