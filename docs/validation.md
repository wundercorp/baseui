# Validation

The standalone repository was validated before packaging with the following checks:

- TypeScript checks for the React package, documentation app, and Vite consumer example.
- Nine package and server-render tests.
- Production build of the React package.
- Production build of the living documentation catalogue.
- Production build of the minimal Vite consumer.
- Packed-tarball content and size verification.
- Fresh installation and server rendering with React 18.2.0.
- Fresh installation and server rendering with React 19.2.0.
- npm publication dry run with public access and provenance metadata.
- Search for application-monorepo imports, routes, package names, and deployment coupling.
- CSS audit confirming every component radius declaration uses `var(--bui-radius)` and the token remains `4px`.

The npm publication dry run completed successfully. Actual publication still requires ownership of the npm scope and repository release credentials.
