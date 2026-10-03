#!/usr/bin/env bash
# Build and deploy zmaxlab.site to the Contabo VPS (nginx, /var/www/zmaxlab.site).
# Requires the `vps` host in ~/.ssh/config. Set CHROME_PATH if Puppeteer's bundled Chrome is missing.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -z "${CHROME_PATH:-}" && -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
  export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fi
grep -q '^VITE_ANALYTICS_DEBUG=true' .env 2>/dev/null && { echo "Refusing to deploy with VITE_ANALYTICS_DEBUG=true"; exit 1; }

npm run build
rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r --exclude .htaccess dist/ vps:/var/www/zmaxlab.site/
ssh vps 'chown -R deploy:deploy /var/www/zmaxlab.site'
echo "Deployed: https://zmaxlab.site"
