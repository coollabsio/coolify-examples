# Astro

Astro examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm start       # production server
```

Uses `@astrojs/node` adapter with `output: 'server'`.

### Static Export

```bash
cd static
npm install
npm run dev     # development
npm run build   # build to 'dist' directory
npm start       # serve static files
```

Static is the default Astro mode.
