import fs from "fs/promises";
import path from "path";

/**
 * Recursively walk a directory asynchronously and obtain all file names (with full path).
 *
 * @param dir Folder name you want to recursively process
 * @param done Callback function, returns all files with full path.
 * @param filter Optional filter to specify which files to include,
 *   e.g. for json files: (f: string) => /.json$/.test(f)
 * @see https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search/50345475#50345475
 */
export const walk = async (dir: string, filter?: (f: string) => boolean) => {
  let results: string[] = [];
  const files = await fs.readdir(dir, {
    encoding: "utf-8",
    withFileTypes: false,
    recursive: true,
  });
  for (let index = 0; index < files.length; index++) {
    const file = path.resolve(dir, files[index]);

    const stat = await fs.stat(file);
    if (!stat.isDirectory()) {
      if (typeof filter === "undefined" || (filter && filter(file))) {
        results.push(file);
      }
    }
  }
  return results;
};
