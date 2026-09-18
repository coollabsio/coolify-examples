# Coolify Configuration

Check [astro.config.mjs](./astro.config.mjs).

1. Use `Nixpacks`.
2. Set `Ports Exposed` to `4321` (or any port you set in your `astro.config.mjs` file)
3. Set `Start Command` to `HOST=0.0.0.0 node dist/server/entry.mjs`
   - Alternatively, you can set the `start` script inside `package.json` to `HOST=0.0.0.0 node dist/server/entry.mjs`. Then Nixpacks will automatically use it as the start command.
