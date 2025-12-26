# Remix (React Router)

React Router (formerly Remix) examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm start       # production server
```

### Static Export (SPA Mode)

```bash
cd static
npm install
npm run dev     # development
npm run build   # build client files
npm start       # serve static files
```

Static export is configured with `ssr: false` in `react-router.config.ts`.
