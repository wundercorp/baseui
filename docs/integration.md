# Integration

## Standard React application

```bash
npm install @wundercorp/baseui
```

Import the stylesheet once near the application entry point:

```tsx
import "@wundercorp/baseui/styles.css";
```

Wrap the product surface:

```tsx
import { BaseUIProvider } from "@wundercorp/baseui";

root.render(
  <BaseUIProvider theme="system">
    <App />
  </BaseUIProvider>,
);
```

## Category imports

Category imports keep feature ownership explicit:

```tsx
import { Button } from "@wundercorp/baseui/actions";
import { Field, Input } from "@wundercorp/baseui/forms";
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
    "@wundercorp/baseui": "workspace:*"
  }
}
```

Published consumer repositories should pin a semver range instead.
