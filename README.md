# Coolify Examples

Example applications for deploying to [Coolify](https://coolify.io).

## Runtimes

| Runtime | Description |
|---------|-------------|
| [node](./node) | Node.js applications |

## Node.js Examples

### Backend Frameworks

| Framework | Description |
|-----------|-------------|
| [simple-webserver](./node/simple-webserver) | Pure Node.js HTTP server |
| [expressjs](./node/expressjs) | Express.js web framework |
| [fastify](./node/fastify) | Fastify web framework |
| [nestjs](./node/nestjs) | NestJS framework |
| [adonisjs](./node/adonisjs) | AdonisJS framework |
| [hono](./node/hono) | Hono web framework |
| [koa](./node/koa) | Koa web framework |

### Frontend Frameworks

| Framework | SSR | Static |
|-----------|-----|--------|
| [nextjs](./node/nextjs) | [ssr](./node/nextjs/ssr) | [static](./node/nextjs/static) |
| [nuxtjs](./node/nuxtjs) | [ssr](./node/nuxtjs/ssr) | [static](./node/nuxtjs/static) |
| [remix](./node/remix) | [ssr](./node/remix/ssr) | [static](./node/remix/static) |
| [astro](./node/astro) | [ssr](./node/astro/ssr) | [static](./node/astro/static) |
| [sveltekit](./node/sveltekit) | [ssr](./node/sveltekit/ssr) | [static](./node/sveltekit/static) |
| [tanstack-start](./node/tanstack-start) | [ssr](./node/tanstack-start/ssr) | [static](./node/tanstack-start/static) |
| [angular](./node/angular) | [ssr](./node/angular/ssr) | [static](./node/angular/static) |
| [vue](./node/vue) | [ssr](./node/vue/ssr) | [static](./node/vue/static) |
| [qwik](./node/qwik) | [ssr](./node/qwik/ssr) | [static](./node/qwik/static) |
| [react](./node/react) | - | [static](./node/react) |
| [vite](./node/vite) | - | [static](./node/vite) |
| [eleventy](./node/eleventy) | - | [static](./node/eleventy) |
| [gatsby](./node/gatsby) | - | [static](./node/gatsby) |
| [docusaurus](./node/docusaurus) | - | [static](./node/docusaurus) |

## SSR vs Static

- **SSR (Server-Side Rendering)**: Pages rendered on each request. Requires a running server.
- **Static**: Pages pre-rendered at build time. Output is plain HTML/CSS/JS files served via a static file server.

## Getting Started

Each example includes a README with instructions. Generally:

```bash
cd <example-directory>
npm install
npm run dev     # development
npm run build   # production build
npm start       # production server
```
