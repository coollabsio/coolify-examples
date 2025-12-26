# Vue SSR with Vue Router

A Vue 3 server-side rendered application with Vue Router, using Vite and Express.

## Getting Started

```bash
npm install
npm run build
npm run start
```

## Development

```bash
npm run dev
```

## Environment Variables

### Build-time (baked into bundle)

```bash
VITE_BUILD_PUBLIC_VAR=my-value npm run build
```

### Runtime (read at server startup)

```bash
RUNTIME_PRIVATE_VAR=secret RUNTIME_PUBLIC_VAR=public npm run start
```
