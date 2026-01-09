# Förbättringsförslag för converge.hey.sh-www

Detta dokument identifierar förbättringsområden baserat på TypeScript Best Practices och projektets cursor rules.

## 🔴 Kritiska Förbättringar (Type Safety)

### 1. API Boundary Validation med Zod

**Problem:** API responses valideras inte - använder `as` casts vilket bryter mot best practices.

**Nuvarande kod:**
```typescript
// src/api/client.ts:40,44
const error = await response.json() as ApiError;
return response.json() as Promise<T>;
```

**Förslag:**
- Installera Zod: `bun add zod`
- Skapa Zod schemas för alla API responses i `src/api/schemas.ts`
- Validera alla responses vid boundary
- Använd Result-style returns för error handling

**Exempel:**
```typescript
import { z } from 'zod';

const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

const ValidateRulesResponseSchema = z.object({
  is_valid: z.boolean(),
  scenario_count: z.number(),
  issues: z.array(ValidationIssueSchema),
  confidence: z.number(),
});

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

async function request<T>(
  path: string,
  schema: z.ZodSchema<T>,
  options: RequestInit = {},
): Promise<Result<T, ConvergeApiError>> {
  // ... fetch logic
  // Validate response with schema
  const parseResult = schema.safeParse(await response.json());
  if (!parseResult.success) {
    return { ok: false, error: new ValidationError(parseResult.error) };
  }
  return { ok: true, value: parseResult.data };
}
```

### 2. Environment Variables Validation

**Problem:** `VITE_API_URL` används utan validering.

**Nuvarande kod:**
```typescript
// src/api/client.ts:13
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

**Förslag:**
- Skapa `src/config/env.ts` med Zod schema
- Validera alla env vars vid app startup
- Fail fast om required env vars saknas

**Exempel:**
```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:8080'),
});

export const env = EnvSchema.parse(import.meta.env);
```

### 3. Förbättrad Error Handling

**Problem:** 
- `catch` block i `Tools.tsx` fångar allt utan att logga eller hantera specifikt
- Ingen skillnad mellan network errors, validation errors, och API errors

**Nuvarande kod:**
```typescript
// src/app/pages/Tools.tsx:140
} catch {
  // Fall back to local validation
  // Ingen error logging eller specifik hantering
}
```

**Förslag:**
- Använd discriminated unions för error states
- Logga errors (utan tokens/PII)
- Hantera olika error typer specifikt
- Visa användarvänliga felmeddelanden

**Exempel:**
```typescript
type ValidationError = 
  | { type: 'network'; message: string }
  | { type: 'validation'; message: string; details: unknown }
  | { type: 'api'; status: number; message: string };

} catch (error) {
  if (error instanceof ConvergeApiError) {
    // Log API error
    console.error('API validation failed:', error.status, error.message);
    setValidation({
      loading: false,
      error: { type: 'api', status: error.status, message: error.message },
      // ...
    });
  } else if (error instanceof Error) {
    // Log network/unknown error
    console.error('Validation request failed:', error.message);
    // Fall back to local
  }
}
```

## 🟡 Viktiga Förbättringar (Code Organization)

### 4. Extrahera API Calls till Custom Hooks

**Problem:** API calls finns direkt i komponenter, bryter mot "side effects outside components" princip.

**Nuvarande kod:**
```typescript
// src/app/pages/Tools.tsx:129-155
const handleValidate = async () => {
  // API call direkt i komponent
  const result = await api.validateRules({...});
}
```

**Förslag:**
- Skapa `src/app/hooks/useValidateRules.ts`
- Flytta all API-logik till hook
- Komponenten blir presentational

**Exempel:**
```typescript
// src/app/hooks/useValidateRules.ts
export function useValidateRules() {
  const [state, setState] = useState<ValidationState>({...});
  
  const validate = useCallback(async (content: string, useLlm: boolean) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const result = await api.validateRules({ content, use_llm: useLlm });
      setState({ loading: false, result, error: null, mode: 'api' });
    } catch (error) {
      // Error handling
    }
  }, []);
  
  return { state, validate };
}
```

### 5. Discriminated Unions för State

**Problem:** `ValidationState` använder nullable fields istället för discriminated union.

**Nuvarande kod:**
```typescript
// src/app/pages/Tools.tsx:112-117
type ValidationState = {
  loading: boolean;
  result: ValidateRulesResponse | null;
  error: string | null;
  mode: 'local' | 'api';
};
```

**Förslag:**
- Använd discriminated union för typsäkerhet
- TypeScript kan då narrow types automatiskt

**Exempel:**
```typescript
type ValidationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: ValidateRulesResponse; mode: 'api' | 'local' }
  | { status: 'error'; error: ValidationError; mode: 'api' | 'local' };
