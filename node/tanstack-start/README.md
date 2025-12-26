# TanStack Start

TanStack Start examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm start       # production server
```

### Static Export

```bash
cd static
npm install
npm run dev     # development
npm run build   # build static files
npm start       # serve static files
```

Static export is configured with `server.preset: 'static'` in `app.config.ts`.
