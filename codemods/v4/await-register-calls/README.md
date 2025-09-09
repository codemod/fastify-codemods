# Fastify v4: Await Register Calls

This codemod helps to improve error reporting in route definitions. Route registration is now synchronous in Fastify v4. As a result, if you specify an `onRoute` hook in a plugin, you should now either:

1. Use `await` when calling `fastify.register()`
2. Or handle the promise returned by `fastify.register()`

## Before

```javascript
const fastify = require('fastify')();

fastify.register(async function (fastify) {
  fastify.get('/example', (request, reply) => {
    reply.send({ message: 'Hello World' });
  });
});

// Or in a plugin
fastify.register(require('./my-plugin'));
```

## After

```javascript
const fastify = require('fastify')();

await fastify.register(async function (fastify) {
  fastify.get('/example', (request, reply) => {
    reply.send({ message: 'Hello World' });
  });
});

// Or in a plugin
await fastify.register(require('./my-plugin'));
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Transforms `fastify.register()` calls to use `await`
- Ensures proper error handling for route registration
- Maintains compatibility with Fastify v4's synchronous route registration
