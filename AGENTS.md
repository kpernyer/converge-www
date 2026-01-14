# AI Agents Configuration

> Converge is a vision for **semantic governance**. We move from fragmented intent to unified, converged states through a deterministic alignment engine. Our mission is to provide a stable foundation for complex decision-making where human authority and AI agency coexist in a transparent, explainable ecosystem.

This document describes how AI agents (like Cursor AI) should interact with this codebase.

## Project Overview

**converge.hey.sh-www** is the marketing website for the Converge multi-agent runtime. It's a React 19 + TypeScript application that showcases the capabilities and philosophy of Converge.

## Codebase Structure

```
src/
  app/                    # Main application components
    components/          # Reusable UI components (Terminal, etc.)
    pages/              # Route pages (Home, Manifesto, Domain, etc.)
    data/               # Static demo content
  api/                   # API client and type definitions
  styles/                # Global styles and CSS tokens
```

## Key Technologies

- **Runtime**: Bun
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **Deployment**: Firebase Hosting

## Development Workflow

1. **Start Development**: `just dev` or `bun run dev`
2. **Format Code**: `just fmt` or `bun run fmt`
3. **Lint**: `just lint` or `bun run lint`
4. **Type Check**: `just typecheck` or `bun run typecheck`
5. **Build**: `just build` or `bun run build`
6. **Run All Checks**: `just check`

## TypeScript Standards

### Strict Rules

- **No `any` types** - Use proper types or `unknown` with narrowing
- **Strict mode enabled** - All strict checks are active
- **Boundary validation** - Validate all external data (API responses, user input)
- **No type assertions** - Prefer type narrowing over `as` casts

### Type Safety Patterns

```typescript
// ✅ Good: Proper type narrowing
function process(data: unknown) {
  if (typeof data === 'string') {
    // data is now string
  }
}

// ❌ Bad: Type assertion
function process(data: unknown) {
  const str = data as string; // Avoid this
}
```

## React Patterns

### Component Structure

- Use functional components with TypeScript interfaces for props
- Extract side effects into custom hooks
- Keep components presentational when possible
- Use CSS Modules for styling

### Example Component

```typescript
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

## API Integration

- API client lives in `src/api/`
- Validate all API responses with Zod schemas
- Use Result-style returns for error handling
- Never leak raw DTOs into UI components

### Type Safety Pattern: Infer Types from Zod Schemas

**Never duplicate type definitions.** All types must be inferred from Zod schemas to ensure runtime validation and compile-time types stay in sync:

```typescript
// src/api/schemas.ts - Define schemas with proper constraints
import { z } from 'zod';

// Use z.enum() for string literals with semantic meaning
export const ValidationSeveritySchema = z.enum(['info', 'warning', 'error']);
export const ApiErrorCodeSchema = z.enum(['bad_request', 'not_found', 'internal_error']);

// Use number constraints for semantic values
export const JobMetadataSchema = z.object({
  cycles: z.number().int().nonnegative(),
  duration_ms: z.number().nonnegative(),
  confidence: z.number().min(0).max(1),
});

// Infer types at the bottom of schemas.ts
export type ValidationSeverity = z.infer<typeof ValidationSeveritySchema>;
export type JobMetadata = z.infer<typeof JobMetadataSchema>;

// src/api/types.ts - Re-export from schemas (no manual interfaces)
export type { ValidationSeverity, JobMetadata } from './schemas';
```

### Why This Pattern?

1. **Single source of truth** - Change the schema, types update automatically
2. **Runtime + compile-time safety** - Zod validates at runtime, TypeScript checks at compile-time
3. **Semantic types** - `z.enum()` gives you literal unions, not `string`
4. **Constraint enforcement** - `.int().nonnegative()` documents and enforces business rules

## Styling Guidelines

- **CSS Modules** for component-scoped styles
- **Global styles** in `src/styles/`
- **CSS custom properties** for theming (see `tokens.css`)
- Prefer composition over deep nesting

## Common Tasks

### Adding a New Page

1. Create component in `src/app/pages/`
2. Create CSS Module file `PageName.module.css`
3. Add route in `src/app/App.tsx`
4. Follow existing page patterns

### Adding a New Component

1. Create component in `src/app/components/` or appropriate location
2. Create CSS Module file
3. Export from component file
4. Import and use in parent component

### Modifying Styles

- Component styles: Edit the `.module.css` file
- Global styles: Edit files in `src/styles/`
- Tokens: Modify `src/styles/tokens.css`

## Error Handling

- Use discriminated unions for error states
- Never throw strings - use Error objects
- Validate external data at boundaries
- Log errors appropriately (no tokens or PII)

## Testing Considerations

- This is a marketing website - focus on visual correctness
- Test in multiple browsers
- Ensure responsive design works
- Verify Firebase deployment works

## Deployment

- **Production**: `just deploy` (builds and deploys to Firebase)
- **Preview**: `just deploy-preview` (creates preview channel)
- Build output goes to `dist/` directory

## Important Notes for AI Agents

1. **No Business Logic**: This is a frontend-only site. All business logic lives in the Rust backend (converge-core).

2. **Type Safety First**: Always use proper TypeScript types. Never use `any`.

3. **CSS Modules**: Always use CSS Modules for component styles. Don't use inline styles or global CSS classes.

4. **Component Patterns**: Follow existing component patterns in the codebase.

5. **Validation**: When working with external data (API responses, user input), always validate at boundaries using Zod.

6. **Side Effects**: Keep side effects (API calls, subscriptions) in custom hooks, not in components.

7. **Code Quality**: Before suggesting changes, ensure `just check` would pass.

## References

- TypeScript Best Practices: `../best.hey.sh/TypeScript-Best-Practices-v1.md`
- Cursor Rules: `.cursorrules`
- Project README: `README.md`
