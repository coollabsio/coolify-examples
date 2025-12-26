# Claude Guidelines for Coolify Examples

## Project Structure

```
coolify-examples/
├── node/                    # Node.js runtime examples
│   ├── <backend-framework>/ # Backend frameworks (single directory)
│   └── <frontend-framework>/
│       ├── ssr/            # Server-side rendering variant
│       └── static/         # Static export variant
└── bun/                    # (future) Bun runtime examples
```

## Framework Classification

### Backend Frameworks
- Single directory, no ssr/static variants
- Examples: expressjs, fastify, nestjs, adonisjs, simple-webserver

### Frontend Frameworks with SSR + Static
- Create `ssr/` and `static/` subdirectories
- Examples: nextjs, nuxtjs, remix, astro, sveltekit, tanstack-start

### Static-Only Frameworks
- Single directory (no `/static` subdirectory needed)
- Examples: react, vite, eleventy, gatsby

## Determining SSR vs Static Support

When adding a new framework, check:

1. **SSR support**: Does it have a Node.js adapter/server mode?
2. **Static support**: Can it pre-render/export to static HTML files?

| Framework | SSR | Static | Notes |
|-----------|-----|--------|-------|
| Next.js | Yes | Yes | `output: 'export'` for static |
| Nuxt.js | Yes | Yes | `ssr: false` + `nuxt generate` for static |
| Remix/React Router | Yes | Yes | `ssr: false` for SPA mode |
| Astro | Yes | Yes | Needs `@astrojs/node` adapter for SSR |
| SvelteKit | Yes | Yes | `adapter-node` for SSR, `adapter-static` for static |
| TanStack Start | Yes | Yes | `server.preset: 'static'` for static |
| React | No | Yes | Library only, use with Vite |
| Vite | No | Yes | Build tool only, no built-in SSR |
| Eleventy | No | Yes | Static site generator only |
| Gatsby | No | Yes | Static site generator only |
| NestJS | N/A | N/A | Backend only, no rendering |
| Express | N/A | N/A | Backend only, no rendering |
| Fastify | N/A | N/A | Backend only, no rendering |
| AdonisJS | N/A | N/A | Backend only, no rendering |

## Standard Package.json Scripts

### Backend frameworks
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

### SSR variants
```json
{
  "scripts": {
    "dev": "<framework-dev-cmd>",
    "build": "<framework-build-cmd>",
    "start": "<framework-start-cmd>"
  }
}
```

### Static variants
```json
{
  "scripts": {
    "dev": "<framework-dev-cmd>",
    "build": "<framework-build-cmd>",
    "start": "npx serve@latest <output-dir>"
  }
}
```

## Standard Endpoints for Backend Examples

All backend examples should have:
- `GET /` - Returns `{"message": "Hello from <Framework>!"}`
- `GET /health` - Returns `{"status": "ok"}`

## README Template

Each framework should have a README.md with:
1. Framework name as title
2. Brief description
3. Getting started commands
4. Note about SSR/static if applicable

## Environment Variable Testing

Each framework example should include environment variables to verify integration works correctly.

### Environment Variable Types

| Type | Base Name | When Set | Where Accessible |
|------|-----------|----------|------------------|
| Build-time Public | `<PREFIX>_BUILD_PUBLIC_VAR` | During `npm run build` | Client + Server |
| Runtime Private | `RUNTIME_PRIVATE_VAR` | At server startup | Server only |
| Runtime Public | `RUNTIME_PUBLIC_VAR` | At server startup | Client + Server |

**Build-time** = baked into bundle, cannot change without rebuild
**Runtime** = read when server starts, can change by restarting

Note: Build-time private vars are omitted because secrets should use runtime vars (to avoid rebuilding per environment).

### SSR Frameworks (3 env var types)

SSR frameworks implement all 3 env var types. Runtime vars are served via an `/api/env` endpoint that the client fetches.