```

### 6. Type-safe Error Classes

**Problem:** `ConvergeApiError` är bra, men saknar type narrowing helpers.

**Förslag:**
- Lägg till type guards
- Använd Result types konsekvent

**Exempel:**
```typescript
export function isConvergeApiError(error: unknown): error is ConvergeApiError {
  return error instanceof ConvergeApiError;
}

export function isNetworkError(error: unknown): error is Error {
  return error instanceof Error && !isConvergeApiError(error);
}
```

## 🟢 Rekommenderade Förbättringar (Code Quality)

### 7. ESLint Configuration

**Problem:** Ingen explicit ESLint config fil hittades.

**Förslag:**
- Skapa `eslint.config.js` enligt best practices
- Aktivera TypeScript ESLint rules
- Lägg till React hooks rules

**Exempel:**
```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
    },
  },
];
```

### 8. Prettier Configuration

**Problem:** Ingen explicit Prettier config hittades.

**Förslag:**
- Skapa `.prettierrc.json` enligt best practices
- Matcha med projektets stil

**Exempel:**
```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "tabWidth": 2
}
```

### 9. Error Boundary Component

**Problem:** Ingen React Error Boundary för att fånga rendering errors.

**Förslag:**
- Skapa `src/app/components/ErrorBoundary.tsx`
- Wrap app med ErrorBoundary
- Visa användarvänligt felmeddelande

### 10. Loading States

**Problem:** Inga loading states för API calls (utom i Tools).

**Förslag:**
- Standardisera loading states
- Använd samma pattern överallt
- Överväg React Query för server state management

### 11. Accessibility Förbättringar

**Problem:** Vissa komponenter saknar ARIA labels och keyboard navigation.

**Förslag:**
- Lägg till `aria-label` där det saknas
- Förbättra keyboard navigation
- Testa med screen readers

### 12. Type Exports

**Problem:** Types exporteras med `export type *` vilket kan orsaka problem.

**Nuvarande kod:**
```typescript
// src/api/index.ts:2
export type * from './types';
```

**Förslag:**
- Använd explicit exports
- Eller `export type { ... }` med named exports

## 📋 Implementation Prioritet

### Högsta prioritet (Type Safety)
1. ✅ API Boundary Validation med Zod
2. ✅ Environment Variables Validation
3. ✅ Förbättrad Error Handling

### Medel prioritet (Code Organization)
4. ✅ Extrahera API Calls till Custom Hooks
5. ✅ Discriminated Unions för State
6. ✅ Type-safe Error Classes

### Lägsta prioritet (Code Quality)
7. ✅ ESLint Configuration
8. ✅ Prettier Configuration
9. ✅ Error Boundary Component
10. ✅ Loading States
11. ✅ Accessibility
12. ✅ Type Exports

## 🎯 Quick Wins

Dessa kan implementeras snabbt med stor impact:

1. **Lägg till Zod** och validera API responses
2. **Skapa custom hook** för `useValidateRules`
3. **Lägg till error logging** i catch blocks
4. **Skapa ErrorBoundary** komponent

## 📝 Noteringar

- Projektet följer redan många best practices (strict TS, CSS Modules, etc.)
- Huvudsakliga förbättringar handlar om boundary validation och error handling
- Inga `any` types hittades - bra! ✅
- Komponentstrukturen är ren och tydlig ✅
