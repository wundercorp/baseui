# @baseui.sh/react

The React implementation of the baseui.sh design language.

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

## Entry points

- `@baseui.sh/react` — all components, hooks, types, tokens, and icons.
- `@baseui.sh/react/foundations`
- `@baseui.sh/react/actions`
- `@baseui.sh/react/forms`
- `@baseui.sh/react/data-display`
- `@baseui.sh/react/feedback`
- `@baseui.sh/react/navigation`
- `@baseui.sh/react/disclosure`
- `@baseui.sh/react/overlays`
- `@baseui.sh/react/patterns`
- `@baseui.sh/react/hooks`
- `@baseui.sh/react/icons`
- `@baseui.sh/react/phosphor`
- `@baseui.sh/react/phosphor/ssr`
- `@baseui.sh/react/tokens`
- `@baseui.sh/react/styles.css`
- `@baseui.sh/react/tokens.css`
- `@baseui.sh/react/manifest.json`

See the repository README and `docs/` for architecture, accessibility, theming, contribution, and release guidance.

## Icons

Phosphor Icons is the canonical icon library and is installed as a production dependency. Use the semantic baseui.sh icon names for stable product concepts:

```tsx
import { Icon } from "@baseui.sh/react/icons";

<Icon name="settings" />
<Icon name="success" weight="fill" />
```

Use `PhosphorIcon` when a product needs a Phosphor glyph outside the semantic registry:

```tsx
import { PhosphorIcon } from "@baseui.sh/react/icons";
import { RocketLaunchIcon } from "@baseui.sh/react/phosphor";

<PhosphorIcon icon={RocketLaunchIcon} label="Launch" />
```

Server-rendered and React Server Component environments can import the complete SSR set from `@baseui.sh/react/phosphor/ssr`. See `ICONS.md`.
