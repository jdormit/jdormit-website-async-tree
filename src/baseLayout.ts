import { Tree } from "@weborigami/async-tree";

const headerFile = new URL("./header.html", import.meta.url).pathname;

interface BaseLayoutOptions {
  title: string;
  pageStyle?: string;
}

export default async function baseLayout(
  content: string,
  { title, pageStyle }: BaseLayoutOptions,
) {
  const currentYear = new Date().getFullYear();
  const pageStyleLink = pageStyle
    ? `<link rel="stylesheet" href="/styles/${pageStyle}">`
    : "";

  return await Tree.text`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap">
      <link rel="stylesheet" href="/styles/variables.css">
      <link rel="stylesheet" href="/styles/global.css">
      ${pageStyleLink}
    </head>
    <body>
      ${await Bun.file(headerFile).text()}
      ${content}
      <footer>
        <p>© Jeremy Dormitzer 2020${currentYear > 2020 ? ` - ${currentYear}` : ""}</p>
      </footer>
    </body>
  </html>
  `;
}
