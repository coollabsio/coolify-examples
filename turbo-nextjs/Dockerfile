# Base image with common Node.js and pnpm setup
FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.5.2

# Build the Next.js app
FROM base AS builder
ENV NODE_ENV production

RUN apk --no-cache upgrade && apk add --no-cache chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /app

# Copy all files (includes pnpm-workspace.yaml and all package.json files)
COPY . .

# Log environment variables for debugging
RUN echo "Node version: $(node -v)"
RUN echo "PNPM version: $(pnpm -v)"

# Install dependencies with proper workspace context
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the Next.js app
RUN pnpm turbo build

# Only copy over the Next.js pieces we need
FROM base AS runner

# Install curl
RUN apk add curl

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public/ ./apps/web/public/

# Expose the listening port
EXPOSE 3000
ENV PORT 3000

# Run node to launch the app
CMD ["node", "apps/web/server.js"]

