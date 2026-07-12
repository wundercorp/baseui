# Architecture

## Repository boundary

baseui.sh is an independent repository. Consumer applications depend on the published package and never import source files from this repository.

## Workspace roles

- `packages/react` contains the public package.
- `apps/docs` is a first-party consumer and living catalogue.
- `examples/vite-react` is a minimal external-consumer simulation.
- `docs` contains governance and design-system contracts.

## Package layers

1. **Tokens** — semantic CSS custom properties and a typed JavaScript token object.
2. **Foundations** — provider, layout, typography, and accessibility primitives.
3. **Components** — actions, forms, data display, feedback, navigation, disclosure, and overlays.
4. **Patterns** — composed product structures such as application shell, page header, command menu, and data toolbar.
5. **Manifest** — machine-readable component inventory for documentation and tooling.

## Public imports

Consumers should import only from package export paths. Paths under `src/` and `dist/internal/` are private implementation details.

## Styling boundary

The complete stylesheet is scoped to `.bui-root`. Applications can import tokens alone when creating custom components, but product CSS must use semantic variables rather than palette literals.

## Compatibility

The package is ESM-first, supports React 18.2 and React 19, and emits TypeScript declarations. React and React DOM remain peer dependencies so consumer applications retain one React runtime.
