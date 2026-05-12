# v0-ai-music-recommender

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_Z6BLFn76WvleWMbmBMIvrjTKV4xd)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Flask Recommendation Backend

A new Python + Flask backend has been added in `backend/` to power AI music search and recommendations. It uses Scikit-learn for content-based filtering and can optionally enrich tracks with Spotify preview metadata when `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are configured.

To run the backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# fill in Spotify credentials if available
python app.py
```

Then visit [http://localhost:5000](http://localhost:5000) to open the Flask recommendation UI.

If you want the Next.js frontend to proxy searches and recommendations through the Flask backend, set:

```bash
set FLASK_API_URL=http://localhost:5000
npm run dev
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/AnishArak/v0-ai-music-recommender" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
