# Coolify Configuration

Check [nuxt.config.js](./nuxt.config.js).

## Dockerfile

1. Create a `Dockerfile` in the root of your project with the following content:

```Dockerfile
FROM node:24 AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run generate

FROM nginx
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Select `Dockerfile` as the `Build Pack` in Coolify.
3. Set `Ports Exposed` to `80`.

## Nixpacks

1. Create a `nixpacks.toml` file in the root of your project with the following content:

```toml
[phases.setup]
nixpkgsArchive = '51ad838b03a05b1de6f9f2a0fffecee64a9788ee'
```

2. Select `Nixpacks` as the `Build Pack` in Coolify.
3. Turn on `Is it a static site?`.
4. Set `Publish Directory` to `/.output/public`.
