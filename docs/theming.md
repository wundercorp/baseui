# Theming

## Provider themes

`BaseUIProvider` accepts `light`, `dark`, or `system`.

```tsx
<BaseUIProvider theme="system">
  <Application />
</BaseUIProvider>
```

## Semantic variables

Custom product components should use semantic variables such as:

```css
.product-panel {
  border: 1px solid var(--bui-color-border);
  border-radius: var(--bui-radius);
  background: var(--bui-color-surface);
  color: var(--bui-color-text);
  padding: var(--bui-space-5);
}
```

Do not consume raw light or dark palette values in product code.

## Token-only usage

```ts
import { baseUITokens } from "@baseui.sh/react/tokens";
```

```css
@import "@baseui.sh/react/tokens.css";
```

## Extension policy

Applications may add semantic aliases for domain-specific needs. They should not redefine the radius or component-state contract globally.
