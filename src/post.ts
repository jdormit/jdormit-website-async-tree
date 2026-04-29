import baseLayout from "./baseLayout";
import formatDate from "./formatDate";

export default async function post(post) {
  const content = `
  <main>
    <h1>${post.data.title}</h1>
    <p class="post-date">Posted on ${formatDate(post.data.pubDate)}</p>
    <article>
      ${post.body}
    </article>
  </main>
  `;
  return baseLayout(content, { title: post.data.title, pageStyle: "post.css" });
}
