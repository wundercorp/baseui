import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const expectedExports = [
  "BaseUIProvider",
  "Button",
  "Card",
  "Input",
  "Table",
  "Dialog",
  "Drawer",
  "Sidebar",
  "CommandMenu",
  "useDisclosure",
  "iconNames",
];

test("exports the public component surface", async () => {
  const library = await import("../dist/index.js");
  for (const exportName of expectedExports) {
    assert.ok(library[exportName], `${exportName} must be exported`);
    assert.ok(["function", "object"].includes(typeof library[exportName]));
  }
  assert.equal(library.iconNames.length, 35);
  assert.equal(new Set(library.iconNames).size, 35);
});

test("uses the shared four pixel radius for visible component corners", async () => {
  const [stylesheet, tokens] = await Promise.all([
    readFile(new URL("../dist/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../dist/tokens.css", import.meta.url), "utf8"),
  ]);
  assert.match(tokens, /--bui-radius:\s*4px/);
  const radiusDeclarations = [...stylesheet.matchAll(/border-radius:\s*([^;]+);/g)].map((match) => match[1].trim());
  assert.ok(radiusDeclarations.length > 20);
  assert.deepEqual([...new Set(radiusDeclarations)], ["var(--bui-radius)"]);
});

test("contains reduced motion and focus-visible support", async () => {
  const stylesheet = await readFile(new URL("../dist/styles.css", import.meta.url), "utf8");
  assert.match(stylesheet, /prefers-reduced-motion/);
  assert.match(stylesheet, /:focus-visible/);
});

test("manifest entries map to public runtime exports", async () => {
  const [library, manifestText] = await Promise.all([
    import("../dist/index.js"),
    readFile(new URL("../component-manifest.json", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestText);
  const names = Object.values(manifest.categories).flat();
  assert.equal(names.length, new Set(names).size);
  for (const exportName of names) {
    assert.ok(library[exportName], `${exportName} must exist in the public package`);
  }
  assert.equal(manifest.radius, "4px");
});

test("supports category entry points", async () => {
  const [actions, forms, overlays, foundations, tokens, icons] = await Promise.all([
    import("../dist/actions/index.js"),
    import("../dist/forms/index.js"),
    import("../dist/overlays/index.js"),
    import("../dist/foundations/index.js"),
    import("../dist/tokens.js"),
    import("../dist/icons.js"),
  ]);
  assert.equal(typeof actions.Button, "object");
  assert.equal(typeof forms.Input, "object");
  assert.equal(typeof overlays.Dialog, "function");
  assert.equal(typeof foundations.BaseUIProvider, "function");
  assert.equal(tokens.baseUITokens.radius, 4);
  assert.equal(icons.iconNames.length, 35);
});

test("is configured as a public package", async () => {
  const packageText = await readFile(new URL("../package.json", import.meta.url), "utf8");
  const packageJson = JSON.parse(packageText);
  assert.equal(packageJson.private, undefined);
  assert.equal(packageJson.publishConfig.access, "public");
  assert.equal(packageJson.publishConfig.provenance, true);
  assert.equal(packageJson.peerDependencies.react, ">=18.2.0 <20");
});
