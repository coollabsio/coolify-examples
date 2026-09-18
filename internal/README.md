# Internal test fixtures

These folders are **not** deployment examples. They are Docker Compose test
fixtures and issue reproducers used to test and debug the Coolify compose
parser. Do not use them as templates for your own deployments.

| Folder | Purpose |
| --- | --- |
| `compose` | Bun app with assorted compose parser test files |
| `compose-parser-tests` | Collection of compose files that exercise the parser (cifs, volumes, raw, weird, ...) |
| `bind-mount-preview` | Reproducer for bind mount behaviour in preview deployments |
| `caddy` | Compose + Caddy reverse proxy sample |
| `double-mount` | Reproducer for the same volume mounted twice |
| `env-var-fallback-volume` | Reproducer for issue #8854 (env var fallback in volume paths) |
| `preserve-repo-env` | Reproducer for issue #8953 (.env not found with preserve repository) |
