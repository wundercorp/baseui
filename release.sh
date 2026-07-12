npm login
npm whoami

npm ci
npm run check
npm test
npm run build --workspace @baseui.sh/react

cd packages/react
npm pack --dry-run
npm publish --access public --provenance=false
