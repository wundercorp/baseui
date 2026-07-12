import { copyFile } from "node:fs/promises";

await Promise.all([
  copyFile(new URL("../src/styles.css", import.meta.url), new URL("../dist/styles.css", import.meta.url)),
  copyFile(new URL("../src/tokens.css", import.meta.url), new URL("../dist/tokens.css", import.meta.url)),
]);
