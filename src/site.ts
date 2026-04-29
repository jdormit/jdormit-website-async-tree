import baseLayout from "./baseLayout.ts";

export default async function site() {
  return {
    "index.html": await baseLayout(
      await Bun.file(new URL("./index.html", import.meta.url).pathname).text(),
    ),
  };
}
