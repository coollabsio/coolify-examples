# React

A simple React example with Vite and React Router.

## Getting Started

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
VITE_BUILD_PUBLIC_VAR=your-value npm run build

# Start production server
npm run start
```

## Environment Variables

This is a static site (SPA), so only build-time environment variables are supported:

- `VITE_BUILD_PUBLIC_VAR` - Set during build, baked into the bundle
