# Fastify v5: Replace req.connection with req.socket

This codemod updates references from `req.connection` to `req.socket`, reflecting changes in Fastify v5's request handling.

## What Changed

Fastify v5 has replaced `req.connection` with `req.socket` for better consistency with Node.js standards.

## Before

```ts
fastify.get('/route', (req, reply) => {
  console.log(req.connection.remoteAddress);
  return { hello: 'world' };
});
```

## After

```ts
fastify.get('/route', (req, reply) => {
  console.log(req.socket.remoteAddress);
  return { hello: 'world' };
});
```

## Usage

```bash
npx codemod@latest jssg run -l typescript ./scripts/codemod.ts <target-path>
```

## Testing

```bash
npm test
```
