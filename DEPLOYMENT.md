# Deployment preparation

The repository contains three separate applications. Deploy the backend as a Node service and deploy `frontend` and `dashboard` as separate static React apps. Configure each static host to serve `index.html` for client-side routes.

## Backend service

- Build/install command: `npm ci` (working directory: `backend`)
- Start command: `npm start`
- Health check path: `/health`
- Environment variables:
  - `MONGO_URL`: production MongoDB connection string
  - `AUTH_SECRET`: random secret of at least 32 characters
  - `NODE_ENV`: `production`
  - `CLIENT_ORIGINS`: comma-separated deployed origins for the marketing site and dashboard, such as `https://example.com,https://dashboard.example.com`

Keep the MongoDB user limited to the application database. Do not commit `.env` files or put backend secrets in frontend build variables.

## Dashboard static app

- Build/install command: `npm ci && npm run build` (working directory: `dashboard`)
- Publish directory: `dashboard/build`
- Build environment variable: `REACT_APP_API_URL`, set to the backend origin with no trailing slash, for example `https://api.example.com`
- Build environment variable: `REACT_APP_MARKETING_URL`, set to the deployed marketing site origin (for example `https://tradesmart.example.com`)
- Configure the host's SPA rewrite so paths such as `/holdings` serve `/index.html`.

The API URL is embedded during the React build, so rebuild the dashboard after changing it.

## Marketing static app

- Build/install command: `npm ci && npm run build` (working directory: `frontend`)
- Publish directory: `frontend/build`
- Build environment variable: `REACT_APP_DASHBOARD_URL`, set to the deployed dashboard origin (for example `https://app.example.com`)
- Configure the host's SPA rewrite so client-side routes such as `/about` serve `/index.html`.

For local development, run the marketing app on port `3000` and the dashboard on port `3001`. The marketing site's sign-in and account buttons open the dashboard; account buttons open its registration form. The dashboard links back to the marketing site. Override the local origins with the environment variables above when deploying.

## Before launch

1. Set `CLIENT_ORIGINS` to the exact HTTPS origins used by both static apps.
2. Confirm the backend health check returns `{"status":"ok"}`.
3. Open the dashboard, create an account, sign in, and confirm an authenticated API request succeeds.
4. Keep the Atlas connection string, database password, and `AUTH_SECRET` in the hosting provider's secret environment settings.
