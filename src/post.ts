import formatDate from "./formatDate";

export default function post(post) {
  return `
  <main>
    <h1>${post.data.title}</h1>
    <p>Posted on ${formatDate(post.data.pubDate)}</p>
    <article>
      ${post.body}
    </article>
  </main>
  `;
}
