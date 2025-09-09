const fastify = require('fastify')();

fastify.get('/example', (request, reply) => {
  // Direct access to reply.raw
  reply.raw().setHeader('Custom-Header', 'value');
  reply.raw().statusCode = 200;
  reply.raw().end('Hello World');
  
  // Already using method call - should not be changed
  reply.raw().setHeader('Another-Header', 'value');
  
  reply.send({ message: 'Hello World' });
});

fastify.post('/users', (request, reply) => {
  reply.raw().setHeader('Content-Type', 'application/json');
  reply.raw().statusCode = 201;
  reply.send({ message: 'User created' });
});
