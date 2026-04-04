# React Demo Shop

Production-style educational e-commerce application with a separate frontend and backend.

The project is designed to practice real-world React architecture: role-based access, server/client state separation, forms and validation, URL-driven filters, i18n, theme switching, accessibility, SEO, and unit testing.

## Architecture

- `shop-web` - React client application
- `shop-api` - Express API server with local in-memory data
- Independent startup commands for backend and frontend (enterprise-like workflow)

## Tech Stack

### Frontend (`shop-web`)
- React 19 + TypeScript + Vite
- React Router
- Redux Toolkit (client state)
- TanStack Query (server state and caching)
- React Hook Form + Zod
- Tailwind CSS
- i18next (`en` / `uk`)
- Jest + Testing Library

### Backend (`shop-api`)
- Node.js + Express + TypeScript
- Zod request validation
- Role checks via auth token middleware
- In-memory product and order storage

## Key Features

- Auth with demo users and role-based access (`user`, `admin`)
- Protected admin routes and role checks on API
- Product catalog with search, category filter, and pagination
- URL-synced product filters (`q`, `category`, `page`, `limit`)
- Cart and checkout flow
- User orders and admin order status management
- Admin product CRUD
- Language switch (`en` / `uk`)
- Theme switch (`light`, `dark`, `system`)
- SEO baseline (`meta`, `robots.txt`, `sitemap.xml`)
- Accessibility improvements (focus states, labels, ARIA, skip link)
- Unit tests with coverage thresholds

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

API URL: `http://localhost:4000`

### 3) Start frontend (new terminal)

```bash
cd shop-web
npm run dev
```

Web URL: `http://localhost:5173`

## Demo Credentials

- User: `user@shop.com` / `user123`
- Admin: `admin@shop.com` / `admin123`

## API Endpoints

- `GET /health`
- `POST /auth/login`
- `GET /products?q=&category=&page=&limit=`
- `POST /orders`
- `GET /orders`
- `POST /admin/products`
- `PATCH /admin/products/:id`
- `DELETE /admin/products/:id`
- `PATCH /admin/orders/:id/status`

## Quality Gates

### Frontend (`shop-web`)
- `npm run lint` - ESLint checks
- `npm run test` - unit tests
- `npm run test:coverage` - unit tests + coverage report
- `npm run check` - full gate: lint + coverage + build

Coverage thresholds are enforced globally in Jest:
- Statements: `>= 90%`
- Lines: `>= 90%`
- Functions: `>= 90%`
- Branches: `>= 65%`

### Backend (`shop-api`)
- `npm run build` - TypeScript compile check

## Project Structure (Frontend)

```text
shop-web/src/
├─ app/          # app-level providers, router, store
├─ pages/        # route pages
├─ features/     # business features
├─ entities/     # domain entities (model + ui + public api)
└─ shared/       # reusable libs, api, ui, i18n, theme
```

Entity convention:
- `model/` - domain types and logic
- `ui/` - visual components
- `index.ts` - public exports

## Interview Prep

Use this short guide before interviews:
- [`INTERVIEW_PREP.md`](./INTERVIEW_PREP.md)
