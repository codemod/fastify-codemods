#!/bin/bash

# Fastify v4 Migration Recipe
# This script runs all individual codemods in sequence

set -e

TARGET_PATH=${1:-"."}

echo "🚀 Starting Fastify v4 Migration..."
echo "Target path: $TARGET_PATH"
echo ""

echo "Step 1: Transform fastify.register() calls to use await"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../await-register-calls/scripts/codemod.ts

echo ""
echo "Step 2: Add HEAD route exposure for GET routes"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../expose-head-routes/scripts/codemod.ts

echo ""
echo "Step 3: Remove deprecated app.use() calls"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../remove-app-use/scripts/codemod.ts

echo ""
echo "Step 4: Update reply.raw access patterns"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../reply-raw-access/scripts/codemod.ts

echo ""
echo "Step 5: Update URL parameter handling for optional parameters"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../url-params-optional/scripts/codemod.ts

echo ""
echo "Step 6: Suggest wrapping routes in plugins"
npx codemod@latest jssg run --language typescript --target "$TARGET_PATH" --allow-dirty ../wrap-routes-plugin/scripts/codemod.ts

echo ""
echo "✅ Fastify v4 migration completed!"
echo ""
echo "📝 Next steps:"
echo "1. Review the changes made by each codemod"
echo "2. Test your application thoroughly"
echo "3. Update any remaining manual changes as needed"
echo "4. Update your dependencies to Fastify v4"
