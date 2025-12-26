# SvelteKit

SvelteKit examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm start       # production server
```

Uses `@sveltejs/adapter-node`.

### Static Export

```bash
cd static
npm install
npm run dev     # development
npm run build   # build to 'build' directory
npm start       # serve static files
```

Uses `@sveltejs/adapter-static` with `prerender = true` in layout.
