# Fastify v4: Expose HEAD Routes

This codemod adds HEAD route exposure for GET routes in Fastify v4. In Fastify v4, GET routes automatically expose HEAD routes, but you may need to explicitly configure this behavior.

## Before

```javascript
const fastify = require('fastify')();

fastify.get('/example', (request, reply) => {
  reply.send({ message: 'Hello World' });
});
```

## After

```javascript
const fastify = require('fastify')();

fastify.get('/example', (request, reply) => {
  reply.send({ message: 'Hello World' });
});

// HEAD route is automatically exposed for GET routes in Fastify v4
// You can also explicitly configure it if needed:
fastify.get('/example', { exposeHeadRoute: true }, (request, reply) => {
  reply.send({ message: 'Hello World' });
});
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Adds `exposeHeadRoute: true` option to GET routes where appropriate
- Ensures HEAD routes are properly exposed for GET endpoints
- Maintains compatibility with Fastify v4's automatic HEAD route exposure
