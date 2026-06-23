# Yunora Universal

Premium, mobile-first multipage ecommerce website for Yunora Universal — a luxury home furnishing brand from Palanpur, Gujarat.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000 / 8080 in Replit)
- `pnpm --filter @workspace/yunora run dev` — run the frontend (port 21632)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind + Shadcn UI + Zustand + Wouter + Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/yunora/` — React + Vite frontend
  - `src/pages/` — all page components (Home, Shop, ProductDetail, Cart, Wishlist, Checkout, Categories, About, Contact, Warranty Hub x4, Profile, Login, Signup)
  - `src/components/layout/` — Preloader, OfferStrip, Header, Footer, BottomNav, AuthPopup
  - `src/lib/store.ts` — Zustand cart + wishlist state
  - `src/lib/auth.tsx` — AuthContext (localStorage-based mock auth)
- `artifacts/api-server/` — Express 5 API server
  - `src/routes/` — products, categories, orders, warranty, newsletter route files
- `lib/db/src/schema/` — Drizzle schema: products, categories, orders, warrantyRegistrations, warrantyClaims, newsletter
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)
- `lib/api-client-react/src/generated/` — Generated React Query hooks + Zod schemas

## Architecture decisions

- Contract-first API: OpenAPI spec drives Zod validation and React Query hooks via Orval codegen
- Zustand with `persist` middleware for cart and wishlist (localStorage)
- Wouter for lightweight client-side routing with `base` path support
- Framer Motion for all page transitions and micro-animations
- Glassmorphism via `backdrop-blur` + semi-transparent backgrounds on header, bottom nav, cart drawer, and popups
- All fonts are Poppins only; brand color is Yunora Orange #FF7A4D (mapped to `--primary`)

## Product

- **Home**: Hero section, category grid, featured products carousel, "Why Yunora" trust section
- **Shop**: Search + filter by category, sort, product grid with add-to-cart / wishlist
- **Product Detail**: Image gallery, color/size picker, add to cart/wishlist, WhatsApp customization, accordion specs
- **Cart**: Item management, quantity control, order summary
- **Checkout**: Address form, simulated Razorpay payment, order creation via API
- **Wishlist**: Grid view, move to cart
- **Warranty Hub**: Register, Claim, Policy, Terms sub-pages wired to API
- **About**: Brand story, team, mission — Palanpur, Gujarat heritage
- **Contact**: Form, WhatsApp link, embedded map
- **Profile**: Protected page, order history, account settings
- **Auth**: Login / Signup pages with AuthContext

## User preferences

- Brand color: Yunora Orange #FF7A4D
- Font: Poppins only — no other fonts
- No emojis anywhere in the UI
- Mobile-first design
- Glassmorphism on header, popup, cart, and bottom nav

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change before editing frontend code
- `zustand` must be installed in `artifacts/yunora` (not root) — it was added as a direct dep
- Product images reference `attached_assets/` files via the `@assets/` Vite alias
- API routes are prefixed `/api/` — the reverse proxy routes `/api` to the api-server artifact

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- DB schema source of truth: `lib/db/src/schema/index.ts`
- OpenAPI source of truth: `lib/api-spec/openapi.yaml`
