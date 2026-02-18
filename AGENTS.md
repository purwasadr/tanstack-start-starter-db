# Project Instructions

## Project Context

(example!)UniExam Pro is a robust, cloud-based online examination platform designed specifically for universities and higher education institutions. It streamlines the entire exam lifecycle—from question creation and student enrollment to secure proctored testing, automated grading, and detailed analytics. Built with scalability in mind, it supports thousands of simultaneous users across multiple campuses, enabling remote or in-person exams with enterprise-grade security. Whether for midterms, finals, placement tests, or certifications, UniExam Pro ensures academic integrity while saving time and reducing costs compared to traditional paper-based systems.

## Tech Stack

- **Framework**: TanStack Start (full-stack React)
- **Frontend**: React 19, TanStack Router (file-based routing), TanStack Form, TanStack Table
- **Backend**: TanStack Start server functions with Nitro
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod v4
- **Auth**: better-auth
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-ui variant)
- **Package Manager**: Bun
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/              # shadcn/ui base components
│   └── app-form-components.tsx  # Form field wrappers for TanStack Form
├── db/                  # Database layer
│   ├── schema/          # Drizzle table schemas
│   └── seed/            # Database seeding scripts
├── fn/                  # Server functions (TanStack Start createServerFn)
├── hooks/               # Custom React hooks
├── lib/                 # Core utilities (auth, utils, errors)
├── middlewares/          # Request and function middleware
│   ├── fn/              # Server function middleware
│   └── request/         # HTTP request middleware
├── routes/              # File-based routing (TanStack Router)
├── services/            # Database operations (CRUD)
├── types/               # TypeScript type definitions
└── utils/               # Helper utilities
```

## Architecture Patterns

### Services Layer (`src/services/`)

Services handle database operations. Export as default object with CRUD methods.

```typescript
// Pattern: src/services/[entity]-service.ts
const createEntity = async (data) => { /* ... */ }
const getEntities = async ({ pageIndex, pageSize }) => { /* ... */ }
const getEntity = async (id: string) => { /* ... */ }
const updateEntity = async (id: string, data) => { /* ... */ }
const deleteEntity = async (id: string) => { /* ... */ }

export default {
  createEntity,
  getEntities,
  getEntity,
  updateEntity,
  deleteEntity,
}
```

### Server Functions (`src/fn/`)

Use TanStack Start's `createServerFn` with Zod validation and middleware.

```typescript
// Pattern: src/fn/[entity]-fn.ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import authFnMiddleware from '@/middleware/fn/auth-fn-middleware'
import { entityService } from '@/services'

export const getEntityFn = createServerFn()
  .inputValidator(z.object({ id: z.string() }))
  .middleware([authFnMiddleware])
  .handler(async ({ data }) => {
    return entityService.getEntity(data.id)
  })

// For mutations, specify POST method
export const createEntityFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ /* fields */ }))
  .middleware([authFnMiddleware])
  .handler(async ({ data }) => {
    return entityService.createEntity(data)
  })
```

### Middleware (`src/middleware/fn/`)

Function middleware for auth and error handling.

```typescript
// Pattern: src/middleware/fn/[name]-fn-middleware.ts
import { createMiddleware } from '@tanstack/react-start'
import { ServerFnError } from '@/lib/server-fn-error'

const exampleMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    // Middleware logic
    return next({ context: { /* additional context */ } })
  },
)

export default exampleMiddleware
```

### Database Schema (`src/db/schema/`)

Use Drizzle ORM with PostgreSQL. Export types alongside schemas.

```typescript
// Pattern: src/db/schema/[entity]-schema.ts
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const entity = pgTable('entity', {
  id: text('id').primaryKey(),
  // Use nanoid for IDs when inserting
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export type Entity = typeof entity.$inferSelect
```

### Routes (`src/routes/`)

File-based routing with TanStack Router. Use route components pattern.

```typescript
// Pattern: src/routes/[path]/index.tsx or $param.tsx for dynamic routes
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/path')({
  component: RouteComponent,
  loader: async ({ params }) => {
    // Fetch data for the route
    return { data }
  },
})

function RouteComponent() {
  const { data } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  // Component logic
}
```

### Forms (`src/hooks/use-app-form.ts`)

Use the custom `useAppForm` hook that wraps TanStack Form with shadcn/ui components.

```typescript
import { useAppForm } from '@/hooks/use-app-form'

const form = useAppForm({
  defaultValues: { title: '', description: '' },
  onSubmit: async ({ value }) => {
    await createEntityFn({ data: value })
  },
})

