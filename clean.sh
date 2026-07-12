#!/usr/bin/env bash

set -euo pipefail

repository_root="$(cd "$(dirname "$0")" && pwd)"
cd "$repository_root"

rm -rf node_modules
rm -rf apps/docs/node_modules
rm -rf examples/vite-react/node_modules
rm -rf packages/react/node_modules

npm cache verify

echo
echo "Workspace installation directories were removed."
echo "Run 'npm install' after dependency changes."
echo "Run 'npm ci' only when package-lock.json is already synchronized."
