# baseui.sh Design Language

## Purpose

baseui.sh is a product-interface language for technical software, operational dashboards, developer tools, and enterprise workflows. It should feel calm, precise, credible, and direct. The system avoids decorative AI conventions, oversized softness, excessive gradients, glass effects, and novelty motion.

## Core principles

### Clarity before decoration

The visual hierarchy is created by typography, spacing, alignment, contrast, and grouping. Decorative effects cannot compensate for unclear information architecture.

### Structure before elevation

Borders define most groups and regions. Shadows are reserved for interactive lift and floating layers. Static cards should not appear detached from the page without reason.

### One accent, several meanings

The red product accent identifies the primary action, keyboard focus, selected navigation, and active state. Success, warning, danger, and information use dedicated semantic colors. Accent red is not used as general decoration.

### Compact geometry

The global radius is exactly `4px`. It applies to controls, cards, overlays, status marks, avatars, progress tracks, code surfaces, and navigation states. Product code must not introduce alternate radii.

### Technical detail where it belongs

Monospace typography is reserved for code, URLs, commands, model names, request IDs, measurements, and system values. Interface labels, headings, body copy, navigation, and actions use the sans-serif family.

## Foundations

### Color

The light theme uses warm neutral grays rather than blue grays. The dark theme preserves contrast without using pure black. Semantic colors always include a foreground and a soft surface.

Primary token groups:

- Canvas and surfaces
- Primary, secondary, tertiary, inverse text
- Default, strong, and focus borders
- Accent, hover, active, and soft accent
- Success, warning, danger, and information
- Low, medium, and high elevation

### Typography

The type hierarchy is intentionally compact:

- Display: editorial product statement
- H1: page title
- H2: major section title
- H3: subsection title
- H4: card and workflow title
- H5: dense component title
- Large body: introduction and explanatory copy
- Default body: interface content
- Small body: supporting data and metadata
- Eyebrow: category and context label

Headings use tight tracking. Body text maintains comfortable line height. Uppercase is restricted to small categorical labels and badges.

### Spacing

The base unit is `4px`. Common component spacing is 8, 12, 16, 20, 24, 32, 40, 48, 64, and 80 pixels. Small spacing changes should use an existing token rather than an arbitrary value.

### Controls

Controls use three heights:

- Small: 32px
- Medium: 40px
- Large: 48px

The medium size is the default. Small controls are intended for toolbars, dense tables, and secondary actions. Large controls are intended for prominent forms and onboarding.

### Elevation

- Low: static card separation
- Medium: dropdown, popover, interactive lift
- High: dialog, drawer, toast, command menu

No elevation should be added to a component that already has sufficient hierarchy through spacing and borders.

### Motion

Standard interaction motion is 100–240ms using an ease-out curve. Movement should communicate state change. Components must respect `prefers-reduced-motion`.

## Component behavior

### Actions

Primary buttons should appear once per decision region. Secondary and ghost actions should preserve clear priority. Destructive actions use danger styling and should not be placed immediately beside the primary action without adequate separation or confirmation.

### Forms

Every form control should have a visible label. Placeholder text is supporting information, not a replacement for a label. Error messages are placed after the control and associated with the field state. Required fields use a text indicator in addition to validation.

### Data display

Tables are used for comparison across consistent columns. Lists are used for heterogeneous records and action-oriented rows. Description lists are used for key-value metadata. Metric cards should contain one primary value, one label, and at most one comparison statement.

### Feedback

Semantic feedback must include a textual title or status. Color cannot be the only signal. Alerts belong in document flow. Toasts confirm background or completed actions and should not contain essential information that disappears.

### Navigation

Navigation labels use plain language and sentence case. Active state uses accent color and a soft surface. Breadcrumbs indicate hierarchy, not interaction history. Tabs switch views within the same context and should not be used as primary site navigation.

### Overlays

Dialogs interrupt a task and require a decision. Drawers provide contextual detail without leaving the current page. Popovers hold compact contextual content. Dropdown menus contain actions. Tooltips explain controls but never contain required instructions.

## Accessibility baseline

- Keyboard-visible focus uses a two-pixel accent outline with offset.
- Controls use native semantic elements whenever possible.
- Dialog and drawer layers close with Escape and expose dialog semantics.
- Status components include text labels.
- Form errors use alert semantics.
- Loading states expose status semantics.
- Reduced motion disables nonessential animation.
- Color contrast should meet WCAG AA for normal text and interactive components.

## Responsive behavior

Desktop layouts may use two to four columns. Tablet layouts collapse large grids to two columns. Mobile layouts use one column, full-width form actions, simplified app navigation, and edge-aligned overlays. Horizontal tables remain scrollable rather than compressing unreadably.

## Contribution rules

A new component must:

1. Use semantic tokens only.
2. Use the shared 4px radius.
3. Support keyboard focus and disabled behavior where interactive.
4. Include light and dark treatment.
5. Include responsive behavior when layout-dependent.
6. Be demonstrated in `/baseui`.
7. Export a stable public type.
8. Avoid a runtime dependency unless the capability cannot be implemented safely in the package.
