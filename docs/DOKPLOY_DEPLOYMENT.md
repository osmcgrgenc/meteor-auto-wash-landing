# Dokploy Deployment Guide

## Overview

This document describes how to deploy the Meteor Auto Wash Landing application on Dokploy using Railpack.

## Architecture

- **Framework:** TanStack Start (SSR + Server Functions)
- **Package Manager:** Bun
- **Runtime:** Node.js 22+
- **Server:** srvx for production SSR

## Dokploy Configuration

### Source Settings

```
Source Type: GitHub
Repository: https://github.com/osmcgrgenc/meteor-auto-wash-landing
Branch: main
```

### Build Settings

```
Build Type: Railpack
Install Command: bun install --frozen-lockfile
Build Command: bun run build
Start Command: bun run start
Publish Directory: (empty)
Container Port: 3000
```

### Domain Settings

```
Host: [your-production-domain.com]
Path: /
Container Port: 3000
HTTPS: Enabled
Certificate: Let's Encrypt (automatic)
```

### Health Check

```
Endpoint: /health
Method: GET
Expected Status: 200
Response: {"status":"ok"}
```

## Environment Variables

| Variable               | Build/Runtime | Secret | Required | Description                                                  |
| ---------------------- | ------------- | ------ | -------- | ------------------------------------------------------------ |
| `NODE_ENV`             | Runtime       | No     | Yes      | Must be `production`                                         |
| `HOST`                 | Runtime       | No     | Yes      | Must be `0.0.0.0`                                            |
| `PORT`                 | Runtime       | No     | Yes      | Must be `3000`                                               |
| `PUBLIC_SITE_URL`      | Build/Runtime | No     | Yes      | Your production domain (e.g., `https://meteor-autowash.com`) |
| `VITE_APPOINTMENT_URL` | Runtime       | No     | No       | Optional appointment system URL                              |

### Example Environment Variables on Dokploy

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
PUBLIC_SITE_URL=https://meteor-autowash.com
```

## Build Output

After successful build:

- **Client assets:** `dist/client/` - Static assets (JS, CSS, images)
- **Server:** `dist/server/server.js` - SSR handler
- **Public:** `dist/client/` - Served as static files

## Routes

| Route                  | Type            | Description           |
| ---------------------- | --------------- | --------------------- |
| `/`                    | SSR             | Landing page          |
| `/kvkk`                | SSR             | KVKK page             |
| `/gizlilik-politikasi` | SSR             | Privacy policy        |
| `/cerez-politikasi`    | SSR             | Cookie policy         |
| `/sitemap.xml`         | Server Function | Dynamic sitemap       |
| `/health`              | Server Function | Health check endpoint |

## Important Notes

1. **PUBLIC_SITE_URL** must be set to your production domain for SEO meta tags and sitemap to work correctly.

2. **Health endpoint** returns `{"status":"ok"}` with HTTP 200 status.

3. **Client-side routing** is handled by TanStack Router - no additional SPA fallback configuration needed.

4. **Static assets** are served from `dist/client/` - this is automatically configured by srvx.

## Troubleshooting

### Asset 404 Errors

If assets return 404, verify:

- `dist/client/` exists and contains `assets/` folder
- Start command is: `srvx --prod -s dist/client dist/server/server.js`
- PORT is set to `3000`

### Build Fails

- Ensure Node.js 22+ is selected in Dokploy
- Use `bun install --frozen-lockfile` (not `npm install`)
- Check that `PUBLIC_SITE_URL` is set

### SSR Not Working

- Verify `dist/server/server.js` exists after build
- Check that `srvx` is running with correct paths

## Local Development

```bash
# Install dependencies
bun install

# Start development
bun run dev

# Production build test
rm -rf dist && bun run build && bun run start
```

## Verification Commands

After deployment, verify:

```bash
# Root endpoint
curl -I https://your-domain.com/

# Health check
curl https://your-domain.com/health

# Sitemap
curl https://your-domain.com/sitemap.xml

# Static asset
curl -I https://your-domain.com/assets/index-[hash].js
```
