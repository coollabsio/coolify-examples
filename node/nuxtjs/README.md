# Nuxt.js

Nuxt.js examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm run preview # production server
```

### Static Export

```bash
cd static
npm install
npm run dev     # development
npm run build   # generate static files
npm start       # serve static files
```

Static export is configured with `ssr: false` in `nuxt.config.ts` and uses `nuxt generate`.
