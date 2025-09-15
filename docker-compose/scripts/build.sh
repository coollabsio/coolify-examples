#!/bin/bash
echo "✔️ directory structure created, starting the build..."

docker compose -f ./docker-compose.coolify__generated.yml build