// Use form.AppField for form fields
<form.AppField name="title" children={(field) => <field.InputField label="Title" />} />
<form.AppForm.SubscribeButton label="Submit" />
```

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Server functions | `*Fn` suffix | `getExamsFn`, `createQuestionFn` |
| Services | Default export object | `examService.getExams()` |
| Middleware | `*Middleware` suffix | `authFnMiddleware` |
| Database tables | Singular, snake_case | `exam`, `question` |
| Types | PascalCase, from schema | `Exam`, `Question` |
| Route components | `RouteComponent` function | `function RouteComponent()` |
| UI components | PascalCase | `Button`, `Field`, `Select` |

## Code Patterns

### Imports

Always use the `@/` path alias for src imports:

```typescript
import { db } from '@/db'
import { exam } from '@/db/schema'
import { examService } from '@/services'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

### ID Generation

Use `nanoid` for generating unique IDs:

```typescript
import { nanoid } from 'nanoid'

const entity = await db.insert(table).values({ id: nanoid(), ...data })
```

### Error Handling

Use `ServerFnError` for typed server function errors:

```typescript
import { ServerFnError } from '@/lib/server-fn-error'

// Error codes: NOT_FOUND, UNAUTHORIZED, FORBIDDEN, VALIDATION_ERROR, 
//              RATE_LIMIT_EXCEEDED, OPERATION_FAILED, INTERNAL_ERROR
throw new ServerFnError('NOT_FOUND', 'Entity not found')
```

### Pagination

Return `PaginationResult<T>` for paginated data:

```typescript
import type { PaginationResult } from '@/types'

return {
  data: items,
  meta: {
    pageIndex,
    pageSize,
    rowCount,
  },
} satisfies PaginationResult<Entity>
```

### Styling

Use `cn()` utility for conditional class names:

```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class', className)} />
```

## Component Patterns

### UI Components (`src/components/ui/`)

Based on shadcn/ui with base-ui primitives. Use `class-variance-authority` for variants.

#### shadcn/ui with Base UI Rules

This project uses **shadcn/ui with Base UI** as the primitive layer instead of Radix UI. The key difference is the composition pattern:

**Use `render` prop instead of `asChild`**

Base UI components use the `render` prop for component composition, NOT `asChild` (which is Radix-specific).

```typescript
// ❌ WRONG - Radix/asChild pattern (do NOT use)
<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>

// ✅ CORRECT - Base UI/render pattern
<Button render={<Link to="/dashboard" />}>
  Go to Dashboard
</Button>
```

**The `render` prop pattern:**

```typescript
// Render as a different element
<Button render={<a href="/external" />}>External Link</Button>

// Render as a router Link
<Button render={<Link to="/page" />}>Navigate</Button>

// With additional props on the rendered element
<Button render={<Link to="/page" className="custom-class" />}>
  Click Me
</Button>
```

**Component composition examples:**

```typescript
// Dialog trigger as custom button
<Dialog.Trigger render={<Button variant="outline" />}>
  Open Dialog
</Dialog.Trigger>

// DropdownMenu item as link
<DropdownMenu.Item render={<Link to="/settings" />}>
  Settings
</DropdownMenu.Item>

// NavigationMenu link
<NavigationMenu.Link render={<Link to="/about" />}>
  About
</NavigationMenu.Link>
```

**Key differences from Radix-based shadcn:**

| Feature | Radix (asChild) | Base UI (render) |
|---------|-----------------|------------------|
| Composition prop | `asChild` | `render` |
| Child element | Passed as children | Passed to render prop |
| Content | Inside child element | As component children |

### Route-specific Components

Place in `-components/` folder next to routes:

```
routes/
└── admin/
    ├── -components/       # Shared admin components
    │   └── panel-layout.tsx
    └── exams/
        ├── -components/   # Exam-specific components
        │   └── exam-form.tsx
        └── index.tsx
```

## Commands

```bash
bun dev              # Start dev server on port 3000
bun run build        # Build for production
bun run seed         # Seed database
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run migrations
bun run db:push      # Push schema to database
bun run db:studio    # Open Drizzle Studio
bun run check        # Format and lint
```

## Best Practices

1. Keep files under 200 lines when possible
2. Write descriptive comments explaining complex logic
3. Use Zod schemas for all server function inputs
4. Always wrap server functions with auth middleware
5. Export types alongside database schemas
6. Use TypeScript strict mode (already configured)
7. Test after every meaningful change

