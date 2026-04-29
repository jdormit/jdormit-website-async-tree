import { FileMap, Tree } from "@weborigami/async-tree";
import baseLayout from "./baseLayout";
import blog from "./blog";
import post from "./post";
import posts from "./posts";

const styles = new FileMap(new URL("./styles", import.meta.url).pathname);

export default async function site() {
  return {
    "index.html": await baseLayout(
      await Bun.file(new URL("./index.html", import.meta.url).pathname).text(),
      { title: "Jeremy Dormitzer", pageStyle: "index.css" },
    ),
    "blog/index.html": blog,
    blog: await Tree.map(posts, post),
    styles,
  };
}
