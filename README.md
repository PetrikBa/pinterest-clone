# Pinterest Clone

Full-stack Pinterest clone built with React (Vite) frontend and Node.js/Express backend.

## Tech Stack

- React
- Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT (cookie auth)
- Axios
- TanStack Query
- ImageKit

## Project Structure

- `client/` - React app
- `backend/` - REST API
- `.env.example` - central env template for both apps

## Environment Variables

Use the root `.env.example` as source of truth.

1. Copy backend section to `backend/.env`
2. Copy client section to `client/.env`

Required variables:

- Backend: `PORT`, `MONGO_URL`, `CLIENT_URL`
- Client: `VITE_API_ENDPOINT`, `VITE_URL_IK_ENDPOINT`

## Local Development

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

If there is no `dev` script in `backend/package.json`, run:

```bash
npm start
```

### 2. Start Client

```bash
cd client
npm install
npm run dev
```

## GitHub Pages Deployment

Client is deployed automatically from `main` via GitHub Actions workflow:

- `.github/workflows/deploy-pages.yml`

### One-time setup in GitHub

1. Go to `Settings -> Pages`
2. Set `Source` to `GitHub Actions`

### Deploy flow

1. Push changes to `main`
2. Open `Actions` tab in GitHub repository
3. Wait for `Deploy Client to GitHub Pages` workflow to finish

Live URL:
- https://petrikba.github.io/pinterest-clone/
