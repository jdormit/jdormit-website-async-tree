import { FileMap, Tree, toString } from "@weborigami/async-tree";
import matter from "gray-matter";

const posts = new FileMap(new URL("./posts", import.meta.url).pathname);
const parsedPosts = await Tree.map(posts, (post) => matter(toString(post)));
const renderedPosts = await Tree.mapExtension(
  parsedPosts,
  ".md->.html",
  (post) => {
    return {
      data: post.data,
      body: Bun.markdown.html(post.content, { collapseWhitespace: true }),
    };
  },
);
const sortedPosts = await Tree.sort(renderedPosts, (post) => post.data.pubDate);

export default await Tree.reverse(sortedPosts);
