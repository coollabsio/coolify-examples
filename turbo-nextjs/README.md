# Coolify Configuration 

## Server build (NodeJS)
- Set `Build Pack` to `nixpacks`.
- Set the build command to `npm run build --filter=web`,
- Set the start command to `npm run start --filter=web`.
   - `npm` could be different depending on the package manager you are using (`Nixpacks` decides based on the lock file).
- That's all.
