# Coolify Configuration

1. Use `Nixpacks`.
2. Set `Ports Exposed` to `3000` (or any port you set).
3. Set `Start Command` to `node .output/server/index.mjs`
   - Alternatively, you can set the `start` script inside `package.json` to `node .output/server/index.mjs`. Then Nixpacks will automatically use it as the start command.
