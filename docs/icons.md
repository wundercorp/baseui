# Icons

baseui.sh uses Phosphor Icons as its canonical icon family. `@phosphor-icons/react` is a production dependency of `@baseui.sh/react`.

## Semantic icons

Use `Icon` for stable concepts owned by the design system. Semantic names isolate application code from upstream glyph naming changes.

```tsx
import { Icon } from "@baseui.sh/react/icons";

<Icon name="search" />
<Icon name="warning" weight="fill" label="Warning" />
```

Decorative icons are hidden from assistive technology. Set `label` when the icon itself communicates information.

## Full Phosphor library

```tsx
import { PhosphorIcon } from "@baseui.sh/react/icons";
import { RocketLaunchIcon } from "@baseui.sh/react/phosphor";

<PhosphorIcon icon={RocketLaunchIcon} label="Launch" />
```

For server components and SSR-only environments:

```tsx
import { RocketLaunchIcon } from "@baseui.sh/react/phosphor/ssr";
```

For the smallest development graph, consumers may import individual upstream glyph modules directly from `@phosphor-icons/react/dist/csr/<IconName>`.

## Provider defaults

`BaseUIProvider` supplies Phosphor defaults for direct Phosphor components. Override them with `iconDefaults`.

```tsx
<BaseUIProvider iconDefaults={{ weight: "regular", size: 20 }}>
  <Application />
</BaseUIProvider>
```
