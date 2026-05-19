# Local Deployment

Use these commands to run the site on your machine.

## Start The Development Server

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use v20.20.2
npm install
npm run dev
```

Open the local URL shown in the terminal. Vite usually uses:

```text
http://localhost:5173/python-course/
```

## Preview A Production Build Locally

Use this when you want to test the built version before deploying.

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && nvm use v20.20.2
npm install
npm run build
npm run preview
```

Open the preview URL shown in the terminal. Vite usually uses:

```text
http://localhost:4173/python-course/
```

## Notes

- Use `npm run dev` while editing.
- Use `npm run preview` after `npm run build` to check the deploy-style build locally.
- Keep the `/python-course/` path in the URL because the Vite base path is configured for GitHub Pages.
