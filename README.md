# Adform Assignment

Single-page React + Vite app for browsing and filtering ad campaigns. Includes:

- Date-range and text filters for campaigns
- Theme toggle powered by Redux Toolkit
- Skeleton loading state
- Vitest + Testing Library for unit tests

## Prerequisites

- Node.js 20.x (LTS) or later
- npm 10.x (ships with Node 20)

## 1. Install Dependencies

```bash
npm install
```

## 2. Run the App Locally

```bash
npm run dev
```

The Vite dev server prints a local URL (default `http://localhost:5173`). The app automatically reloads when you save changes.

## 3. Lint the Code

```bash
npm run lint
```

This runs ESLint with the project’s config to enforce formatting and React best practices.

## 4. Run Unit Tests

The project uses Vitest + Testing Library + JSDOM. There are two ways to run tests:

```bash
# run tests once in CI mode
npx vitest run

# run tests in watch mode
npx vitest

# optional UI runner
npx vitest --ui
```

Vitest picks up any file ending in `.test.{js,jsx}` under `src/`.

## 5. File Structure Highlights

- `src/components/` – UI components (e.g., `Campaigns`, `Skeleton`)
- `src/store/` – Redux Toolkit store + theme slice
- `src/test/` – Vitest suites (e.g., `Campaign.test.jsx`, `setup.js`)
- `src/data/dummydata.json` – mock campaign data used by the API layer

## 6. Updating Campaign Data Manually

The app exposes a helper while running locally:

```js
globalThis.addCampaign([
  {
    id: 999,
    name: "Test",
    startDate: "...",
    endDate: "...",
    budget: 200,
    active: true
  }
]);
```

Use this from the browser console to append campaigns dynamically during manual testing.
