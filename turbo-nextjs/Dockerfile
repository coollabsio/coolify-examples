# Base image with common Node.js and pnpm setup
FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.5.2

# Dependencies installation stage
FROM base AS deps
WORKDIR /app

# Copy package.json and pnpm-lock.yaml before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json ./
RUN echo "node-linker=hoisted" >> .npmrc

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store npm install

# Build the Next.js app
FROM base AS builder
ENV NODE_ENV production

RUN apk --no-cache upgrade && apk add --no-cache chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy all files
COPY . .

# Copy the previously installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Log environment variables for debugging
RUN echo "Node version: $(node -v)"
RUN echo "PNPM version: $(pnpm -v)"

# Build the Next.js app
RUN pnpm turbo build

# Only copy over the Next.js pieces we need
FROM base AS runner

# Install curl
RUN apk add curl

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public/ ./public/

# Expose the listening port
EXPOSE 3000
ENV PORT 3000

# Run node to launch the app
CMD ["node", "server.js"]
