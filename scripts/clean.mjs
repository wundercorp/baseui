import { rm } from "node:fs/promises";

await Promise.all([
  rm(new URL("../packages/react/dist", import.meta.url), { recursive: true, force: true }),
  rm(new URL("../apps/docs/dist", import.meta.url), { recursive: true, force: true }),
  rm(new URL("../examples/vite-react/dist", import.meta.url), { recursive: true, force: true }),
  rm(new URL("../.artifacts", import.meta.url), { recursive: true, force: true }),
]);
