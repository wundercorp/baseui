import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const libraryPackageJsonPath = join(
  repositoryRoot,
  "packages",
  "react",
  "package.json",
);
const libraryPackageJson = JSON.parse(
  readFileSync(libraryPackageJsonPath, "utf8"),
);
const packageName = libraryPackageJson.name;
const packagePathSegments = packageName.split("/");
const workingDirectory = mkdtempSync(join(tmpdir(), "baseui-consumer-"));
const packDirectory = join(workingDirectory, "package");
const reactVersions = ["18.2.0", "19.2.0"];

const smokeSource = `import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BaseUIProvider } from "${packageName}/foundations";
import { Button } from "${packageName}/actions";
import { Field, Input } from "${packageName}/forms";
import { Card } from "${packageName}/data-display";
import { Dialog } from "${packageName}/overlays";
import { baseUITokens } from "${packageName}/tokens";
import { ArrowRightIcon, Icon, PhosphorIcon } from "${packageName}/icons";
import manifest from "${packageName}/manifest.json" with { type: "json" };

const markup = renderToStaticMarkup(
  React.createElement(
    BaseUIProvider,
    { theme: "dark" },
    React.createElement(
      Card,
      null,
      React.createElement(
        Field,
        { label: "Name" },
        React.createElement(Input, { defaultValue: "baseui.sh" }),
      ),
      React.createElement(
        Button,
        { leadingIcon: React.createElement(Icon, { name: "check" }) },
        "Save",
      ),
      React.createElement(PhosphorIcon, {
        icon: ArrowRightIcon,
        label: "Continue",
      }),
      React.createElement(Dialog, {
        open: false,
        title: "Hidden",
        onClose() {},
      }),
    ),
  ),
);

if (!markup.includes("bui-root") || !markup.includes("bui-button")) {
  throw new Error("Expected component classes were not rendered");
}

if (baseUITokens.radius !== 4) {
  throw new Error("The public radius token must remain 4");
}

const entryCount = Object.values(manifest.categories).reduce(
  (total, entries) => total + entries.length,
  0,
);

if (entryCount < 80) {
  throw new Error("The public manifest is incomplete");
}

console.log("Fresh consumer import passed");
`;

try {
  mkdirSync(packDirectory, { recursive: true });

  const packOutput = execFileSync(
    npmCommand,
    [
      "pack",
      "--workspace",
      packageName,
      "--pack-destination",
      packDirectory,
      "--json",
    ],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
    },
  );

  const packed = JSON.parse(packOutput)[0];
  const tarball = join(packDirectory, packed.filename);

  for (const reactVersion of reactVersions) {
    const consumerDirectory = join(
      workingDirectory,
      `consumer-react-${reactVersion}`,
    );

    mkdirSync(consumerDirectory, { recursive: true });

    writeFileSync(
      join(consumerDirectory, "package.json"),
      JSON.stringify(
        {
          name: `baseui-consumer-react-${reactVersion}`,
          private: true,
          type: "module",
        },
        null,
        2,
      ),
    );

    execFileSync(
      npmCommand,
      [
        "install",
        "--no-audit",
        "--no-fund",
        tarball,
        `react@${reactVersion}`,
        `react-dom@${reactVersion}`,
      ],
      {
        cwd: consumerDirectory,
        stdio: "pipe",
      },
    );

    writeFileSync(join(consumerDirectory, "smoke.mjs"), smokeSource);

    execFileSync(process.execPath, ["smoke.mjs"], {
      cwd: consumerDirectory,
      stdio: "inherit",
    });

    const installedPackage = join(
      consumerDirectory,
      "node_modules",
      ...packagePathSegments,
    );

    const requiredPackageFiles = [
      "dist/styles.css",
      "dist/tokens.css",
      "dist/index.d.ts",
      "dist/phosphor.js",
      "dist/phosphor-ssr.js",
    ];

    for (const requiredPackageFile of requiredPackageFiles) {
      readFileSync(join(installedPackage, requiredPackageFile));
    }

    console.log(
      `Verified ${packed.name}@${packed.version} with React ${reactVersion}.`,
    );
  }
} finally {
  rmSync(workingDirectory, {
    recursive: true,
    force: true,
  });
}
