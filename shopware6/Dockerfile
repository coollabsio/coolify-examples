#syntax=docker/dockerfile:1.4

ARG BASE_IMAGE=shopware/docker-base:8.3

# pin versions
FROM ghcr.io/shopware/docker-base:8.3 as base-image
FROM ghcr.io/shopware/shopware-cli:latest-php-8.3 AS shopware-cli

# build

FROM shopware-cli as build

ARG SHOPWARE_PACKAGES_TOKEN

ADD . /src
WORKDIR /src

RUN --mount=type=secret,id=composer_auth,dst=/src/auth.json \
    --mount=type=cache,target=/root/.composer \
    --mount=type=cache,target=/root/.npm \
    /usr/local/bin/entrypoint.sh shopware-cli project ci /src

FROM base-image

COPY --from=build --chown=82 --link /src /var/www/html

EXPOSE 8000