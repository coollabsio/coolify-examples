#!/bin/bash
set -e

# Validate SSH private key
if [ -n "$KEY" ]; then
  echo "Validating SSH private key..."
  echo "$KEY" | ssh-keygen -y -f -
  if [ $? -eq 0 ]; then
    echo "✓ SSH private key is valid"
  else
    echo "✗ SSH private key is invalid"
    exit 1
  fi
else
  echo "⚠ KEY environment variable not set, skipping validation"
fi

# Continue with build
nuxt build
