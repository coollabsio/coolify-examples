#!/bin/bash
set -e

# Validate SSH key
if [ -n "$KEY" ]; then
  echo "Validating SSH key..."
  echo "$KEY" | ssh-keygen -l -f - > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ SSH key is valid"
  else
    echo "✗ SSH key is invalid"
    exit 1
  fi
else
  echo "⚠ KEY environment variable not set, skipping validation"
fi

# Continue with build
nuxt build
