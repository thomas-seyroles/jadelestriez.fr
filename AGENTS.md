# Jade Portfolio - Frontend Agent Guidelines

This document provides comprehensive instructions and guidelines for AI agents and developers working on the Jade Portfolio frontend repository.
Strict adherence to these guidelines is required to maintain the "Sharp" aesthetic and codebase integrity.

## 1. Project Overview

- **Stack**: React 19, TypeScript, Vite 7
- **Styling**: Vanilla CSS (BEM-like classes), `motion/react` (v12) for animations
- **Routing**: `react-router-dom` v7 (Data Router pattern)
- **Backend**: Cloudflare Pages Functions (`functions/`)
- **CMS**: Sanity CMS (`@sanity/client`)
- **Package Manager**: `pnpm`
- **Design Philosophy**: "Sharp" aesthetic. **Strictly `border-radius: 0` everywhere**. Minimalist, premium feel.

## 2. Environment & Commands

### Setup & Development
Ensure you are in the `frontend` directory.
```bash
pnpm install
pnpm run dev      # Starts frontend at http://localhost:5173
```
*Cloudflare Functions locally require `wrangler pages dev`.*

### Building (CRITICAL)
Always run the build before confirming a task is done.
```bash
pnpm run build
```
*This runs `tsc -b` (TypeScript Build) followed by `vite build`.*

### Linting
Check for code quality and hooks issues. Fix all errors before committing.
```bash
pnpm run lint
```

### Testing (Reference)
*Note: No testing framework is currently configured in `package.json`.*
If adding tests or running future tests, assume **Vitest** + **React Testing Library**.

- **Run a single test file** (Hypothetical):
  ```bash
  npx vitest run path/to/file.test.tsx
  ```
- **Run all tests**: `npx vitest run`

## 3. Code Style & Conventions

### 3.1. Design & UI (Strict)
- **Border Radius**: **MUST be `0` or `none`** for ALL elements (buttons, inputs, cards, images).
- **CSS Variables**: Use variables from `src/styles/` (e.g., `var(--color-primary)`, `var(--font-body)`).
- **Styling Strategy**:
  - Centralized CSS in `src/styles/` organized by type (`layout/`, `pages/`, `ui/`, `features/`).
  - Import CSS files in the component file (e.g., `import "../../styles/ui/Button.css"`).
  - Use BEM-like naming: `.component`, `.component-variant`, `.component__element`.
- **Animations**:
  - Import ONLY from `motion/react`:
    ```tsx
    import { motion } from "motion/react";
    import type { HTMLMotionProps } from "motion/react";
    ```
  - Standard duration: `0.2s` for interactions.

### 3.2. TypeScript & Components
- **Strictness**: No `any`. Define strict interfaces.
- **Component Structure**:
  ```tsx
  import { motion } from "motion/react";
  import "../../styles/ui/MyComponent.css";

  interface MyComponentProps {
    title: string;
    isActive?: boolean;
  }

  export default function MyComponent({ title, isActive = false }: MyComponentProps) {
    return (
      <div className={`my-component ${isActive ? "active" : ""}`}>
        <h1>{title}</h1>
      </div>
    );
  }
  ```
- **Props**: Extend standard HTML attributes when applicable (e.g., `HTMLMotionProps<"button">`).
- **Naming**: PascalCase for components (`ProjectCard.tsx`), camelCase for hooks (`useScroll.ts`).
- **Exports**: Prefer `export default function`.

### 3.3. Imports Order
1. External libraries (`react`, `motion/react`, `react-router-dom`)
2. Internal Context/Hooks (`../context/...`, `../hooks/...`)
3. UI Components (`../components/ui/...`)
4. Feature Components (`../components/pages/...`)
5. Styles (`../../styles/ui/Name.css`)
6. Assets/Types

**Paths**: Use relative paths (e.g., `../../components/ui/Button`). Do not use aliases unless configured.

### 3.4. Error Handling
- **API Calls**: Wrap async calls in `try/catch`.
- **User Feedback**: Use `sonner` for toast notifications.
  ```tsx
  import { toast } from "sonner";
  // ...
  toast.error("Failed to load project");
  ```

## 4. Directory Structure

- **`functions/`**: Cloudflare Pages Functions (Serverless API).
- **`src/components/`**:
  - **`ui/`**: Core primitives (Button, Link, Input). **Check here first before building new UI.**
  - **`pages/`**: Components specific to a single page (e.g., `HomeHero`).
  - **`layout/`**: Global layout components (Header, Footer).
- **`src/context/`**: Global state (Context API).
- **`src/hooks/`**: Custom React hooks.
- **`src/pages/`**: Top-level Route components.
- **`src/styles/`**:
  - **`layout/`**: Header, Footer.
  - **`pages/`**: Page-specific styles.
  - **`ui/`**: Reusable UI component styles.
  - **`features/`**: Feature-specific styles.
- **`src/types/`**: Shared TypeScript definitions.

## 5. Workflow & Git

- **Commits**: Use Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`).
- **Validation**: Run `pnpm lint` and `pnpm build` before every commit.
- **Secrets**: NEVER commit secrets. Use `.env` (prefixed `VITE_`) or Cloudflare Dashboard.

## 6. Agent Instructions (Meta)

When you (the agent) are modifying this codebase:

1.  **Read Before Write**: Always read the target file and its imports first to understand context.
2.  **Check Existing Styles**: Read the corresponding CSS file in `src/styles/` before adding new classes.
3.  **Proactiveness**: If a component needs a new variant, check if it can be added to the existing UI component first.
4.  **Safety**:
    -   Do not revert changes unless explicitly asked or fixing a regression.
    -   Verify the build passes after changes.
5.  **Sanity Queries**: Ensure GROQ queries in `sanityClient.ts` or components match the actual schema.

---
*Updated Jan 2026*
