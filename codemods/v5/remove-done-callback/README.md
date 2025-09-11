# Fastify v5: Remove done callback

This codemod updates `fastify.register` to use `return` instead of `done`, reflecting changes in Fastify v5 for asynchronous plugin registration.

## What Changed

Fastify v5 has simplified plugin registration by removing the `done` callback parameter. Plugins should now use `return` statements instead of calling `done()`.

## Before

```ts
fastify.register(async function(instance, opts, done) {
  done();
});
```

## After

```ts
fastify.register(async function(instance, opts) {
  return;
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
