# Coolify Configuration 

## Server build (NodeJS) all apps
- Set `Build Pack` to `nixpacks`.
- Set the start command to `npm run start`.
   - `npm` could be different depending on the package manager you are using (`Nixpacks` decides based on the lock file).
- Set the 'Ports Exposes' to `3000,3001`.
- That's all.

## Server build (NodeJS) specific app
Configuration to use the `--filter` option with Turbo for launching specific applications. Ensures that only the targeted application is started, enhancing resource efficiency and simplifying the startup process (every app can be created as a separate Coolify Application).
- Set `Build Pack` to `nixpacks`.
- Set the build command to `npm run build --filter=web`,
- Set the start command to `cd apps/web && npm run start`.
   - `npm` could be different depending on the package manager you are using (`Nixpacks` decides based on the lock file).
- That's all.
