# Accessibility baseline

baseui.sh treats accessibility as a component contract rather than an optional visual state.

## Required behavior

- Interactive controls use native elements whenever a native semantic exists.
- Keyboard users receive a visible two-pixel focus outline with a two-pixel offset.
- Disabled controls remain perceivable and cannot be activated.
- Form fields support visible labels, descriptions, required state, and alert-based validation errors.
- Dialogs and drawers expose dialog semantics, identify their title, support Escape dismissal, and render a modal backdrop.
- Active navigation uses `aria-current`.
- Loading indicators expose status semantics.
- Alerts use alert or status semantics according to urgency.
- Icon-only controls require an accessible label.
- Decorative icons are hidden from assistive technology.
- Motion is removed or reduced when `prefers-reduced-motion` is enabled.
- Color is never the only indicator of success, warning, danger, selection, or progress.

## Consumer responsibilities

Components cannot infer product-specific language or relationships. Consumers must provide accurate labels, headings, descriptions, table headers, error copy, and alternative text. Overlay trigger ownership and focus restoration should be tested in the final product workflow.

## Review checklist

1. Navigate the complete workflow using only a keyboard.
2. Confirm focus order follows reading order.
3. Confirm every icon-only action has an accessible name.
4. Confirm form errors identify the affected control.
5. Confirm text and component contrast meet WCAG AA.
6. Confirm content remains usable at 200% browser zoom.
7. Confirm responsive layouts do not hide essential actions.
8. Confirm reduced-motion mode removes nonessential movement.