| Framework | Build Public Var | Runtime Private | Runtime Public | Access Pattern |
|-----------|------------------|-----------------|----------------|----------------|
| Next.js | `NEXT_PUBLIC_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |
| Nuxt.js | `NUXT_PUBLIC_BUILD_PUBLIC_VAR` | `NUXT_RUNTIME_PRIVATE_VAR` | `NUXT_PUBLIC_RUNTIME_PUBLIC_VAR` | `runtimeConfig` |
| Remix | `VITE_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |
| Astro | `PUBLIC_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `process.env` in frontmatter |
| SvelteKit | `PUBLIC_BUILD_VAR` | `RUNTIME_PRIVATE_VAR` | `PUBLIC_RUNTIME_PUBLIC_VAR` | `$env/dynamic/*` |
| TanStack Start | `VITE_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |
| Angular | `NG_APP_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |
| Solid-Start | `VITE_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |
| Vue | `VITE_BUILD_PUBLIC_VAR` | `RUNTIME_PRIVATE_VAR` | `RUNTIME_PUBLIC_VAR` | `/api/env` route |

### Static Frameworks (build-time only)

Static frameworks only support build-time env vars since there's no server at runtime:

| Framework | Build Public Var | Access Pattern |
|-----------|------------------|----------------|
| Next.js | `NEXT_PUBLIC_BUILD_PUBLIC_VAR` | `process.env.NEXT_PUBLIC_*` |
| Remix | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |
| Astro | `PUBLIC_BUILD_PUBLIC_VAR` | `import.meta.env.PUBLIC_*` |
| SvelteKit | `PUBLIC_BUILD_PUBLIC_VAR` | `$env/static/public` |
| TanStack Start | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |
| React | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |
| Vite | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |
| Eleventy | `BUILD_PUBLIC_VAR` | Via `addGlobalData()` in config |
| Gatsby | `GATSBY_BUILD_PUBLIC_VAR` | `process.env.GATSBY_*` |
| Angular | `NG_APP_BUILD_PUBLIC_VAR` | `process.env['NG_APP_*']` |
| Solid-Start | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |
| Vue | `VITE_BUILD_PUBLIC_VAR` | `import.meta.env.VITE_*` |

### Backend Frameworks (runtime only)

Backend frameworks use runtime env vars (read at startup). No build-time vars needed.

```javascript
// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value';
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value';

console.log('=== Runtime Variables ===');
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR);
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR);

// In route handler:
return {
  message: 'Hello from <Framework>!',
  runtimePrivateVar: RUNTIME_PRIVATE_VAR,
  runtimePublicVar: RUNTIME_PUBLIC_VAR,
};
```

### API Endpoint for SSR Runtime Vars

SSR frameworks need an API endpoint to serve runtime vars to the client:

```javascript
// /api/env endpoint
app.get('/api/env', (req, res) => {
  res.json({
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  });
});
```

### UI Display Pattern

Show env vars in a styled box on the home page:

**For SSR frameworks:**
```html
<div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
  <h2>Environment Variable Test</h2>

  <h3>Build-time (baked into bundle)</h3>
  <p><strong><PREFIX>_BUILD_PUBLIC_VAR:</strong> {value}</p>

  <h3>Runtime (read at server startup)</h3>
  <p><strong>RUNTIME_PRIVATE_VAR:</strong> {value}</p>
  <p><strong>RUNTIME_PUBLIC_VAR:</strong> {value}</p>
</div>
```

**For static frameworks:**
```html
<div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
  <h2>Environment Variable Test</h2>

  <h3>Build-time (baked into bundle)</h3>
  <p><strong><PREFIX>_BUILD_PUBLIC_VAR:</strong> {value}</p>

  <p style="color: #666; font-size: 14px;">
    Note: Static sites only support build-time env vars (no server at runtime)
  </p>
</div>
```

### Testing Commands

```bash
# SSR: Build with build-time vars
NEXT_PUBLIC_BUILD_PUBLIC_VAR=build-value npm run build

# SSR: Start with runtime vars
RUNTIME_PRIVATE_VAR=secret RUNTIME_PUBLIC_VAR=public npm run start

# Static: Build with build-time vars only
VITE_BUILD_PUBLIC_VAR=build-value npm run build
```

## Adding a New Framework

1. Ask/determine if it supports SSR, static, or both
2. Create appropriate directory structure
3. Initialize project (CLI or manual)
4. Configure for SSR or static as needed
5. Add standard scripts to package.json
6. Add environment variable test (see above)
7. Add .gitignore
8. Add README.md
9. Update parent README.md tables
