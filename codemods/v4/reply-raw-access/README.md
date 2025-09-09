# Fastify v4: Reply Raw Access

This codemod updates `reply.raw` access patterns for Fastify v4 compatibility. In Fastify v4, the way you access the raw response object has changed.

## Before

```javascript
const fastify = require('fastify')();

fastify.get('/example', (request, reply) => {
  // Direct access to reply.raw
  reply.raw.setHeader('Custom-Header', 'value');
  reply.raw.statusCode = 200;
  reply.send({ message: 'Hello World' });
});
```

## After

```javascript
const fastify = require('fastify')();

fastify.get('/example', (request, reply) => {
  // Use reply.raw() method instead of direct property access
  reply.raw().setHeader('Custom-Header', 'value');
  reply.raw().statusCode = 200;
  reply.send({ message: 'Hello World' });
});
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Transforms `reply.raw` property access to `reply.raw()` method calls
- Ensures compatibility with Fastify v4's new reply API
- Maintains the same functionality while using the correct API
