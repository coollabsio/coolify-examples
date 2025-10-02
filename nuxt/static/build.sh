#!/bin/bash
set -e

# Validate SSH private key
if [ -n "$KEY" ]; then
  echo "Validating SSH private key..."

  # Create .ssh directory if it doesn't exist
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh

  # Write key to file
  echo "$KEY" > ~/.ssh/id_rsa
  chmod 600 ~/.ssh/id_rsa
  cat ~/.ssh/id_rsa

  # Validate the key
  ssh-keygen -y -f ~/.ssh/id_rsa
  if [ $? -eq 0 ]; then
    echo "✓ SSH private key is valid"
  else
    echo "✗ SSH private key is invalid"
    rm -f ~/.ssh/id_rsa
    exit 1
  fi
else
  echo "⚠ KEY environment variable not set, skipping validation"
fi

# Continue with build
nuxt build
