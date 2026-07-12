import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const packDirectory = mkdtempSync(join(tmpdir(), "baseui-package-"));

try {
  const output = execFileSync(
    "npm",
    ["pack", "--workspace", "@baseui.sh/react", "--pack-destination", packDirectory, "--json"],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
    },
  );
  const result = JSON.parse(output)[0];
  const required = new Set([
    "dist/index.js",
    "dist/index.d.ts",
    "dist/styles.css",
    "dist/tokens.css",
    "dist/phosphor.js",
    "dist/phosphor-ssr.js",
    "ICONS.md",
    "THIRD_PARTY_NOTICES.md",
    "component-manifest.json",
    "LICENSE",
    "README.md",
  ]);
  const files = new Set(result.files.map((entry) => entry.path));

  for (const path of required) {
    if (!files.has(path)) {
      throw new Error(`Packed package is missing ${path}`);
    }
  }

  if (result.unpackedSize > 1_000_000) {
    throw new Error(`Packed package is unexpectedly large: ${result.unpackedSize} bytes`);
  }

  console.log(`Verified ${result.filename}: ${result.files.length} files, ${result.unpackedSize} bytes unpacked.`);
} finally {
  rmSync(packDirectory, { recursive: true, force: true });
}
