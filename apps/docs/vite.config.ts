import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const source = (relativePath: string) =>
  fileURLToPath(new URL(`../../packages/react/src/${relativePath}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@baseui\.sh\/react\/styles\.css$/, replacement: source("styles.css") },
      { find: /^@baseui\.sh\/react\/tokens\.css$/, replacement: source("tokens.css") },
      { find: /^@baseui\.sh\/react\/phosphor\/ssr$/, replacement: source("phosphor-ssr.ts") },
      { find: /^@baseui\.sh\/react\/phosphor$/, replacement: source("phosphor.ts") },
      { find: /^@baseui\.sh\/react\/tokens$/, replacement: source("tokens.ts") },
      { find: /^@baseui\.sh\/react\/icons$/, replacement: source("icons.tsx") },
      { find: /^@baseui\.sh\/react\/foundations$/, replacement: source("foundations/index.ts") },
      { find: /^@baseui\.sh\/react\/actions$/, replacement: source("actions/index.ts") },
      { find: /^@baseui\.sh\/react\/forms$/, replacement: source("forms/index.ts") },
      { find: /^@baseui\.sh\/react\/data-display$/, replacement: source("data-display/index.ts") },
      { find: /^@baseui\.sh\/react\/feedback$/, replacement: source("feedback/index.ts") },
      { find: /^@baseui\.sh\/react\/navigation$/, replacement: source("navigation/index.ts") },
      { find: /^@baseui\.sh\/react\/disclosure$/, replacement: source("disclosure/index.ts") },
      { find: /^@baseui\.sh\/react\/overlays$/, replacement: source("overlays/index.ts") },
      { find: /^@baseui\.sh\/react\/patterns$/, replacement: source("patterns/index.ts") },
      { find: /^@baseui\.sh\/react\/hooks$/, replacement: source("hooks/index.ts") },
      { find: /^@baseui\.sh\/react$/, replacement: source("index.ts") },
    ],
  },
});
