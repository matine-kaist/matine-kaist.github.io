#!/usr/bin/env bash
set -euo pipefail

BUNDLE=/Users/jwl/.rbenv/versions/3.2.4/bin/bundle
PORT=${PORT:-4000}

# Fall back to whatever bundle is on PATH if the rbenv one is missing
if [ ! -x "$BUNDLE" ]; then
  BUNDLE=$(command -v bundle)
fi

cd "$(dirname "$0")"

# Install gems if vendor/bundle is missing or Gemfile.lock was updated
if [ ! -d vendor/bundle ] || [ Gemfile.lock -nt vendor/bundle ]; then
  echo "Installing gems..."
  "$BUNDLE" install
fi

# Free the port if something is already listening on it
if lsof -ti tcp:"$PORT" &>/dev/null; then
  echo "Port $PORT in use — killing existing process..."
  lsof -ti tcp:"$PORT" | xargs kill -9
  sleep 1
fi

echo "Starting Jekyll at http://localhost:${PORT}/"
exec "$BUNDLE" exec jekyll serve \
  --port "$PORT" \
  --livereload \
  --open-url
