# Repository separation

The original implementation was developed inside an application monorepo. This repository removes that coupling.

## Removed coupling

- No application routes, authentication, dashboard state, cloud APIs, or product-specific build scripts.
- No references to the original monorepo workspace names.
- No imports from application source paths.
- No deployment requirement beyond standard static documentation hosting and npm publication.

## Consumer contract

Applications integrate through the package exports and semantic CSS variables only. The documentation app and Vite example both consume the workspace package as external applications would.

## Migration from the original monorepo

1. Publish `@baseui.sh/react` from this repository.
2. Replace the old workspace package reference with a semver dependency.
3. Keep `@baseui.sh/react/styles.css` imported once at the application entry point.
4. Remove the copied package directory from the application monorepo.
5. Use automated dependency updates for future releases.
