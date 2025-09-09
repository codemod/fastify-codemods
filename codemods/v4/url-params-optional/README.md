# Fastify v4: URL Params Optional

This codemod updates URL parameter handling for optional parameters in Fastify v4. The way optional parameters are handled in route definitions has changed in Fastify v4.

## Before

```javascript
const fastify = require('fastify')();

// Old way of defining optional parameters
fastify.get('/users/:id?', (request, reply) => {
  const userId = request.params.id;
  reply.send({ userId });
});

// Multiple optional parameters
fastify.get('/posts/:category?/:id?', (request, reply) => {
  const { category, id } = request.params;
  reply.send({ category, id });
});
```

## After

```javascript
const fastify = require('fastify')();

// New way with proper optional parameter handling
fastify.get('/users/:id?', (request, reply) => {
  const userId = request.params.id;
  reply.send({ userId });
});

// Multiple optional parameters with proper handling
fastify.get('/posts/:category?/:id?', (request, reply) => {
  const { category, id } = request.params;
  reply.send({ category, id });
});
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Updates route parameter handling for optional parameters
- Ensures proper parameter extraction in Fastify v4
- Maintains backward compatibility while using the new API
