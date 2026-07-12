# Publishing baseui.sh to npm

## Recommended package name

The repository currently publishes `@baseui.sh/react`.

This is the strongest branded installation command:

```bash
npm install @baseui.sh/react
```

It requires an npm organization named `baseui.sh`. npm scopes belong to npm users or organizations and are independent from GitHub organizations and domain ownership.

If the `baseui.sh` scope cannot be claimed, use:

```text
@wundercorp/baseui
```

Changing the name after the first public release creates a migration burden, so settle the scope before publishing version `0.1.0`.

## First publication checklist

```bash
npm login
npm whoami
npm run release:dry-run
cd packages/react
npm publish --access public --provenance=false
```

The package already includes:

- Public access configuration
- npm registry configuration
- ESM output
- TypeScript declarations
- Explicit package exports
- CSS and token exports
- React peer dependencies
- Runtime Phosphor dependency
- Repository, issue, license, funding, and homepage metadata
- A restricted `files` allowlist

## Automated releases

After the initial publication, configure npm trusted publishing for:

```text
wundercorp/baseui
.github/workflows/release.yml
```

Future releases follow this flow:

1. A contributor adds a Changeset.
2. The change merges to `main`.
3. GitHub Actions updates the release pull request.
4. The release pull request is merged.
5. GitHub Actions publishes through npm OIDC.
6. npm records provenance linking the package to the GitHub workflow.

## Installation documentation

Show the standard command first:

```bash
npm install @baseui.sh/react
```

Also support the common alternatives:

```bash
pnpm add @baseui.sh/react
yarn add @baseui.sh/react
bun add @baseui.sh/react
```

The minimum integration is:

```tsx
import { BaseUIProvider, Button } from "@baseui.sh/react";
import "@baseui.sh/react/styles.css";

export function Application() {
  return (
    <BaseUIProvider theme="system">
      <Button>Continue</Button>
    </BaseUIProvider>
  );
}
```

## Post-publish checks

```bash
npm view @baseui.sh/react version
npm view @baseui.sh/react dist-tags
npm view @baseui.sh/react repository
npm install @baseui.sh/react
```

Create a GitHub release for each stable version and keep the npm package README focused on installation, compatibility, styling, entry points, and migration notes.
