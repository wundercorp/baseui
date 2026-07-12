# Integration

## Standard React application

```bash
npm install @baseui.sh/react
```

Import the stylesheet once near the application entry point:

```tsx
import "@baseui.sh/react/styles.css";
```

Wrap the product surface:

```tsx
import { BaseUIProvider } from "@baseui.sh/react";

root.render(
  <BaseUIProvider theme="system">
    <App />
  </BaseUIProvider>,
);
```

## Category imports

Category imports keep feature ownership explicit:

```tsx
import { Button } from "@baseui.sh/react/actions";
import { Field, Input } from "@baseui.sh/react/forms";
```

## Existing applications

Adopt incrementally:

1. Install the package and import tokens.
2. Wrap the target application boundary with `BaseUIProvider`.
3. Replace local primitives first: button, input, card, badge, alert.
4. Replace navigation and overlay patterns after primitive behavior is stable.
5. Remove duplicate product tokens only after all usages migrate.

## Monorepos

Use a normal workspace dependency during development:

```json
{
  "dependencies": {
    "@baseui.sh/react": "workspace:*"
  }
}
```

Published consumer repositories should pin a semver range instead.
