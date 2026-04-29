import { Tree } from "@weborigami/async-tree";
import baseLayout from "./baseLayout";
import blog from "./blog";
import post from "./post";
import posts from "./posts";

export default async function site() {
  return {
    "index.html": await baseLayout(
      await Bun.file(new URL("./index.html", import.meta.url).pathname).text(),
    ),
    "blog/index.html": await baseLayout(blog),
    blog: await Tree.map(posts, post),
  };
}
