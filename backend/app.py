import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from recommender import search_songs, autocomplete, recommend, trending_songs, new_releases, get_song_by_id
from spotify_client import SpotifyClient
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend Running"
base_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(base_dir, ".env"))

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

spotify = SpotifyClient()


def serialize_song(song):
    preview_url = song.get("preview_url") or (spotify.get_track_preview(song.get("spotify_id")) if song.get("spotify_id") else None)
    return {
        "id": song["id"],
        "name": song["name"],
        "artists": [{"name": artist} for artist in song["artists"]],
        "album": {
            "name": song["album_name"],
            "images": [{"url": song["album_cover"], "height": 640, "width": 640}],
            "release_date": song["release_date"],
        },
        "duration_ms": song["duration_ms"],
        "preview_url": preview_url,
        "external_urls": {"spotify": song["spotify_url"]},
        "youtube_url": song["youtube_url"],
        "popularity": song["popularity"],
        "genre": song["genre"],
        "mood": song["mood"],
        "language": song["language"],
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/search")
def api_search():
    query = request.args.get("q", "").strip()
    limit = min(int(request.args.get("limit", 20)), 50)
    if not query:
        return jsonify({"tracks": [], "error": "Query is required."}), 400

    results = [serialize_song(track) for track in search_songs(query, limit)]
    return jsonify({"tracks": results})


@app.route("/api/autocomplete")
def api_autocomplete():
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify({"suggestions": []})

    limit = min(int(request.args.get("limit", 8)), 12)
    suggestions = [
        {"id": song["id"], "label": song["name"], "artists": song["artists"]}
        for song in autocomplete(query, limit)
    ]
    return jsonify({"suggestions": suggestions})


@app.route("/api/recommendations")
def api_recommendations():
    track_ids = [track_id for track_id in request.args.get("tracks", "").split(",") if track_id]
    limit = min(int(request.args.get("limit", 15)), 20)
    if not track_ids:
        return jsonify({"tracks": [], "error": "At least one seed track is required."}), 400

    tracks = [serialize_song(track) for track in recommend(track_ids, limit)]
    return jsonify({"tracks": tracks})


@app.route("/api/trending")
def api_trending():
    lookup_type = request.args.get("type", "trending")
    limit = min(int(request.args.get("limit", 20)), 50)
    language = request.args.get("language")

    if lookup_type == "new":
        tracks = new_releases(limit)
    else:
        tracks = trending_songs(limit)

    if language:
        tracks = [track for track in tracks if track.get("language") == language]

    tracks = [serialize_song(track) for track in tracks]
    return jsonify({"tracks": tracks})


@app.route("/api/song/<song_id>")
def api_song(song_id):
    song = get_song_by_id(song_id)
    if not song:
        return jsonify({"error": "Song not found."}), 404
    return jsonify({"track": serialize_song(song)})


if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_PORT", 5000))
    app.run(host=host, port=port, debug=os.getenv("FLASK_ENV") == "development")
