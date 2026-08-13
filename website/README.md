# DNetX Showcase Website

The marketing/showcase site for **DNetX [V10]**, built with React, TypeScript,
Vite, and Tailwind CSS.

Live at: https://15arghya2004.github.io/DfNetX-Core-ShowCase-/

## Local development

```bash
cd website
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `website/dist`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-website.yml`, which
builds this app and publishes `website/dist` to GitHub Pages via GitHub
Actions.

One-time repo setup (if not already done): **Settings → Pages → Build and
deployment → Source: GitHub Actions.**
