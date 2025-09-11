# Fastify v5: Rename logger to loggerInstance

This codemod updates the Fastify logger configuration by renaming the `logger` option to `loggerInstance`, in line with Fastify v5 changes.

## What Changed

Fastify v5 has updated the logger configuration option from `logger` to `loggerInstance` for better clarity and consistency.

## Before

```ts
const logger = require('pino')();
const fastify = require('fastify')({
  logger,
});
```

## After

```ts
const loggerInstance = require('pino')();
const fastify = require('fastify')({
  loggerInstance,
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
