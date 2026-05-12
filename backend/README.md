# AI Music Recommender Backend

This folder contains a Flask recommendation engine for the AI music project.

## Features

- Flask API with search, autocomplete, trending, and recommendations
- Content-based filtering using Scikit-learn and cosine similarity
- Cached similarity matrix for fast responses
- Optional Spotify API enrichment for preview URLs
- Letterboxd-inspired static HTML/CSS/JavaScript UI

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Fill in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env` if you want the API to retrieve preview URLs.

## Run

```bash
python app.py
```

Then open [http://localhost:5000](http://localhost:5000) in your browser.

## Optional: Proxy from Next.js frontend

If you want the Next.js frontend to route search requests through this backend, set the environment variable before starting Next:

```bash
set FLASK_API_URL=http://localhost:5000
npm run dev
```
