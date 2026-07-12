import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const workingDirectory = mkdtempSync(join(tmpdir(), "baseui-consumer-"));
const packDirectory = join(workingDirectory, "package");
const reactVersions = ["18.2.0", "19.2.0"];

const smokeSource = `import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BaseUIProvider } from "@baseui.sh/react/foundations";
import { Button } from "@baseui.sh/react/actions";
import { Field, Input } from "@baseui.sh/react/forms";
import { Card } from "@baseui.sh/react/data-display";
import { Dialog } from "@baseui.sh/react/overlays";
import { baseUITokens } from "@baseui.sh/react/tokens";
import { ArrowRightIcon, Icon, PhosphorIcon } from "@baseui.sh/react/icons";
import manifest from "@baseui.sh/react/manifest.json" with { type: "json" };

const markup = renderToStaticMarkup(
  React.createElement(
    BaseUIProvider,
    { theme: "dark" },
    React.createElement(
      Card,
      null,
      React.createElement(Field, { label: "Name" }, React.createElement(Input, { defaultValue: "baseui.sh" })),
      React.createElement(Button, { leadingIcon: React.createElement(Icon, { name: "check" }) }, "Save"),
      React.createElement(PhosphorIcon, { icon: ArrowRightIcon, label: "Continue" }),
      React.createElement(Dialog, { open: false, title: "Hidden", onClose() {} }),
    ),
  ),
);

if (!markup.includes("bui-root") || !markup.includes("bui-button")) {
  throw new Error("Expected component classes were not rendered");
}
if (baseUITokens.radius !== 4) {
  throw new Error("The public radius token must remain 4");
}
const entryCount = Object.values(manifest.categories).reduce((total, entries) => total + entries.length, 0);
if (entryCount < 80) {
  throw new Error("The public manifest is incomplete");
}
console.log("Fresh consumer import passed");
`;

try {
  mkdirSync(packDirectory, { recursive: true });
  const packOutput = execFileSync(
    npmCommand,
    ["pack", "--workspace", "@baseui.sh/react", "--pack-destination", packDirectory, "--json"],
    { cwd: repositoryRoot, encoding: "utf8" },
  );
  const packed = JSON.parse(packOutput)[0];
  const tarball = join(packDirectory, packed.filename);

  for (const reactVersion of reactVersions) {
    const consumerDirectory = join(workingDirectory, `consumer-react-${reactVersion}`);
    mkdirSync(consumerDirectory, { recursive: true });
    writeFileSync(
      join(consumerDirectory, "package.json"),
      JSON.stringify({ name: `baseui-consumer-react-${reactVersion}`, private: true, type: "module" }, null, 2),
    );
    execFileSync(
      npmCommand,
      ["install", "--no-audit", "--no-fund", tarball, `react@${reactVersion}`, `react-dom@${reactVersion}`],
      { cwd: consumerDirectory, stdio: "pipe" },
    );
    writeFileSync(join(consumerDirectory, "smoke.mjs"), smokeSource);
    execFileSync(process.execPath, ["smoke.mjs"], { cwd: consumerDirectory, stdio: "inherit" });

    const installedPackage = join(consumerDirectory, "node_modules", "@baseui.sh", "react");
    for (const path of ["dist/styles.css", "dist/tokens.css", "dist/index.d.ts", "dist/phosphor.js", "dist/phosphor-ssr.js"]) {
      readFileSync(join(installedPackage, path));
    }
    console.log(`Verified ${packed.name}@${packed.version} with React ${reactVersion}.`);
  }
} finally {
  rmSync(workingDirectory, { recursive: true, force: true });
}
