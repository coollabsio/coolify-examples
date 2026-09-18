# Docker Compose - Environment Variable Fallback Volume

Reproduces [issue #8854](https://github.com/coollabsio/coolify/issues/8854): the "Convert to file" button in Persistent Storage UI fails for volume paths using variables with fallback values (`${VAR:-./path}`).

## How to reproduce

1. Deploy this as a **Docker Compose** application from this Git repository.
2. Go to the **Persistent Storage** tab.
3. The `${CONFIG_FILE:-./default-config.yaml}` mount is listed as a directory.
4. Click **"Convert to file"** on that mount.
5. Expected: converts to file. Actual: throws `Invalid storage path: contains forbidden character '${' (variable substitution with potential command injection)`.
