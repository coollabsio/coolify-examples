FROM node:16-slim
RUN apt-get update && apt-get install curl git -y
# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN npm install -g pnpm

WORKDIR /app

# pnpm fetch does require only lockfile
# https://pnpm.io/cli/fetch
# COPY pnpm-lock.yaml ./

# RUN pnpm fetch --prod
# RUN SKIP_GENERATE=1 pnpm fetch

# Copy whole monorepo
COPY ./package.json ./package.json

COPY . .
RUN SKIP_GENERATE=1 pnpm install
#--frozen-lockfile

# Deploy migrations
# Note: You can mount multiple secrets

# RUN pnpm install -r --offline --prod
RUN apt-get install libssl-dev curl libc6 -y
# RUN SKIP_GENERATE=1 pnpm build:sun

# install node-prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN rm -rf mobile && rm -rf app && rm -rf native

# Fix bug with uwebsockets
# Ref: https://github.com/mhart/alpine-node/pull/141/files
# RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

ENV PORT=8080
CMD [ "node", "--enable-source-maps", "index.js" ]