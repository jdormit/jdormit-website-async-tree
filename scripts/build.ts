import { FileMap, Tree } from "@weborigami/async-tree";
import site from "../src/site.ts";

export const build = async () => {
  // Build process writes the site resources to the build folder
  const buildTree = new FileMap(new URL("../dist", import.meta.url).pathname);
  await Tree.clear(buildTree); // Erase any existing files
  await Tree.assign(buildTree, site); // Copy site to build folder
  console.log("Build complete");
};

if (import.meta.main) {
  await build();
}
