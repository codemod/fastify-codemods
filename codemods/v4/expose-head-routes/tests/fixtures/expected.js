const fastify = require('fastify')();

fastify.get('/example', { exposeHeadRoute: true }, (request, reply) => {
  reply.send({ message: 'Hello World' });
});

fastify.get('/users', { exposeHeadRoute: true }, (request, reply) => {
  reply.send({ users: [] });
});

// Already has exposeHeadRoute - should not be changed
fastify.get('/posts', { exposeHeadRoute: true }, (request, reply) => {
  reply.send({ posts: [] });
});

fastify.post('/users', (request, reply) => {
  reply.send({ message: 'User created' });
});
