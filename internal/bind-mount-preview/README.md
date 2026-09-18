# Docker Compose Bind Mount Preview Test

Test case for [coolify#7802](https://github.com/coollabsio/coolify/issues/7802) — volume mappings from repo content in Preview Deployments.

## Setup

1. Add this repo as a Docker Compose resource in Coolify
2. Set the base directory to `/docker-compose-bind-mount-preview`
3. Deploy — should succeed (db_bootstrap runs the script from `./scripts`)
4. Enable **Preview Deployments**
5. Open a PR and deploy the preview

## Expected

The preview deployment should work the same as the main deployment — the `./scripts` bind mount should resolve to the repo's `scripts/` directory.

## Actual (bug)

The preview deployment fails because Coolify appends `-pr-N` to the bind mount path, looking for `scripts-pr-1` which doesn't exist.
