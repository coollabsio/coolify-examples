FROM node:22-alpine AS base

# ========================================
# Dependencies Stage
# ========================================
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ git
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 600000 || \
  (yarn cache clean && yarn install --frozen-lockfile --network-timeout 600000)

# ========================================
# Builder Stage
# ========================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG COOLIFY_URL
ENV NEXT_PUBLIC_BASE_URL=${COOLIFY_URL}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN yarn build

# ========================================
# Runner Stage
# ========================================
FROM base AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat curl

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
