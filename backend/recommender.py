import math
from typing import List, Dict, Any, Optional
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import hstack
import numpy as np
from .data import songs, song_by_id

Song = Dict[str, Any]

# Build a cached similarity matrix using genre, mood, artist, language, energy, and tempo.
Moods = MultiLabelBinarizer(sparse_output=True).fit([song["mood"] for song in songs])
Artists = MultiLabelBinarizer(sparse_output=True).fit([song["artists"] for song in songs])
Genres = OneHotEncoder(sparse_output=True, handle_unknown="ignore").fit([[song["genre"]] for song in songs])
Languages = OneHotEncoder(sparse_output=True, handle_unknown="ignore").fit([[song["language"]] for song in songs])

numeric_features = np.array([[song["energy"], song["tempo"]] for song in songs], dtype=float)
scaler = MinMaxScaler()
numeric_scaled = scaler.fit_transform(numeric_features)

mood_matrix = Moods.transform([song["mood"] for song in songs])
artist_matrix = Artists.transform([song["artists"] for song in songs])
genre_matrix = Genres.transform([[song["genre"]] for song in songs])
language_matrix = Languages.transform([[song["language"]] for song in songs])

feature_matrix = hstack([mood_matrix, artist_matrix, genre_matrix, language_matrix, numeric_scaled])
SIMILARITY_MATRIX = cosine_similarity(feature_matrix, feature_matrix)

SONG_INDEX = {song["id"]: idx for idx, song in enumerate(songs)}


def _normalize_query(text: str) -> str:
    return text.strip().lower()


def search_songs(query: str, limit: int = 20) -> List[Song]:
    normalized = _normalize_query(query)
    results = []

    for song in songs:
        score = 0
        if normalized in song["name"].lower():
            score += 10
        if any(normalized in artist.lower() for artist in song["artists"]):
            score += 8
        if normalized in song["album_name"].lower():
            score += 6
        if normalized in song["genre"].lower():
            score += 4
        if normalized in song["language"].lower():
            score += 2

        if score > 0:
            results.append((score + song["popularity"] / 20.0, song))

    results.sort(key=lambda item: item[0], reverse=True)
    return [item[1] for item in results][:limit]


def autocomplete(query: str, limit: int = 8) -> List[Song]:
    normalized = _normalize_query(query)
    suggestions = [song for song in songs if normalized in song["name"].lower() or any(normalized in artist.lower() for artist in song["artists"])]
    return suggestions[:limit]


def recommend(track_ids: List[str], limit: int = 15) -> List[Song]:
    track_indices = [SONG_INDEX[track_id] for track_id in track_ids if track_id in SONG_INDEX]
    if not track_indices:
        return sorted(songs, key=lambda song: song["popularity"], reverse=True)[:limit]

    similarity_scores = SIMILARITY_MATRIX[track_indices]
    combined = similarity_scores.mean(axis=0)

    ranked_indices = np.argsort(combined)[::-1]
    recommendations = []
    for idx in ranked_indices:
        song = songs[idx]
        if song["id"] in track_ids:
            continue
        if song not in recommendations:
            recommendations.append(song)
        if len(recommendations) >= limit:
            break

    return recommendations


def trending_songs(limit: int = 20) -> List[Song]:
    return sorted(songs, key=lambda song: song["popularity"], reverse=True)[:limit]


def new_releases(limit: int = 20) -> List[Song]:
    return sorted(songs, key=lambda song: song["release_date"], reverse=True)[:limit]


def get_song_by_id(song_id: str) -> Optional[Song]:
    return song_by_id.get(song_id)
