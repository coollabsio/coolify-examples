# Coolify Configuration

## Dockerfile

1.  Create a `Dockerfile` in the root of your project with the following content:

```Dockerfile
  FROM node:24 AS build
  WORKDIR /app
  COPY package.json package-lock.json\* ./
  RUN npm ci
  COPY . .
  RUN npm run build

  FROM node:24
  WORKDIR /app
  COPY --from=build /app/.output/ ./
  ENV PORT=3000
  ENV HOST=0.0.0.0
  EXPOSE 3000
  CMD ["node", "/app/server/index.mjs"]
```

2. Select `Dockerfile` as the `Build Pack` in Coolify.
3. Set `Ports Exposed` to `3000` (or any port you set).
4. Set `Dockerfile Location` to the location of your `Dockerfile` (e.g., `/Dockerfile`).

## Nixpacks

1. Create a `nixpacks.toml` file in the root of your project with the following content:

```toml
[phases.setup]
nixpkgsArchive = '51ad838b03a05b1de6f9f2a0fffecee64a9788ee'
```

2. Select `Nixpacks` as the `Build Pack` in Coolify.
3. Set `Ports Exposed` to `3000` (or any port you set).
4. Set `Start Command` to `node .output/server/index.mjs`
   - Alternatively, you can set the `start` script inside `package.json` to `node .output/server/index.mjs`. Then Nixpacks will automatically use it as the start command.
