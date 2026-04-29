import { Tree } from "@weborigami/async-tree";

const headerFile = new URL("./header.html", import.meta.url).pathname;

export default async function baseLayout(content: string) {
  return await Tree.indent`
  <!doctype html>
  <html lang="en">
    <head></head>
    ${await Bun.file(headerFile).text()}
    <body>
     ${content}
    </body>
  </html>
  `;
}
