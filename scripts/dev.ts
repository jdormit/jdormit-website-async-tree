import { stat } from "node:fs/promises";
import { build } from "./build.ts";

const DIST_DIR = new URL("../dist", import.meta.url).pathname;

// Build runs on every hot reload (whenever any file in the import graph changes)
await build();

// Persist the server across hot reloads via globalThis
declare global {
  var server: ReturnType<typeof Bun.serve> | undefined;
}

async function isDirectory(path: string) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

globalThis.server ??= Bun.serve({
  port: 9000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    let filePath = DIST_DIR + path;
    let file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }

    const htmlFile = Bun.file(`${filePath}.html`);
    if (await htmlFile.exists()) {
      return new Response(htmlFile);
    }

    if (await isDirectory(filePath)) {
      filePath = `${filePath}/index.html`;
    }

    file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("Not found", { status: 404 });
  },
  error() {
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${globalThis.server.port}`);
