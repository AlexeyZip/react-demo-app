# React Demo Shop

An educational full-stack e-commerce project with a separate frontend and backend.

The goal is to practice a production-style React stack on a realistic scenario: catalog, filters, pagination, authentication, roles, and admin area.

## Tech Stack

### Frontend (`shop-web`)
- React + TypeScript + Vite
- React Router
- Redux Toolkit
- TanStack Query
- React Hook Form + Zod
- Tailwind CSS

### Backend (`shop-api`)
- Node.js + Express + TypeScript
- Zod for validation
- Local in-memory data

## Project Structure

```text
React Demo App/
├─ shop-api/
│  ├─ src/
│  │  ├─ data.ts
│  │  ├─ server.ts
│  │  └─ types.ts
│  └─ package.json
├─ shop-web/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ entities/
│  │  │  └─ product/
│  │  │     ├─ model/types.ts
│  │  │     ├─ ui/product-card.tsx
│  │  │     └─ index.ts
│  │  ├─ features/
│  │  ├─ pages/
│  │  └─ shared/
│  └─ package.json
└─ README.md
```

## Quick Start

### 1) Install dependencies

```bash
cd shop-api
npm install

cd ../shop-web
npm install
```

### 2) Start backend

```bash
cd shop-api
npm run dev
```

Backend starts at `http://localhost:4000`.

### 3) Start frontend (in second terminal)

```bash
cd shop-web
npm run dev
```

Frontend starts at `http://localhost:5173`.

## Demo Credentials

- User: `user@shop.com` / `user123`
- Admin: `admin@shop.com` / `admin123`

## Current Features

- Authentication with role-based access (`user` / `admin`)
- Protected routes
- Product catalog
- Search and category filters
- URL-synced filters (`q`, `category`, `page`, `limit`)
- Server-side pagination
- Persisted auth state in `localStorage`

## API Endpoints

- `GET /health`
- `POST /auth/login`
- `GET /products?q=&category=&page=&limit=`

## Useful Scripts

### `shop-api`
- `npm run dev` - run API with watch mode
- `npm run build` - compile TypeScript
- `npm run start` - run compiled build

### `shop-web`
- `npm run dev` - run Vite dev server
- `npm run build` - production build
- `npm run lint` - run linter
- `npm run preview` - preview production build

## Development Notes

- Frontend and backend are intentionally separated (close to real team workflow).
- `Redux Toolkit` is used for client state.
- `TanStack Query` is used for server state.
- Entity structure follows a stable pattern:
  - `model/` for domain types/logic
  - `ui/` for visual components
  - `index.ts` for public exports

## Roadmap

- [ ] Cart and checkout flow
- [ ] Orders for user account
- [ ] Admin CRUD for products
- [ ] Order status management
- [ ] Better error boundaries and notifications
- [ ] Tests (unit + integration)
