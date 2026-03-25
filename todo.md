# Current TODO — Sprint 1: Foundation

## Active Task: TUS-01 — Project Scaffolding

### Setup Steps (run in order)
1. [ ] `npm create vite@latest virtual-queue -- --template react-ts`
2. [ ] `cd virtual-queue`
3. [ ] `npm install react-router-dom@7 @supabase/supabase-js`
4. [ ] `npm install -D tailwindcss @tailwindcss/vite @types/react @types/react-dom eslint prettier`
5. [ ] Configure vite.config.ts (Tailwind plugin + path alias)
6. [ ] Configure tsconfig.json (strict mode + path alias)
7. [ ] Set up index.css with `@import "tailwindcss"`
8. [ ] Create .env with placeholder variables
9. [ ] Create folder structure: `mkdir -p src/{api,types,services,hooks,context,components/ui,pages,utils,data}`
10. [ ] Set up React Router v7 in App.tsx with 3 routes
11. [ ] Create placeholder pages (Home, ProviderDetail, Queue)
12. [ ] Verify everything works

### Verification Checklist
- [ ] `npm run dev` starts with no errors
- [ ] Navigate to `/` — shows Home placeholder
- [ ] Navigate to `/provider/1` — shows ProviderDetail placeholder
- [ ] Navigate to `/queue/1` — shows Queue placeholder
- [ ] Tailwind utility classes render correctly
- [ ] TypeScript strict compilation passes
- [ ] Path alias `@/` resolves

## Up Next
- TUS-02: Core Types & Seed Data
- TUS-03: QueueContext

## Blocked
- Nothing currently blocked
