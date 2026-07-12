# Changelog

## 0.2.0

### Minor Changes

- ebab655: Adopt Phosphor Icons as the canonical production icon dependency, migrate built-in component glyphs to Phosphor, add semantic and full-library icon entry points, and preserve circular spinner geometry.

All notable changes to baseui.sh are documented here.

## 0.1.0

- Established semantic light, dark, and system themes.
- Established the immutable 4px radius and 4px spacing foundations.
- Added 88 React components, three hooks, and a Phosphor-backed semantic icon layer.
- Added typed JavaScript tokens and CSS custom-property tokens.
- Added public package exports for components, tokens, icons, styles, and manifests.
- Added a machine-readable component manifest and JSON Schema.
- Added a standalone living component catalogue application.
- Extracted baseui.sh into an independent open-source repository and installable package.
- Added package, render, accessibility-baseline, manifest, and radius-invariant tests.

## Unreleased

- Adopted `@phosphor-icons/react` as a production dependency.
- Replaced hand-authored and text glyphs in library components with Phosphor icons.
- Added `PhosphorIcon`, `iconRegistry`, `@wundercorp/baseui/phosphor`, and `@wundercorp/baseui/phosphor/ssr`.
- Added provider-level Phosphor defaults and icon documentation.
- Preserved 4 px surface geometry while making spinners explicitly circular.
