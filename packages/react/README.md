# @wundercorp/baseui

The React implementation of the baseui.sh design language.

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

## Entry points

- `@wundercorp/baseui` — all components, hooks, types, tokens, and icons.
- `@wundercorp/baseui/foundations`
- `@wundercorp/baseui/actions`
- `@wundercorp/baseui/forms`
- `@wundercorp/baseui/data-display`
- `@wundercorp/baseui/feedback`
- `@wundercorp/baseui/navigation`
- `@wundercorp/baseui/disclosure`
- `@wundercorp/baseui/overlays`
- `@wundercorp/baseui/patterns`
- `@wundercorp/baseui/hooks`
- `@wundercorp/baseui/icons`
- `@wundercorp/baseui/phosphor`
- `@wundercorp/baseui/phosphor/ssr`
- `@wundercorp/baseui/tokens`
- `@wundercorp/baseui/styles.css`
- `@wundercorp/baseui/tokens.css`
- `@wundercorp/baseui/manifest.json`

See the repository README and `docs/` for architecture, accessibility, theming, contribution, and release guidance.

## Icons

Phosphor Icons is the canonical icon library and is installed as a production dependency. Use the semantic baseui.sh icon names for stable product concepts:

```tsx
import { Icon } from "@wundercorp/baseui/icons";

<Icon name="settings" />
<Icon name="success" weight="fill" />
```

Use `PhosphorIcon` when a product needs a Phosphor glyph outside the semantic registry:

```tsx
import { PhosphorIcon } from "@wundercorp/baseui/icons";
import { RocketLaunchIcon } from "@wundercorp/baseui/phosphor";

<PhosphorIcon icon={RocketLaunchIcon} label="Launch" />
```

Server-rendered and React Server Component environments can import the complete SSR set from `@wundercorp/baseui/phosphor/ssr`. See `ICONS.md`.
