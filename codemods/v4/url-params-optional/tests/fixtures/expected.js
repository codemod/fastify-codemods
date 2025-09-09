const fastify = require('fastify')();

// Old way of defining optional parameters
// Note: Optional parameters in Fastify v4 may require additional handling
// Consider using schema validation for better type safety
fastify.get('/users/:id?', (request, reply) => {
  const userId = request.params.id;
  reply.send({ userId });
});

// Multiple optional parameters
// Note: Optional parameters in Fastify v4 may require additional handling
// Consider using schema validation for better type safety
fastify.get('/posts/:category?/:id?', (request, reply) => {
  const { category, id } = request.params;
  reply.send({ category, id });
});

// No optional parameters - should not be changed
fastify.get('/users/:id', (request, reply) => {
  const userId = request.params.id;
  reply.send({ userId });
});

fastify.post('/users', (request, reply) => {
  reply.send({ message: 'User created' });
});
