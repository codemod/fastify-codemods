# Fastify v5: Replace reply.sent with reply.hijack

This codemod turns `reply.sent = true` into `reply.hijack()`, updating to the new Fastify v5 method for handling manual responses.

## What Changed

Fastify v5 has replaced the `reply.sent = true` pattern with `reply.hijack()` for better clarity and consistency in handling manual responses.

## Before

```ts
fastify.get('/route', (req, reply) => {
  reply.sent = true;
  reply.raw.end('hello');
});
```

## After

```ts
fastify.get('/route', (req, reply) => {
  reply.hijack();
  reply.raw.end('hello');
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
