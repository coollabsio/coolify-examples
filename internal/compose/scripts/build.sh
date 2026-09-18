#!/bin/bash
echo "✔️ directory structure created, starting the build..."

docker compose -f ./docker-compose/docker-compose-test.yaml build
