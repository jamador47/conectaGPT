# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ConectaGPT is a complete fork and rebrand of FlowiseAI, specifically adapted for Spanish-speaking users. It's a low-code/no-code platform for building AI agents and chatflows using a visual drag-and-drop interface. This fork includes comprehensive internationalization (i18n) and complete Spanish localization. It's built as a monorepo with three main packages:

-   **server**: Node.js backend (Express) serving API endpoints and business logic
-   **ui**: React frontend with Material-UI for the visual flow builder
-   **components**: Third-party integrations (LangChain nodes, LLMs, vector stores, tools, etc.)
-   **api-documentation**: Auto-generated Swagger API documentation

## Essential Commands

### Development Setup

```bash
# Install dependencies (uses pnpm workspaces)
pnpm install

# Development mode (starts all packages with hot reload)
pnpm dev
# UI: http://localhost:8080, Server: varies by .env config

# Build all packages
pnpm build

# Production mode
pnpm start
# Server runs on http://localhost:3000
```

### Individual Package Commands

```bash
# Server (packages/server)
cd packages/server
pnpm dev          # Development with nodemon
pnpm build        # TypeScript compilation + gulp tasks
pnpm test         # Jest tests
pnpm typeorm:migration-generate  # Generate DB migrations

# UI (packages/ui)
cd packages/ui
pnpm dev          # Vite development server
pnpm build        # Vite production build

# Components (packages/components)
cd packages/components
pnpm build        # TypeScript + gulp (copies icons, assets)
pnpm lint         # ESLint
```

### Quality Assurance

```bash
# Lint entire codebase
pnpm lint
pnpm lint-fix

# Format code
pnpm format

# Run tests
pnpm test

# Clean builds
pnpm clean        # Clean dist folders
pnpm nuke         # Clean + remove node_modules
```

## Architecture & Key Patterns

### Monorepo Structure

-   Uses PNPM workspaces with Turbo for build orchestration
-   Shared dependencies managed at root level
-   Each package has independent build pipeline but coordinated through turbo.json

### Component System

-   All AI/ML integrations are in `packages/components/nodes/`
-   Each component follows a consistent interface pattern with `.ts` files and accompanying SVG icons
-   Components are categorized: chatmodels, embeddings, vectorstores, tools, agents, chains, etc.
-   Components export class definitions that extend base interfaces from `packages/components/src/Interface.ts`

### Database Architecture

-   Uses TypeORM with support for SQLite (default), PostgreSQL, MySQL
-   Migrations in `packages/server/src/database/migrations/`
-   Entities in `packages/server/src/database/entities/`
-   Database config via environment variables

### API Design

-   RESTful APIs with Express.js
-   Controllers in `packages/server/src/controllers/`
-   Routes in `packages/server/src/routes/`
-   Middleware for auth, CORS, rate limiting in `packages/server/src/middlewares/`

### Frontend Architecture

-   React with Material-UI v5
-   Redux Toolkit for state management
-   React Flow for the visual node editor
-   Vite for build tooling

### Configuration Management

-   Environment variables documented in CONTRIBUTING.md
-   `.env` files in `packages/server/` and `packages/ui/` for local development
-   Configuration utilities in `packages/server/src/utils/config.ts`

## Development Workflows

### Adding New Components

1. Create new component in appropriate `packages/components/nodes/` subdirectory
2. Follow existing component patterns (extend base interfaces)
3. Include SVG icon and update component registry
4. Build components package: `cd packages/components && pnpm build`
5. Changes require server restart to pick up new components

### Database Changes

1. Modify entities in `packages/server/src/database/entities/`
2. Generate migration: `cd packages/server && pnpm typeorm:migration-generate src/database/migrations/MigrationName`
3. Review generated migration file
4. Run migration: `pnpm typeorm:migration-run`

### Testing Strategy

-   Unit tests with Jest for server package
-   E2E tests with Cypress for full workflow testing
-   Component testing patterns in `packages/server/test/`

### Environment Configuration

Key environment variables for development:

-   `PORT`: Server port (default 3000)
-   `VITE_PORT`: UI development port
-   `DATABASE_TYPE`: sqlite/postgres/mysql
-   `DEBUG`: Enable component logging
-   `LOG_LEVEL`: info/debug/verbose/error

### Build Process

-   TypeScript compilation for all packages
-   Gulp tasks for asset copying (components package)
-   Turbo orchestrates dependencies between packages
-   Production builds optimize for deployment

## Important Notes

-   Components package changes require rebuild to be reflected in the application
-   Database migrations should be reviewed carefully before running in production
-   The project uses specific dependency versions - avoid casual upgrades without testing
-   PNPM v9 is required for workspace management
-   Node.js 18.15+ or 20+ required

## ConectaGPT-Specific Features

### Internationalization (i18n)

-   Full Spanish localization using react-i18next
-   Translation files located in `packages/ui/src/i18n/locales/`
-   Main translations: `es.json` (Spanish), `en.json` (English fallback)
-   Custom hook: `useTranslation` in `packages/ui/src/hooks/useTranslation.jsx`
-   Default language set to Spanish (`es`)

### Rebranding Changes

-   All references to "Flowise" replaced with "ConectaGPT"
-   Updated logos in `packages/ui/src/assets/images/conectagpt_*.svg`
-   Modified package.json files with new name and metadata
-   Updated HTML meta tags for Spanish SEO optimization
-   Changed GitHub repository references to ConectaGPT

### UI Components with i18n

-   All user-facing text uses translation keys (e.g., `t('chatflows.title')`)
-   Menu items use dynamic translations via `getDashboardMenuItems(t)`
-   Dialog components and forms include Spanish translations

### Fork Maintenance

-   Based on FlowiseAI v3.0.4
-   Future updates from upstream require careful merge of translations
-   Maintain Spanish-first approach while preserving English fallback
