import { $ } from "bun";
import { FileMap, Tree } from "@weborigami/async-tree";
import site from "../src/site.ts";

export const build = async () => {
  // Build process writes the site resources to the build folder
  const buildDir = new URL("../dist", import.meta.url).pathname;
  const buildTree = new FileMap(buildDir);
  await Tree.clear(buildTree); // Erase any existing files
  await Tree.assign(buildTree, await site()); // Copy site to build folder
  await $`bunx --bun prettier --ignore-path='' --write ${buildDir}`.quiet();
  console.log("Build complete");
};

if (import.meta.main) {
  await build();
}
