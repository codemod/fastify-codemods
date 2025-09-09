const fastify = require('fastify')();

await fastify.register(async function (fastify) {
  fastify.get('/example', (request, reply) => {
    reply.send({ message: 'Hello World' });
  });
});

// Or in a plugin
await fastify.register(require('./my-plugin'));

// Already awaited - should not be changed
await fastify.register(require('./another-plugin'));

// Multiple register calls
await fastify.register(require('./plugin1'));
await fastify.register(require('./plugin2'));
