import { Tree } from "@weborigami/async-tree";

export default async function baseLayout(content: string) {
  return await Tree.indent`
  <!doctype html>
  <html lang="en">
    <head></head>
    <body>
     ${content}
    </body>
  </html>
  `;
}
