import os
import base64
import time
from typing import Optional, Dict, Any, List
import requests

SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE = "https://api.spotify.com/v1"


class SpotifyClient:
    def __init__(self):
        self.client_id = os.getenv("SPOTIFY_CLIENT_ID")
        self.client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.access_token = None
        self.token_expires_at = 0

    def _auth_header(self) -> Dict[str, str]:
        if not self.client_id or not self.client_secret:
            return {}

        if time.time() >= self.token_expires_at:
            self._refresh_token()

        return {"Authorization": f"Bearer {self.access_token}"} if self.access_token else {}

    def _refresh_token(self) -> None:
        if not self.client_id or not self.client_secret:
            self.access_token = None
            return

        auth_value = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()
        headers = {"Authorization": f"Basic {auth_value}"}
        data = {"grant_type": "client_credentials"}
        response = requests.post(SPOTIFY_TOKEN_URL, headers=headers, data=data, timeout=10)
        if response.ok:
            payload = response.json()
            self.access_token = payload.get("access_token")
            self.token_expires_at = time.time() + payload.get("expires_in", 3600) - 60
        else:
            self.access_token = None

    def get_track_preview(self, spotify_id: str) -> Optional[str]:
        headers = self._auth_header()
        if not headers:
            return None

        response = requests.get(f"{SPOTIFY_API_BASE}/tracks/{spotify_id}", headers=headers, timeout=10)
        if response.ok:
            data = response.json()
            return data.get("preview_url")
        return None

    def search_tracks(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        headers = self._auth_header()
        if not headers:
            return []

        params = {"q": query, "type": "track", "limit": limit}
        response = requests.get(f"{SPOTIFY_API_BASE}/search", headers=headers, params=params, timeout=10)
        if response.ok:
            return response.json().get("tracks", {}).get("items", [])
        return []
