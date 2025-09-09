const fastify = require('fastify')();

// Deprecated in Fastify v4
// TODO: Replace fastify.use(require('cors')()) with appropriate Fastify plugin
// Common replacements:
// - cors() → @fastify/cors
// - helmet() → @fastify/helmet
// - express-session → @fastify/session
// Example: await fastify.register(require('@fastify/cors'));
// TODO: Replace fastify.use(require('helmet')()) with appropriate Fastify plugin
// Common replacements:
// - cors() → @fastify/cors
// - helmet() → @fastify/helmet
// - express-session → @fastify/session
// Example: await fastify.register(require('@fastify/cors'));
// TODO: Replace fastify.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
})) with appropriate Fastify plugin
// Common replacements:
// - cors() → @fastify/cors
// - helmet() → @fastify/helmet
// - express-session → @fastify/session
// Example: await fastify.register(require('@fastify/cors'));

// Other non-use calls should remain unchanged
fastify.get('/example', (request, reply) => {
  reply.send({ message: 'Hello World' });
});

fastify.register(require('./my-plugin'));
