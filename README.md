# Cretiq UI v2

A React/TypeScript interface prototype for the Cretiq concrete quality and laboratory platform. This repository explores the visual shell, navigation, dashboard layout, sample registry, command palette, localization and reusable design-system components.

> **Status: prototype.** The dashboard and samples views are implemented against local sample data. Several navigation areas are still placeholders. This is not a production Cretiq deployment and does not connect to the private Cretiq backend.

## What is in this prototype

- Industrial dark visual language with restrained green/cyan accents.
- Responsive application shell, collapsible sidebar and top bar.
- Dashboard and sample-registry views.
- Keyboard command palette via `Ctrl+K` / `⌘K`.
- Language and direction foundations using `i18next` and `react-i18next`.
- Reusable components under `src/design-system/`.
- Sample records and NCR counts from local mock data.

## Current boundaries

- Sample and notification counts are demo data, not real laboratory records.
- Navigation entries such as curing, lab, alerts, analytics, environment, AI, world, reports and settings are not complete product modules yet.
- Authentication, authorization, database persistence, tenant isolation and production APIs are not provided here.
- This prototype must not be used for engineering acceptance, release decisions or real QC operations.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- Framer Motion
- i18next / react-i18next

## Run locally

Requires a supported Node.js version and npm.

```bash
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
```

Run static linting:

```bash
npm run lint
```

The build runs TypeScript project checks and Vite build. There is currently no test script declared in `package.json`; automated UI and interaction tests should be added before treating this as release-ready.

## Next quality gates

- [ ] Replace the remaining placeholder pages only when their behavior is specified.
- [ ] Verify RTL and LTR behavior using Persian, English, numerals and mixed-direction URLs.
- [ ] Test keyboard navigation, command palette, focus management and reduced motion.
- [ ] Add unit and browser-level tests.
- [ ] Confirm empty, loading, error and permission-denied states.
- [ ] Replace mock fixtures only through a reviewed, authorized API contract.
- [ ] Update package metadata so the npm package name reflects this repository.

## Design direction

The goal is a high-density but calm **engineering command interface**: real operational context, readable trends, traceable findings, consistent component behavior and no decorative metrics pretending to be live system state.
