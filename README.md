# Frank McGuire Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Setup

Use Node.js `>=20.19.0 || >=22.12.0`; Node `24.x` is supported. The project declares `npm@11.8.0` as its package manager.

Install dependencies with:

```bash
npm install
```

The `package.json` overrides are intentional and keep Angular CLI transitive dependencies on patched versions. When changing dependencies, commit both `package.json` and `package-lock.json`.

Useful verification commands:

```bash
npm audit
npm run build
```

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deployment

The production target is **InMotion Hosting shared hosting** — a static-file host with no Node.js application server and no Angular SSR runtime. This app is a client-side rendered (CSR) Angular SPA by design; it does not use `@angular/ssr` and has no server entry points.

To build and deploy:

```bash
npm run build
```

Upload the entire contents of `dist/frank-mcguire-portfolio/browser/` to the web root (or target subdirectory) on the hosting account. No Node.js process, SSR server, or build step is required on the host — the uploaded files are served as-is.

The deployable output includes:

```text
dist/frank-mcguire-portfolio/browser/index.html
dist/frank-mcguire-portfolio/browser/favicon.ico
dist/frank-mcguire-portfolio/browser/content/case-studies.json
dist/frank-mcguire-portfolio/browser/content/modw.json
dist/frank-mcguire-portfolio/browser/main-*.js
dist/frank-mcguire-portfolio/browser/styles-*.css
```

`public/content/case-studies.json` and `public/content/modw.json` are runtime content — edit them directly in the deployed output to update Case Studies or MOD-W copy without a rebuild. If you do this, mirror the same edit back into `public/content/*.json` in Git before the next release, or the next deploy will silently overwrite the live change.

Because the app uses anchor navigation only (`#work`, `#modw`, `#about`, `#contact` — no Angular Router page routes), no server-side URL rewrite rules (e.g. `.htaccess` SPA fallback) are needed; every route the app uses resolves against the single `index.html`.

To verify a production build locally before deploying, serve the `browser/` output with any static file server, for example:

```bash
npm run build
node tools/static-server.mjs dist/frank-mcguire-portfolio/browser 4200
```

Then check `http://127.0.0.1:4200/`, `http://127.0.0.1:4200/#work`, and that `http://127.0.0.1:4200/content/case-studies.json` / `.../content/modw.json` return valid JSON.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use either of the following (equivalent) commands:

```bash
npm test
ng test
```

## Running end-to-end tests

End-to-end tests use [Playwright](https://playwright.dev/) against a production build served by `tools/static-server.mjs`:

```bash
npm run test:e2e
```

This builds the app first, then runs the Playwright suite in `e2e/` across Chromium, Firefox, and WebKit. Use `npm run test:e2e:ui` for the interactive Playwright UI, or `npm run test:e2e:report` to view the last HTML report.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
