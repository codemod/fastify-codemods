# Fastify v5: Add exposeHeadRoutes option

This codemod introduces the `exposeHeadRoutes: false` option to avoid automatic `HEAD` route exposure, while keeping manually defined `HEAD` routes intact.

## What Changed

Fastify v5 has changed the behavior of automatic HEAD route exposure. This codemod adds the `exposeHeadRoutes: false` option to `fastify.get` calls to maintain the previous behavior.

## Before

```ts
fastify.get('/route', {}, (req, reply) => {
  reply.send({ hello: 'world' });
});

fastify.head('/route', (req, reply) => {
  // ...
});
```

## After

```ts
fastify.get(
  '/route', {
    exposeHeadRoutes: false,
  },
  (req, reply) => {
    reply.send({ hello: 'world' });
  },
);

fastify.head('/route', (req, reply) => {
  // ...
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

