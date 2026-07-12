# Contributing

Thank you for contributing to baseui.sh.

## Before opening a pull request

1. Open or reference an issue for significant API or visual changes.
2. Keep public behavior backward-compatible unless the change is explicitly marked breaking.
3. Add or update tests for changed behavior.
4. Add a changeset for user-visible package changes.
5. Update documentation and the component catalogue when the public API changes.

## Local validation

```bash
npm install
npm run check
npm run test
npm run build
npm run verify:package
```

## Component acceptance criteria

A component is not complete until it has:

- Semantic HTML and accessible naming.
- Keyboard operation and focus-visible behavior.
- Disabled, loading, empty, invalid, success, warning, and danger states where applicable.
- Light, dark, and system theme behavior.
- Responsive behavior at narrow widths.
- Reduced-motion behavior.
- Public TypeScript types.
- Catalogue coverage and usage documentation.
- Tests for the public contract.

## Design constraints

The 4 px radius, semantic token contract, and typography roles are system invariants. Proposals to change them require an RFC issue and maintainer approval.
