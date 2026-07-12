# Releasing

baseui.sh uses Changesets, npm trusted publishing, and npm provenance.

## Package identity

The published package is `@wundercorp/baseui`. Publishing under this name requires control of the npm organization and scope named `baseui.sh`.

If that npm organization is unavailable, rename the package before the first publication. The recommended fallback is `@wundercorp/baseui`.

## One-time bootstrap

Trusted publishing is configured from an existing npm package, so the first version must be published interactively.

1. Create or claim the `baseui.sh` organization on npm.
2. Enable two-factor authentication on the publishing account.
3. Log in and confirm the active account.
4. Validate and inspect the package.
5. Publish version `0.1.0` publicly.

```bash
npm login
npm whoami
npm run release:dry-run
cd packages/react
npm publish --access public --provenance=false
```

The local bootstrap publish disables provenance because npm provenance is generated from supported CI environments. Subsequent automated releases use trusted publishing and include provenance automatically.

## Configure trusted publishing

After the first publication, open the package settings on npm and add a GitHub Actions trusted publisher with these values:

```text
GitHub organization or user: wundercorp
Repository: baseui
Workflow filename: release.yml
Allowed action: npm publish
Environment: leave empty
```

The workflow is `.github/workflows/release.yml`. It uses a GitHub-hosted runner, OIDC permissions, Node 24, and npm 11.5.1 or newer. No `NPM_TOKEN` secret is required after trusted publishing is configured.

After verifying one automated release, configure the npm package to require two-factor authentication and disallow traditional publishing tokens.

## Pull requests

Run the following command for every user-visible package change:

```bash
npm run changeset
```

Choose patch, minor, or major according to semantic versioning and commit the generated Changeset file with the pull request.

## Version pull request

The release workflow opens or updates a Changesets version pull request on `main`. Merging that pull request updates versions and changelogs.

On the next workflow run, Changesets publishes the new package version to npm.

## Local release checks

```bash
npm ci
npm run release:dry-run
npm run verify:consumer
```

Inspect the package that npm would publish:

```bash
npm run release:inspect
```

## Consumer verification

After publishing, verify the public registry from a clean directory:

```bash
mkdir baseui-install-check
cd baseui-install-check
npm init -y
npm install react react-dom @wundercorp/baseui
npm view @wundercorp/baseui version
```
