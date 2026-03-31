# Pinterest Clone - MERN

Live URL:
- https://petrikba.github.io/pinterest-clone/
- Please wait for the Render.com services to initialize during the first launch.
- Login: petrik.baca@gmail.com; Pass: test

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
- JSON Web Tokens
- Zustand

## Feature Overview

- User registration with username, display name, email, and password.
- User login and logout with JWT stored in HTTP-only cookies.
- Protected actions for authenticated users (create pin, follow, like/save, comment).
- Create and publish pins with image upload and metadata (title, description, link, tags, board).
- Image processing and upload pipeline using Sharp and ImageKit.
- Edit-friendly pin creation flow with image preview and canvas/text options.
- Infinite scroll feed for browsing pins.
- Search pins by title/tags and filter by board or user.
- View single pin detail page with interactions and comments.
- Add comments to pins (including emoji support in the client UI).
- Like and save interactions with toggle behavior and interaction state checks.
- User profile page with follower/following counts and created/saved tabs.
- Follow/unfollow other users from profile pages.
- Board support for organizing pins and browsing board-specific content.
- Persisted auth state on the client via Zustand.
- Full-stack architecture: React (Vite) frontend + Node.js/Express API + MongoDB.

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
