# Reproducer for coolify#8953

Minimal Docker Compose app that uses `${WEB_PORT}` variable interpolation to
reproduce the `.env not found` error when **Preserve Repository** is enabled
with a custom start command.

## Steps to reproduce

1. In Coolify, create a **Docker Compose** application pointing to this
   repository subdirectory (`docker-compose-preserve-repo-env`).
2. Add an environment variable: `WEB_PORT=9090`.
3. In **Advanced** settings, enable **Preserve Repository**.
4. Set the custom start command to:
   ```
   docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
   ```
5. Deploy.

### Expected (after fix)

Deployment succeeds. `--project-directory` in the `up -d` command points to
`/data/coolify/applications/{uuid}` (host path where `.env` exists).

### Actual (before fix)

Deployment fails with:

```
env file /artifacts/{deployment_uuid}/.env not found
```

Because `--project-directory` was set to `/artifacts/{deployment_uuid}` (helper
container path), and Docker Compose resolves `env_file` directives relative to
that directory.

## Related

- https://github.com/coollabsio/coolify/issues/8953
