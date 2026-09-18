# GitHub Actions + Coolify

This example builds a Docker image with GitHub Actions, pushes it to the GitHub
Container Registry (ghcr.io), and then tells Coolify to deploy the new image.

It builds a small static site served by Nginx, but the same workflow works for
any application that has a `Dockerfile`.

## Files

| File | Purpose |
| --- | --- |
| `.github/workflows/build.yaml` | The GitHub Actions workflow |
| `Dockerfile` | Builds an Nginx image from the `static/` folder |
| `static/index.html` | The page that Nginx serves |

## How it works

On every push to the `main` branch (or a manual run), the workflow runs two jobs:

**`build-push`** — a matrix that builds one image for each architecture on a
native runner, so there is no slow emulation:

1. Checks out the repository.
2. Logs in to `ghcr.io` with the built-in `GITHUB_TOKEN`.
3. Builds the image and pushes it with an arch tag (`latest-amd64` on
   `ubuntu-24.04`, `latest-aarch64` on `ubuntu-24.04-arm`).

**`merge-manifest`** — runs after both builds finish:

1. Joins the two arch images into one multi-arch `latest` tag with
   `docker buildx imagetools create`.
2. Sends a `POST` request to the Coolify deploy webhook to start the deployment.

## Setup

### 1. Copy the files to your repository

Copy the contents of this folder to the root of your own repository. The
workflow must live at `.github/workflows/build.yaml`.

### 2. Configure Coolify

1. Create a new resource in Coolify with the type **Docker Image**.
2. Set the image to `ghcr.io/<owner>/<repo>:latest`.
3. Open the resource **Webhooks** tab and copy the **Deploy Webhook** URL.
4. Create an **API token** with the **Deploy** permission
   (Keys & Tokens → API tokens).

### 3. Add the secrets to GitHub

In your repository, open **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
| --- | --- |
| `COOLIFY_DEPLOY_WEBHOOK` | The deploy webhook URL from Coolify |
| `COOLIFY_API_TOKEN` | The Coolify API token with deploy permission |

You do **not** need to add a token for ghcr.io. The workflow uses the built-in
`GITHUB_TOKEN`, which has `packages: write` permission in this workflow.

### 4. Push to `main`

Push a commit to the `main` branch. GitHub Actions builds and pushes the image,
and then Coolify pulls the new image and deploys it.

## Notes

- The image name comes from `${{ github.repository }}`. The "Lowercase the image
  name" step makes it lowercase, because ghcr.io does not allow uppercase
  letters in image names.
- The workflow builds `linux/amd64` and `linux/arm64` and joins them into one
  multi-arch `latest` tag. To build a single architecture, remove the other
  entry from the `matrix` and adjust the `imagetools create` command.
- Each architecture builds on its own native runner, so the ARM build does not
  use emulation. GitHub Actions cache (`type=gha`) speeds up repeat builds.
