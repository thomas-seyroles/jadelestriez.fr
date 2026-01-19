# Jade Portfolio - Frontend Agent Guidelines

This document provides instructions and guidelines for AI agents and developers working on the Jade Portfolio frontend repository.

## 1. Project Overview

- **Stack**: React 19, TypeScript, Vite 7
- **Styling**: Vanilla CSS (BEM-like), `framer-motion` for animations, `react-icons`
- **Routing**: `react-router-dom` v7 (Data Router pattern via `createBrowserRouter`)
- **Backend**: Cloudflare Pages Functions (`functions/`) for API endpoints
- **Data**: Sanity CMS (`@sanity/client`)
- **Package Manager**: `pnpm`
- **Design Philosophy**: "Sharp" aesthetic (strictly `border-radius: 0` everywhere), minimalist, premium feel.

## 2. Environment & Commands

### Setup
Ensure you are in the `frontend` directory.
```bash
pnpm install
```

### Development
Start the development server:
```bash
pnpm run dev
```
- Frontend: `http://localhost:5173`
- Cloudflare Functions (local): Requires `wrangler pages dev` (see `CLOUDFLARE_FUNCTIONS.md`)

### Building
Build for production (CRITICAL STEP):
```bash
pnpm run build
```
This runs `tsc -b` (TypeScript Build) followed by `vite build`.
Output directory: `dist/`

### Linting
Run ESLint:
```bash
pnpm run lint
```
The project uses ESLint 9 with `typescript-eslint` and React hooks/refresh plugins.

### Testing
*Note: No testing framework is currently configured.*

If adding tests in the future (recommended: **Vitest** + **React Testing Library**), use standard commands:
- Run all tests: `pnpm test`
- Run single test: `pnpm test path/to/file.test.tsx`

## 3. Directory Structure

- **`functions/`**: Cloudflare Pages Functions
  - **`api/`**: API endpoints (e.g., `send-email.ts`)
  - **`types.d.ts`**: Cloudflare environment types
- **`src/context/`**: Global state providers (e.g., `PageExitContext.tsx`)
- **`src/components/`**:
  - **`ui/`**: Core primitives (Button, Link, Input). **Use these preferentially.**
  - **`pages/`**: Page-specific sub-components.
  - **`layout/`**: Layout components like `Header.tsx` (persistent), `Footer.tsx`.
- **`src/pages/`**: Full page components mapped to routes (`Home.tsx`, `Projects.tsx`, `Contact.tsx`).
- **`src/hooks/`**: Custom hooks (e.g., `usePageExitAnimation.ts`).
- **`src/styles/`**: Global (`App.css`) and component stylesheets (`ProjectCard.css`).
- **`src/sanityClient.ts`**: Sanity CMS configuration.
- **`src/types.ts`**: Shared TypeScript definitions.

## 4. Code Style & Conventions

### 4.1. Design & UI (CRITICAL)
- **Border Radius**: MUST be `0` or `none` for ALL elements. No rounded corners.
- **Components**: Use reusable UI components from `src/components/ui/` instead of raw HTML elements.
- **Styling**: Prefer centralized CSS files in `src/styles/` or co-located CSS files. Avoid inline styles.
- **Animations**:
  - Use `motion` (from `motion/react`) for transitions.
  - Standard durations: `0.2s` (micro), `0.5s` (page/layout).
  - Use `AnimatePresence` for exit animations.
  - Sync page/header transitions via `PageExitContext`.

### 4.2. TypeScript
- **Strictness**: Maintain strict type checking.
- **Props**: Define component props interfaces explicitly.
  ```tsx
  interface ProjectCardProps {
    project: Project;
    isVisible?: boolean;
  }
  ```
- **Avoid `any`**: Use `unknown` if needed, but prefer specific types.

### 4.3. React Components
- **Naming**: PascalCase for components (`ProjectCard.tsx`), camelCase for hooks (`useScroll.ts`).
- **Routing**: Use `useNavigate`, `useLocation`, and `Outlet` patterns.
- **Context**: Use Context for global UI states (like page transitions) rather than prop drilling.
- **State Management**:
  - Use controlled inputs for forms.
  - Use `useEffect` sparingly; prefer event handlers or derived state.

### 4.4. Imports
- **Order**:
  1. External libraries (`react`, `motion/react`, `react-router-dom`)
  2. Internal Context/Hooks (`../context/`, `../hooks/`)
  3. UI Components (`../components/ui/`)
  4. Feature Components (`../components/pages/`)
  5. Styles (`../../styles/ProjectCard.css`)
  6. Assets/Types
- **Paths**: Use relative paths (e.g., `../../components`).

### 4.5. Error Handling
- **API Calls**: Wrap async calls (Sanity, Cloudflare API) in `try/catch`.
- **User Feedback**: Use `sonner` (`toast`) for user-facing success/error messages.
- **Logging**: Log detailed errors to `console.error` for debugging, but show simple friendly messages to users.
- **Validation**: Validate form data both client-side and server-side (in Functions).

## 5. Workflow & Git

- **Commits**: Use conventional commits (e.g., `feat: add project page`, `fix: header overlap`, `style: update filter layout`).
- **Validation**:
  - **ALWAYS** run `pnpm build` before confirming a task is done.
  - Run `pnpm lint` to catch potential hooks/refs errors.
- **Environment**:
  - Frontend vars in `.env` (prefixed `VITE_`).
  - Backend vars in Cloudflare Dashboard or `.dev.vars` (local).
  - **NEVER** commit secrets.

## 6. Agent Instructions

When modifying this codebase:
1. **Read Context**: Read the file AND its imports/related context (e.g., `PageExitContext` for navigation).
2. **Match Style**: Follow existing indentation (2 spaces) and the "Sharp" design aesthetic.
3. **No Breaking Changes**: Do not change route paths or public interfaces unless requested.
4. **Dependencies**: Check `package.json` before importing. Do not add new libs unnecessarily.
5. **Sanity**: Ensure GROQ queries match the schema and include necessary fields (e.g., `_createdAt` for sorting).
6. **Safety**: When implementing navigation blocking, use `startTransition` to avoid React warnings.

---
*Updated for Jade Portfolio Frontend - Jan 2026*
