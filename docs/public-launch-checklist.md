# Public launch checklist

## Identity

- Confirm control of the `baseui.sh` domain.
- Create and verify the intended GitHub organization.
- Create and verify the intended npm organization or scope.
- Complete trademark and naming review.
- Keep the full `baseui.sh` name in public-facing copy.

## Repository

- Replace placeholder repository, issue, discussion, sponsorship, and email metadata where necessary.
- Enable branch protection for `main`.
- Require the CI workflow before merge.
- Enable GitHub Discussions if it will be used for support.
- Configure issue labels and repository topics.

## npm

- Confirm that `@wundercorp/baseui` is available and controlled by the project.
- Configure npm trusted publishing or add an `NPM_TOKEN` secret.
- Require two-factor authentication for maintainers.
- Confirm provenance appears on the first public release.

## Documentation

- Deploy `apps/docs` to the selected host.
- Add analytics only after a privacy review.
- Publish the support and security contact routes.
- Review every example for neutral, project-independent language.

## First release

- Merge a changeset for version `0.1.0` if publishing through the automated workflow.
- Run `npm ci` and `npm run ci` in the release environment.
- Run `npm publish --workspace @wundercorp/baseui --dry-run --access public`.
- Publish, verify installation from the public registry, and create a signed GitHub release.
