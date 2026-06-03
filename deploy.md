export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use v20.20.2
npm run build
npx gh-pages -d dist -b gh-pages --repo https://github.com/neuroinformatics-unit/osss-python-prep

The Vite base path is `/` because the site is served from the custom domain root:
https://python.neuroinformatics.dev/
