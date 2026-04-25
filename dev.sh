#!/bin/bash

# Load nvm and use Node 20
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Switch to Node 20
nvm use 20

# Verify Node version
echo "Using Node version: $(node -v)"
if [[ "$(node -v)" != v20* ]]; then
  echo "❌ Error: Node 20 is required but $(node -v) is active"
  exit 1
fi

# Clean .next cache
echo "Cleaning .next cache..."
rm -rf .next

# Run dev server
echo "Starting development server..."
npm run dev
