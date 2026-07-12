# baseui.sh

[![npm version](https://img.shields.io/npm/v/@wundercorp/baseui.svg)](https://www.npmjs.com/package/@wundercorp/baseui) [![npm downloads](https://img.shields.io/npm/dm/@wundercorp/baseui.svg)](https://www.npmjs.com/package/@wundercorp/baseui) [![CI](https://github.com/wundercorp/baseui/actions/workflows/ci.yml/badge.svg)](https://github.com/wundercorp/baseui/actions/workflows/ci.yml) [![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

A restrained, accessible component library and design language for React product interfaces.

baseui.sh is maintained as an independent open-source repository. Product applications consume it as a normal package rather than copying dashboard-specific CSS or importing source from another monorepo.

## Install

```bash
npm install @wundercorp/baseui
```

```bash
pnpm add @wundercorp/baseui
yarn add @wundercorp/baseui
bun add @wundercorp/baseui
```

```tsx
import { BaseUIProvider, Button, Card } from "@wundercorp/baseui";
import "@wundercorp/baseui/styles.css";

export function Application() {
  return (
    <BaseUIProvider theme="system">
      <Card>
        <Button>Continue</Button>
      </Card>
    </BaseUIProvider>
  );
}
```

## Repository structure

```text
apps/docs                 Living component catalogue
examples/vite-react       Consumer integration example
packages/react             Published @wundercorp/baseui package
docs                       Design, architecture, accessibility, and release guidance
.github                    CI, release, issue, and contribution automation
.changeset                 Versioning and changelog metadata
```

## Development

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
npm run verify:package
```

## Public package entry points

The root package exposes the complete API. Category subpaths make ownership and discovery clearer:

```tsx
import { Button } from "@wundercorp/baseui/actions";
import { Field, Input } from "@wundercorp/baseui/forms";
import { Dialog } from "@wundercorp/baseui/overlays";
import "@wundercorp/baseui/styles.css";
```

Tokens and icons are independently consumable:

```tsx
import { baseUITokens } from "@wundercorp/baseui/tokens";
import { Icon, PhosphorIcon } from "@wundercorp/baseui/icons";
import { RocketLaunchIcon } from "@wundercorp/baseui/phosphor";
import "@wundercorp/baseui/tokens.css";

<Icon name="settings" />
<PhosphorIcon icon={RocketLaunchIcon} label="Launch" />
```

## Design invariants

- Every interface surface uses the shared 4 px radius token; intrinsically circular indicators use the dedicated circle token.
- Semantic tokens are the public styling contract.
- Red is reserved for primary action, focus, current navigation, and selected state.
- Monospace is reserved for code, identifiers, commands, measurements, and machine-readable values.
- Borders establish structure before shadow is introduced.
- Every interactive component must have keyboard, focus-visible, disabled, and reduced-motion behavior.

## Releasing

Changesets drive versions and changelogs. The first package version is published interactively, then GitHub Actions publishes future versions through npm trusted publishing with OIDC and provenance. See [RELEASING.md](RELEASING.md) and [docs/publishing.md](docs/publishing.md).

## Open source

Licensed under Apache-2.0. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md), and [GOVERNANCE.md](GOVERNANCE.md).

## Naming

baseui.sh is a distinct styled design system. It is not affiliated with the existing Base UI or Base Web projects. See [docs/naming.md](docs/naming.md) before public launch.
