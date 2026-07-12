# baseui.sh

A restrained, accessible component library and design language for React product interfaces.

baseui.sh is maintained as an independent open-source repository. Product applications consume it as a normal package rather than copying dashboard-specific CSS or importing source from another monorepo.

## Install

```bash
npm install @baseui.sh/react
```

```tsx
import { BaseUIProvider, Button, Card } from "@baseui.sh/react";
import "@baseui.sh/react/styles.css";

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
packages/react             Published @baseui.sh/react package
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
import { Button } from "@baseui.sh/react/actions";
import { Field, Input } from "@baseui.sh/react/forms";
import { Dialog } from "@baseui.sh/react/overlays";
import "@baseui.sh/react/styles.css";
```

Tokens and icons are independently consumable:

```tsx
import { baseUITokens } from "@baseui.sh/react/tokens";
import { Icon } from "@baseui.sh/react/icons";
import "@baseui.sh/react/tokens.css";
```

## Design invariants

- Every visible corner uses the shared 4 px radius token.
- Semantic tokens are the public styling contract.
- Red is reserved for primary action, focus, current navigation, and selected state.
- Monospace is reserved for code, identifiers, commands, measurements, and machine-readable values.
- Borders establish structure before shadow is introduced.
- Every interactive component must have keyboard, focus-visible, disabled, and reduced-motion behavior.

## Releasing

Changesets drive package versions and changelogs. Publishing is handled by the release workflow using npm trusted publishing or an `NPM_TOKEN` repository secret. See [RELEASING.md](RELEASING.md).

## Open source

Licensed under Apache-2.0. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md), and [GOVERNANCE.md](GOVERNANCE.md).

## Naming

baseui.sh is a distinct styled design system. It is not affiliated with the existing Base UI or Base Web projects. See [docs/naming.md](docs/naming.md) before public launch.
