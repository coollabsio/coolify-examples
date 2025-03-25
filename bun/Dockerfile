FROM oven/bun:1.1.45-alpine AS base
RUN apk add --no-cache git wget

WORKDIR /app

COPY package.json bun.lockb ./
# Make sure these files are present before installing
RUN bun install --frozen-lockfile

# Now copy the rest of your source code
COPY . .

FROM base AS build

# Declare the build argument
ARG SOURCE_COMMIT
# Set the environment variable using the build argument
ENV SOURCE_COMMIT=${SOURCE_COMMIT}

ENV NODE_ENV=production

# Run build script
# RUN bun run build

FROM build AS release
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
