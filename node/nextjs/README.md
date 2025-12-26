# Next.js

Next.js examples with SSR and static export.

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
npm run build   # build to 'out' directory
npm start       # serve static files
```

Static export is configured with `output: 'export'` in `next.config.ts`.
