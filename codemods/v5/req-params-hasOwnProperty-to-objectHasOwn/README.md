# Fastify v5: req.params.hasOwnProperty to Object.hasOwn

This codemod transforms `req.params.hasOwnProperty('name')` into `Object.hasOwn(req.params, 'name')`, reflecting the new Fastify v5 approach to property checking.

## What Changed

Fastify v5 recommends using `Object.hasOwn()` instead of `hasOwnProperty()` for better performance and consistency.

## Before

```ts
fastify.get('/route/:name', (req, reply) => {
  console.log(req.params.hasOwnProperty('name')); // true
  return { hello: req.params.name };
});
```

## After

```ts
fastify.get('/route/:name', (req, reply) => {
  console.log(Object.hasOwn(req.params, 'name')); // true
  return { hello: req.params.name };
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
