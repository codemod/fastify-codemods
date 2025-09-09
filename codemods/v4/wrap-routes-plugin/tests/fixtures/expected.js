const fastify = require('fastify')();

// Routes defined directly on the main instance
// TODO: Consider wrapping related routes in a plugin for better organization
// Example: await fastify.register(async function (fastify) { ... }, { prefix: '/api' })
fastify.get('/users', (request, reply) => {
  reply.send({ users: [] });
});

// TODO: Consider wrapping related routes in a plugin for better organization
// Example: await fastify.register(async function (fastify) { ... }, { prefix: '/api' })
fastify.get('/users/:id', (request, reply) => {
  reply.send({ user: { id: request.params.id } });
});

// TODO: Consider wrapping related routes in a plugin for better organization
// Example: await fastify.register(async function (fastify) { ... }, { prefix: '/api' })
fastify.post('/users', (request, reply) => {
  reply.send({ message: 'User created' });
});

// Single route - should not be wrapped
// TODO: Consider wrapping related routes in a plugin for better organization
// Example: await fastify.register(async function (fastify) { ... }, { prefix: '/api' })
fastify.get('/health', (request, reply) => {
  reply.send({ status: 'ok' });
});

// Already in a plugin - should not be changed
fastify.register(async function (fastify) {
  // TODO: Consider wrapping related routes in a plugin for better organization
// Example: await fastify.register(async function (fastify) { ... }, { prefix: '/api' })
fastify.get('/posts', (request, reply) => {
    reply.send({ posts: [] });
  });
});
