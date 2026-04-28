import { build } from "./build.ts";

const DIST_DIR = new URL("../dist", import.meta.url).pathname;

// Build runs on every hot reload (whenever any file in the import graph changes)
await build();

// Persist the server across hot reloads via globalThis
declare global {
  var server: ReturnType<typeof Bun.serve> | undefined;
}

globalThis.server ??= Bun.serve({
  port: 9000,
  fetch(req) {
    let path = new URL(req.url).pathname;
    if (path === "/") {
      path += "index.html";
    }
    const filePath = DIST_DIR + path;
    const file = Bun.file(filePath);
    return new Response(file);
  },
  error() {
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${globalThis.server.port}`);
