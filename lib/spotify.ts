const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getSpotifyToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await response.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.token;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    release_date: string;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  popularity: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  genres: string[];
  popularity: number;
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  images: { url: string; height: number; width: number }[];
  release_date: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

export async function searchTracks(
  query: string,
  limit: number = 20
): Promise<SpotifyTrack[]> {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search tracks");
  }

  const data = await response.json();
  return data.tracks.items;
}

export async function searchArtists(
  query: string,
  limit: number = 10
): Promise<SpotifyArtist[]> {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=artist&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search artists");
  }

  const data = await response.json();
  return data.artists.items;
}

export async function getTrack(trackId: string): Promise<SpotifyTrack> {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get track");
  }

  return response.json();
}

export async function getRecommendations(
  seedTracks: string[],
  seedArtists: string[] = [],
  seedGenres: string[] = [],
  limit: number = 20,
  options: {
    target_energy?: number;
    target_valence?: number;
    target_danceability?: number;
    target_tempo?: number;
  } = {}
): Promise<SpotifyTrack[]> {
  const token = await getSpotifyToken();
  
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  if (seedTracks.length > 0) {
    params.set("seed_tracks", seedTracks.slice(0, 5).join(","));
  }
  if (seedArtists.length > 0) {
    params.set("seed_artists", seedArtists.slice(0, 5).join(","));
  }
  if (seedGenres.length > 0) {
    params.set("seed_genres", seedGenres.slice(0, 5).join(","));
  }

  if (options.target_energy !== undefined) {
    params.set("target_energy", options.target_energy.toString());
  }
  if (options.target_valence !== undefined) {
    params.set("target_valence", options.target_valence.toString());
  }
  if (options.target_danceability !== undefined) {
    params.set("target_danceability", options.target_danceability.toString());
  }
  if (options.target_tempo !== undefined) {
    params.set("target_tempo", options.target_tempo.toString());
  }

  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get recommendations");
  }

  const data = await response.json();
  return data.tracks;
}

export async function getNewReleases(
  limit: number = 20,
  country: string = "US"
): Promise<SpotifyAlbum[]> {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&country=${country}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get new releases");
  }

  const data = await response.json();
  return data.albums.items;
}

export async function getFeaturedPlaylists(
  limit: number = 10,
  country: string = "US"
): Promise<{ id: string; name: string; description: string; images: { url: string }[] }[]> {
  const token = await getSpotifyToken();
  const response = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}&country=${country}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get featured playlists");
  }

  const data = await response.json();
  return data.playlists.items;
}

export async function getGenreSeeds(): Promise<string[]> {
  const token = await getSpotifyToken();
  const response = await fetch(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get genre seeds");
  }

  const data = await response.json();
  return data.genres;
}

// Mood presets for recommendation tuning
export const moodPresets = {
  happy: {
    target_valence: 0.8,
    target_energy: 0.7,
    target_danceability: 0.7,
    genres: ["pop", "dance", "happy"],
  },
  sad: {
    target_valence: 0.2,
    target_energy: 0.3,
    target_danceability: 0.3,
    genres: ["sad", "acoustic", "piano"],
  },
  energetic: {
    target_valence: 0.7,
    target_energy: 0.9,
    target_danceability: 0.8,
    genres: ["edm", "dance", "electronic"],
  },
  calm: {
    target_valence: 0.5,
    target_energy: 0.2,
    target_danceability: 0.3,
    genres: ["ambient", "chill", "sleep"],
  },
  romantic: {
    target_valence: 0.6,
    target_energy: 0.4,
    target_danceability: 0.4,
    genres: ["romance", "r-n-b", "soul"],
  },
  party: {
    target_valence: 0.8,
    target_energy: 0.9,
    target_danceability: 0.9,
    genres: ["party", "dance", "club"],
  },
  focus: {
    target_valence: 0.4,
    target_energy: 0.4,
    target_danceability: 0.2,
    genres: ["study", "classical", "ambient"],
  },
  workout: {
    target_valence: 0.6,
    target_energy: 0.95,
    target_danceability: 0.7,
    target_tempo: 140,
    genres: ["work-out", "hip-hop", "electronic"],
  },
} as const;

export type MoodType = keyof typeof moodPresets;

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
