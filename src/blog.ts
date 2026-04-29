import { Tree } from "@weborigami/async-tree";
import excerptHtml from "excerpt-html";
import baseLayout from "./baseLayout";
import posts from "./posts";
import formatDate from "./formatDate";

const renderPost = async (post, postName) => {
  const excerpt = excerptHtml(post.body, { pruneLength: 500 });
  const slug = postName.replace(/\.html$/, "");
  return `
  <li>
    <h2><a href="/blog/${slug}">${post.data.title}</a></h2>
    <p class="post-date">Posted on ${formatDate(post.data.pubDate)}</p>
    <p>${excerpt}</p>
    <a class="read-more" href="/blog/${slug}">Read more...</a>
  </li>
  `;
};

const content = await Tree.text`
<main>
  <h1>Jeremy Dormitzer's blog</h1>
  <ul>
    ${await Tree.map(posts, renderPost)}
  </ul>
</main>
`;

export default await baseLayout(content, {
  title: "Jeremy Dormitzer's blog",
  pageStyle: "blog.css",
});
