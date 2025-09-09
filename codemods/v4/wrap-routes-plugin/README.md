# Fastify v4: Wrap Routes Plugin

This codemod helps wrap routes in plugins for better organization in Fastify v4. This is a best practice for organizing routes and making them more modular.

## Before

```javascript
const fastify = require('fastify')();

// Routes defined directly on the main instance
fastify.get('/users', (request, reply) => {
  reply.send({ users: [] });
});

fastify.get('/users/:id', (request, reply) => {
  reply.send({ user: { id: request.params.id } });
});

fastify.post('/users', (request, reply) => {
  reply.send({ message: 'User created' });
});
```

## After

```javascript
const fastify = require('fastify')();

// Routes wrapped in a plugin
fastify.register(async function (fastify) {
  fastify.get('/users', (request, reply) => {
    reply.send({ users: [] });
  });

  fastify.get('/users/:id', (request, reply) => {
    reply.send({ user: { id: request.params.id } });
  });

  fastify.post('/users', (request, reply) => {
    reply.send({ message: 'User created' });
  });
}, { prefix: '/api' });
```

## Usage

```bash
npx codemod@latest jssg run ./scripts/codemod.ts --input ./path/to/your/code
```

## What it does

- Wraps related routes in plugin functions
- Adds proper plugin structure for better organization
- Maintains route functionality while improving code structure
- Suggests adding prefixes for better API organization
