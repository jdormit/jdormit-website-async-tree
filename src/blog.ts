import { Tree } from "@weborigami/async-tree";
import excerptHtml from "excerpt-html";
import posts from "./posts";
import formatDate from "./formatDate";

const renderPost = async (post, postName) => {
  const excerpt = excerptHtml(post.body, { pruneLength: 500 })
  return `
  <li>
    <h4>${post.data.title}</h4>
    <p>Posted on ${formatDate(post.data.pubDate)}</p>
    <p>${excerpt}</p>
    <a href="/blog/${postName}">Read more</a>
  </li>
  `
}

export default await Tree.text`
<main>
  <h1>Jeremy Dormitzer's blog</h1>
  <ul>
    ${await Tree.map(posts, renderPost)}
  </ul>
</main>
`
