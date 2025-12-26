# Angular

Angular examples with SSR and static export.

## Variants

### SSR (Server-Side Rendering)

```bash
cd ssr
npm install
npm run dev     # development
npm run build   # build
npm start       # production server
```

Uses `@angular/ssr` for server-side rendering.

### Static Export

```bash
cd static
npm install
npm run dev     # development
npm run build   # build to 'dist/static/browser'
npm start       # serve static files
```

Client-side only build (no SSR).
