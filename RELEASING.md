# Releasing

baseui.sh uses Changesets and npm provenance.

## Pull requests

Run `npm run changeset` for any user-visible change to `@baseui.sh/react`. Select patch, minor, or major based on semantic versioning.

## Version pull request

The release workflow opens or updates a version pull request. Merging it updates package versions and changelogs.

## Publish

On the next run, the release workflow builds, validates, and publishes the package with public access and provenance.

Repository configuration must provide either npm trusted publishing for the GitHub workflow or an `NPM_TOKEN` secret with publish access to the `@baseui.sh` scope.

## Manual dry run

```bash
npm ci
npm run ci
npm pack --workspace @baseui.sh/react
npm publish --workspace @baseui.sh/react --dry-run --access public
```
