# shop-web

Frontend application for `React Demo Shop`.

## Local Run

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173`

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test` - run Jest tests
- `npm run test:watch` - run Jest in watch mode
- `npm run test:coverage` - run tests with coverage report
- `npm run test:ci` - deterministic coverage run for CI
- `npm run check` - quality gate (`lint + test:ci + build`)

## Testing

Jest is configured with:
- `ts-jest` + `jsdom`
- Testing Library + `jest-dom`
- alias support for `@/`
- global coverage thresholds

Tests are located in `tests/` and focus on domain logic first:
- slices and selectors
- storage adapters
- validation schemas
- reusable hooks and utilities

## Stack

- React + TypeScript + Vite
- React Router
- Redux Toolkit
- TanStack Query
- React Hook Form + Zod
- Tailwind CSS
- i18next
- Jest + Testing Library

See root documentation for complete setup and architecture: [`../README.md`](../README.md)
