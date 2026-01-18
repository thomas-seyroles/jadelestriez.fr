# Jade Portfolio - Frontend Agent Guidelines

This document provides instructions and guidelines for AI agents and developers working on the Jade Portfolio frontend repository.

## 1. Project Overview

- **Stack**: React 19, TypeScript, Vite 7
- **Styling**: Vanilla CSS, `framer-motion` for animations, `react-icons`
- **Routing**: `react-router-dom` v7 (Data Router pattern)
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
The server usually runs on `http://localhost:5173`.

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

If adding tests in the future, the recommended stack is **Vitest** + **React Testing Library**.
Proposed commands:
- Run all tests: `pnpm test`
- Run single test: `pnpm test path/to/file.test.tsx`

## 3. Directory Structure

- **`src/components/`**:
  - **`ui/`**: Core design system components (Button, Link, Input, skeletons/). **Use these preferentially.**
  - **`pages/`**: Page-specific sub-components (e.g., `projects/ProjectCard.tsx`).
  - **`layout/`**: Layout components like `Header.tsx`, `Footer.tsx`.
- **`src/pages/`**: Full page components (e.g., `Home.tsx`, `Projects.tsx`).
- **`src/hooks/`**: Custom hooks (e.g., `usePageExitAnimation.ts`).
- **`src/styles/`**: Global stylesheets and component-specific styles.
- **`src/assets/`**: Static assets (images, fonts).
- **`src/sanityClient.ts`**: Sanity CMS configuration.
- **`src/types.ts`**: Shared TypeScript definitions.

## 4. Code Style & Conventions

### 4.1. Design & UI (CRITICAL)
- **Border Radius**: MUST be `0` or `none` for ALL elements. No rounded corners.
- **Components**: Use reusable UI components from `src/components/ui/` instead of raw HTML elements where possible:
  - `<Button>` instead of `<button>`
  - `<Link>` (custom) instead of `<a href...>` or `<Link to...>`
  - `<Input>` / `<Textarea>` for forms
- **Toasts**: Use `sonner` for notifications.
- **Animations**: Use `motion` (from `motion/react`) for transitions. Standard transition duration is `0.2s`.

### 4.2. TypeScript
- **Strictness**: Maintain strict type checking.
- **Props**: Define component props interfaces explicitly.
  ```tsx
  interface HeaderProps {
    title: string;
    isActive?: boolean;
  }
  ```
- **Avoid `any`**: Use `unknown` if needed, but prefer specific types.

### 4.3. React Components
- **Functional Components**: Use functional components with hooks.
- **Naming**: PascalCase for components (`ProjectCard.tsx`), camelCase for hooks (`useScroll.ts`).
- **Routing**: Use `useBlocker`, `useNavigate`, and `Outlet` patterns compatible with `react-router-dom` v7 data routers.
- **Skeleton Loading**: Use `src/components/ui/skeletons/` components for loading states.

### 4.4. Imports
- **Order**:
  1. External libraries (`react`, `motion/react`)
  2. Internal Utilities/Hooks (`../sanityClient`, `../hooks/`)
  3. UI Components (`../components/ui/`)
  4. Feature Components (`../components/pages/`)
  5. Styles (`./Page.css`)
  6. Assets/Types
- **Paths**: Use relative paths (e.g., `../../components`).

### 4.5. Error Handling
- **API Calls**: Wrap Sanity fetches in `try/catch`.
- **Loading States**: Explicitly handle `isLoading` states (use Skeletons).

## 5. Workflow & Git

- **Commits**: Use conventional commits (e.g., `feat: add project page`, `fix: header overlap`).
- **Validation**:
  - **ALWAYS** run `pnpm build` before confirming a task is done.
  - Run `pnpm lint` to catch potential hooks/refs errors.

## 6. Agent Instructions

When modifying this codebase:
1. **Read Context**: Read the file AND its imports.
2. **Match Style**: Follow existing indentation (2 spaces) and the "Sharp" design aesthetic.
3. **No Breaking Changes**: Do not change route paths or public interfaces unless requested.
4. **Dependencies**: Check `package.json` before importing. Do not add new libs unnecessarily.
5. **Sanity**: Ensure GROQ queries match the Sanity schema.
6. **Safety**: When implementing navigation blocking or complex effects, use `startTransition` if needed to avoid React warnings.

---
*Updated for Jade Portfolio Frontend*
