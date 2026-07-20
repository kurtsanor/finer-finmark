# Finer-FinMark

A full-stack, multi-vendor e-commerce marketplace built on a **microservices architecture**. Shoppers (`customer` role) browse shops, manage a cart, and place orders; merchants (`merchant` role) run a shop, list products, and fulfil orders. The backend is a set of independent Express + TypeScript services fronted by an API Gateway, backed by MongoDB, and deployed as a Docker Swarm stack. The frontend is a React 19 + Vite single-page app.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Services & Ports](#services--ports)
- [Authentication & Authorization Flow](#authentication--authorization-flow)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Local Development (Docker Compose)](#local-development-docker-compose)
- [Production-style Deployment (Docker Swarm)](#production-style-deployment-docker-swarm)
- [Project Structure](#project-structure)
- [Security Notes](#security-notes)

---

## Tech Stack

**Backend (per service)**

- Node.js 18+ with **TypeScript** (ES modules, run via `tsx`)
- **Express 5** for HTTP routing
- **Mongoose** ODM over **MongoDB 4.4**
- **Zod** for request-body validation
- **JSON Web Tokens** (`jsonwebtoken`) issued as an **HTTP-only cookie**
- **bcrypt** for password hashing
- **http-proxy-middleware** for gateway reverse-proxying (the `express-rate-limit` package is installed but not yet wired up)

**Frontend**

- **React 19** + **Vite 8** + **TypeScript**
- **TanStack Query** for server state / data fetching
- **React Router 7** for routing
- **React Hook Form** + **Zod** (`@hookform/resolvers`) for forms & validation
- **Axios** (with a shared instance) for API calls
- **Tailwind CSS 4** for styling, **react-hot-toast** for notifications

**Infrastructure**

- **Docker** images per service
- **Docker Compose** for local development
- **Docker Swarm** (`docker-stack.yml`) for replicated, self-healing deployment

---

## Architecture

The system follows the API Gateway + microservices pattern. The gateway is the single public entry point; it authenticates every request, then reverse-proxies to the matching service. Each service owns its feature domain and connects to a shared MongoDB instance.

```
                         ┌──────────────────────────────┐
                         │   Frontend (React + Vite)     │
                         │   http://localhost:5173       │
                         └───────────────┬──────────────┘
                                         │  cookies (HTTP-only JWT)
                                         ▼
                         ┌──────────────────────────────┐
                         │      API Gateway (Express)    │
                         │      http://localhost:3000    │
                         │  • verifies JWT cookie        │
                         │  • injects x-user header      │
                         │  • CORS + error handling      │
                         └──┬────────┬────────┬────────┬─┘
              /api/auth      │        │        │        │  /api/carts
                            ▼        ▼        ▼        ▼
                   ┌─────────┐┌──────────┐┌─────────┐┌─────────┐
                   │  Auth   ││ Product  ││  Order  ││  Cart   │
                   │ :3001   ││  :3002   ││  :3003  ││  :3004  │
                   └────┬────┘└────┬─────┘└────┬────┘└────┬────┘
                        │          │           │          │
                        └──────────┴─────┬─────┴──────────┘
                                         ▼
                                 ┌───────────────┐
                                 │  MongoDB 4.4  │
                                 │   (finmark)   │
                                 └───────────────┘
```

> **Note:** `/api/products` **and** `/api/shops` are both proxied to the **Product Service** — shop management lives inside that service.

Each backend service is organized in a consistent **feature-based** layout:

```
src/
├── config/        # database connection
├── middleware/    # authenticate, authorizeRoles, validateRequest
├── shared/        # shared types
└── features/
    └── <feature>/
        ├── *.routes.ts       # endpoint definitions
        ├── *.controller.ts   # request/response handling
        ├── *.service.ts      # business logic
        ├── *.model.ts        # Mongoose schema
        ├── *.schema.ts       # Zod validation schema
        └── *.types.ts        # TypeScript types
```

---

## Services & Ports

| Service          | Port | Path prefix (via gateway)   | Responsibility                                   |
| ---------------- | ---- | --------------------------- | ------------------------------------------------ |
| API Gateway      | 3000 | —                           | Auth, routing, CORS, error shield                |
| Auth Service     | 3001 | `/api/auth`                 | Registration, login, JWT, roles, password reset  |
| Product Service  | 3002 | `/api/products`, `/api/shops` | Shops and product catalog (CRUD)               |
| Order Service    | 3003 | `/api/orders`               | Order placement, buyer/seller order views        |
| Cart Service     | 3004 | `/api/carts`                | Per-user shopping cart                           |
| MongoDB          | 27017| —                           | Shared `finmark` database                        |
| Frontend (Vite)  | 5173 | —                           | React SPA                                         |

---

## Authentication & Authorization Flow

1. **Sign-in** — the Auth Service verifies credentials, signs a JWT (payload: `userId`, `email`, `role`; **`expiresIn: 1h`**), and returns it as an **HTTP-only, SameSite=Lax cookie** named `accessToken` (`secure` in production). Note the cookie's `maxAge` is set to 24 hours, but the token itself expires after 1 hour — after that, requests are rejected with 401 even though the cookie persists.
2. **Gateway verification** — for every protected route the gateway reads the `accessToken` cookie, verifies it with `JWT_SECRET`, and attaches the decoded user to the request.
3. **Identity propagation** — the gateway forwards the user to downstream services as an `x-user` JSON header, so services never re-parse the raw token.
4. **Role enforcement** — services use `authorizeRoles(...)`. Merchant-only actions (create/edit/delete product, view seller orders, update order status) re-check the user's role against the Auth Service before proceeding.

> Roles in code are **`customer`** and **`merchant`** (the UI presents these as buyer/seller). Users default to `customer` on registration.

---

## API Reference

All routes are called through the gateway at `http://localhost:3000`. Unless noted, protected routes require the `accessToken` cookie.

### Auth Service — `/api/auth`

| Method | Endpoint          | Auth        | Description                          |
| ------ | ----------------- | ----------- | ------------------------------------ |
| POST   | `/sign-up`        | Public      | Register a new user                  |
| POST   | `/sign-in`        | Public      | Log in; sets `accessToken` cookie    |
| POST   | `/logout`         | Public      | Clear the auth cookie                |
| GET    | `/me`             | Required    | Get the current authenticated user   |
| POST   | `/reset-password` | Public      | Reset password via token             |
| GET    | `/users/:id`      | Internal    | Fetch a user (used by services)      |
| PATCH  | `/users`          | Internal    | Update a user's role                 |

### Product Service — `/api/products`

| Method | Endpoint | Auth               | Description                        |
| ------ | -------- | ------------------ | ---------------------------------- |
| POST   | `/`      | `merchant`         | Create a product                   |
| GET    | `/me`    | `merchant`         | List the current merchant's products |
| GET    | `/`      | Required           | List/browse products (paginated)   |
| GET    | `/:id`   | Required           | Get a product by id                |
| PATCH  | `/:id`   | `merchant`         | Update a product                   |
| DELETE | `/:id`   | `merchant`         | Delete a product                   |

### Shop Service — `/api/shops` (served by Product Service)

| Method | Endpoint | Auth     | Description                    |
| ------ | -------- | -------- | ----------------------------- |
| POST   | `/`      | Required | Create a shop for the user    |
| GET    | `/me`    | Required | Get the current user's shop   |
| GET    | `/:id`   | Required | Get a shop by id              |

### Order Service — `/api/orders`

| Method | Endpoint            | Auth       | Description                          |
| ------ | ------------------- | ---------- | ------------------------------------ |
| POST   | `/`                 | Required   | Place an order                       |
| GET    | `/my-orders`        | Required   | Buyer's order history                |
| GET    | `/seller`           | `merchant` | Orders for the merchant's shop       |
| PATCH  | `/:orderId/status`  | `merchant` | Update an order's fulfilment status  |

### Cart Service — `/api/carts`

| Method | Endpoint              | Auth     | Description                        |
| ------ | --------------------- | -------- | --------------------------------- |
| POST   | `/`                   | Required | Add / update an item (upsert)     |
| GET    | `/`                   | Required | Get the current user's cart       |
| DELETE | `/items/:productId`   | Required | Remove a single item              |
| DELETE | `/`                   | Required | Clear the cart                    |

### Gateway utility

| Method | Endpoint  | Description               |
| ------ | --------- | ------------------------- |
| GET    | `/health` | Gateway health check      |

---

## Data Models

**User** (`auth-service`) — `firstName`, `lastName`, `email` (unique), `password` (hashed), `role` (`customer` \| `merchant`), `resetToken`, `resetTokenExpiration`, timestamps.

**Shop** (`product-service`) — `name` (unique), `description`, `userId` (unique — one shop per user), timestamps.

**Product** (`product-service`) — `name`, `description`, `imageUrl`, `price`, `category`, `shopId`, timestamps.

**Cart** (`cart-service`) — `userId` (unique), `items[]` of `{ productId, quantity }`, timestamps.

**Order** (`order-service`) — `buyerId`, `shopOrders[]` (each with `shopId`, `status`, `items[]`, `subtotal`), `shippingAddress` (SEA country codes), `totalAmount`, timestamps. Order status: `placed` → `confirmed` → `shipped` → `delivered` (or `cancelled`).

---

## Environment Variables

Create a `.env` file per service (git-ignored). Sensible fallbacks exist in code, but set these explicitly for anything beyond local experimentation.

**API Gateway**

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<must match auth-service>
AUTH_SERVICE_URL=http://auth-service:3001
PRODUCT_SERVICE_URL=http://product-service:3002
ORDER_SERVICE_URL=http://order-service:3003
CART_SERVICE_URL=http://cart-service:3004
```

**Auth Service**

```env
PORT=3001
MONGODB_URI=mongodb://mongo:27017/finmark
JWT_SECRET=<must match api-gateway>
NODE_ENV=development
```

**Product / Order / Cart Services**

```env
PORT=300x
MONGODB_URI=mongodb://mongo:27017/finmark
AUTH_SERVICE_URL=http://auth-service:3001
PRODUCT_SERVICE_URL=http://product-service:3002   # order & cart
CART_SERVICE_URL=http://cart-service:3004          # order only
```

> **Important:** `JWT_SECRET` must be identical for the gateway and auth-service, or token verification will fail. Do **not** rely on the built-in default secret outside local development.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Docker Desktop** (running)
- **Git**

### Clone

```bash
git clone https://github.com/kurtsanor/finer-finmark.git
cd finer-finmark
```

You can run the backend either with **Docker Compose** (simplest for development) or as a **Docker Swarm stack** (replicated, closer to production). Pick one.

---

## Local Development (Docker Compose)

Compose mounts the source for live editing and starts MongoDB plus every service:

```bash
docker compose up --build
```

This starts MongoDB, the API Gateway (`http://localhost:3000`), and the auth, product, order, and cart services. Stop with `docker compose down` (add `-v` to also drop the database volume).

Then start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173/sign-in**.

---

## Production-style Deployment (Docker Swarm)

The Swarm stack runs **2 replicas** of each service with restart policies and rolling (`start-first`) updates.

```bash
# 1. Enable Swarm (one-time; harmless if already a manager)
docker swarm init

# 2. Build the service images
docker build -t finmark/api-gateway:1.0 ./api-gateway
docker build -t finmark/auth-service:1.0 ./services/auth-service
docker build -t finmark/product-service:1.0 ./services/product-service
docker build -t finmark/order-service:1.0 ./services/order-service
docker build -t finmark/cart-service:1.0 ./services/cart-service

# 3. Validate the stack file
docker stack config -c docker-stack.yml

# 4. Deploy the stack
docker stack deploy -c docker-stack.yml finmark

# 5. Verify services are running
docker service ls
```

Tear down cleanly:

```bash
docker stack rm finmark
```

Then run the frontend as shown above and visit **http://localhost:5173/sign-in**.

---

## Project Structure

```
finer-finmark/
├── api-gateway/                 # Express reverse proxy + JWT auth
│   └── src/
│       ├── middleware/auth.middleware.ts
│       └── server.ts
├── services/
│   ├── auth-service/            # users, auth, JWT, password reset
│   ├── product-service/         # products + shops
│   ├── order-service/           # orders (buyer & seller views)
│   └── cart-service/            # shopping cart
├── frontend/                    # React 19 + Vite SPA
│   └── src/
│       ├── api/                 # axios API clients
│       ├── hooks/               # TanStack Query hooks
│       ├── pages/               # route pages
│       ├── components/          # UI components
│       ├── layouts/             # main / auth / seller layouts
│       ├── routes/              # ProtectedRoute, SellerRoute
│       └── schemas/             # Zod form schemas
├── docker-compose.yml           # local dev
├── docker-stack.yml             # Swarm deployment
└── README.md
```

---

## Security Notes

- **HTTP-only cookies** hold the JWT, keeping it out of reach of client-side JavaScript (mitigates XSS token theft). `SameSite=Lax` limits CSRF exposure and `secure` is enabled in production.
- **Single entry point** — only the gateway is exposed publicly; internal services trust the gateway-injected `x-user` header and should not be reachable from outside the Docker network.
- **Passwords** are hashed with bcrypt and never returned to the client.
- **Input validation** — every write endpoint validates its body with Zod before it reaches business logic.
- **CORS** is enforced at the gateway and locked to `FRONTEND_URL` with credentials enabled. (Rate limiting is a listed dependency but is not yet implemented — see hardening checklist.)
- **Least privilege** — merchant-only actions are gated by `authorizeRoles("merchant")`.
