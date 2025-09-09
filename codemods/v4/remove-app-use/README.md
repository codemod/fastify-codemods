# Fastify v4: Remove App Use

This codemod removes deprecated `app.use()` calls in Fastify v4. The `app.use()` method has been removed in Fastify v4 and should be replaced with proper Fastify middleware registration.

## Before

```javascript
const fastify = require('fastify')();

// Deprecated in Fastify v4
fastify.use(require('cors')());
fastify.use(require('helmet')());
```

## After

```javascript
const fastify = require('fastify')();

// Use register() instead
await fastify.register(require('@fastify/cors'));
await fastify.register(require('@fastify/helmet'));
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Removes `app.use()` calls that are no longer supported in Fastify v4
- Provides guidance on replacing with proper Fastify plugins
- Ensures compatibility with Fastify v4's plugin system

## Manual Intervention Required

This codemod will remove the `app.use()` calls, but you'll need to manually replace them with appropriate Fastify plugins. Common replacements include:

- `cors()` → `@fastify/cors`
- `helmet()` → `@fastify/helmet`
- `express-session` → `@fastify/session`
- Custom middleware → Convert to Fastify plugins
