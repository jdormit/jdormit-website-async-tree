import { build } from "./build.ts";
import { stat } from "node:fs/promises";

const DIST_DIR = new URL("../dist", import.meta.url).pathname;

// Build runs on every hot reload (whenever any file in the import graph changes)
await build();

// Persist the server across hot reloads via globalThis
declare global {
  var server: ReturnType<typeof Bun.serve> | undefined;
}

globalThis.server ??= Bun.serve({
  port: 9000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const filePath = DIST_DIR + path;
    const lastSegment = path.split("/").at(-1) ?? "";
    const hasExtension = lastSegment.includes(".");
    let isDirectory = false;

    try {
      isDirectory = (await stat(filePath)).isDirectory();
    } catch {
      isDirectory = false;
    }

    const resolvedPath = isDirectory
      ? `${filePath}/index.html`
      : hasExtension
        ? filePath
        : `${filePath}.html`;

    const file = Bun.file(resolvedPath);
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(file);
  },
  error() {
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${globalThis.server.port}`);
