🚧 THIS WORKFLOW IS UNDER CONSTRUCTION 🚧

# Fastify v4: Migration Recipe

This is a comprehensive migration workflow that runs all the individual Fastify v4 codemods in sequence. It provides a complete step-by-step approach to upgrading your Fastify application to version 4.

## Migration Workflow

This recipe runs the following codemods in order:

1. **await-register-calls** - Transform `fastify.register()` calls to use `await`
2. **expose-head-routes** - Add HEAD route exposure for GET routes
3. **remove-app-use** - Remove deprecated `app.use()` calls
4. **reply-raw-access** - Update `reply.raw` access patterns
5. **url-params-optional** - Update URL parameter handling for optional parameters
6. **wrap-routes-plugin** - Suggest wrapping routes in plugins for better organization

## Usage

### Option 1: Run the complete migration script (Recommended)

```bash
# Run all codemods in sequence
./run-migration.sh ./path/to/your/code

# Or run on current directory
./run-migration.sh

# Or using npm script
npm run migrate ./path/to/your/code
```

### Option 2: Run individual codemods manually

```bash
# Run each codemod individually
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../await-register-calls/scripts/codemod.ts
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../expose-head-routes/scripts/codemod.ts
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../remove-app-use/scripts/codemod.ts
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../reply-raw-access/scripts/codemod.ts
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../url-params-optional/scripts/codemod.ts
npx codemod@latest jssg run --language typescript --target ./path/to/your/code ../wrap-routes-plugin/scripts/codemod.ts
```

## Before Migration

```javascript
const fastify = require('fastify')();

// Old patterns that need migration
fastify.use(require('cors')());
fastify.register(require('./my-plugin'));

fastify.get('/users/:id?', (request, reply) => {
  reply.raw.setHeader('Content-Type', 'application/json');
  reply.send({ user: request.params.id });
});
```

## After Migration

```javascript
const fastify = require('fastify')();

// New patterns for Fastify v4
await fastify.register(require('@fastify/cors'));
await fastify.register(require('./my-plugin'));

await fastify.register(async function (fastify) {
  fastify.get('/users/:id?', { exposeHeadRoute: true }, (request, reply) => {
    reply.raw().setHeader('Content-Type', 'application/json');
    reply.send({ user: request.params.id });
  });
}, { prefix: '/api' });
```

## Manual Steps Required

After running the codemods, you may need to:

1. **Update dependencies**: Replace Express middleware with Fastify plugins
2. **Test thoroughly**: Ensure all routes work as expected
3. **Update TypeScript types**: If using TypeScript, update type definitions
4. **Review error handling**: Check that error handling still works correctly
5. **Update tests**: Ensure your tests still pass with the new patterns

## Breaking Changes in Fastify v4

- `app.use()` method has been removed
- `reply.raw` is now a method instead of a property
- Route registration is now synchronous
- HEAD routes are automatically exposed for GET routes
- Optional parameter handling has been updated
