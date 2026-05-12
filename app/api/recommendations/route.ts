import { NextResponse } from "next/server";
import { getRecommendations, getSongsByMood, getTrendingSongs, searchSongs } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedTracks = searchParams.get("tracks")?.split(",").filter(Boolean) || [];
  const query = searchParams.get("q")?.trim();
  const mood = searchParams.get("mood");
  const limit = parseInt(searchParams.get("limit") || "20");
  const pythonApiUrl = process.env.FLASK_API_URL;

  try {
    if (pythonApiUrl) {
      const url = new URL(`${pythonApiUrl.replace(/\/+$/, "")}/api/recommendations`);
      if (mood) url.searchParams.set("mood", mood);
      if (seedTracks.length > 0) url.searchParams.set("tracks", seedTracks.join(","));
      if (!seedTracks.length && query) url.searchParams.set("q", query);
      url.searchParams.set("limit", limit.toString());

      const response = await fetch(url.toString(), { cache: "no-store" });
      const payload = await response.json();
      return NextResponse.json(payload);
    }

    let tracks;

    if (mood) {
      // Mood-based recommendations
      tracks = getSongsByMood(mood).slice(0, limit);
    } else if (seedTracks.length > 0) {
      // Content-based recommendations
      tracks = getRecommendations(seedTracks, limit);
    } else if (query) {
      const topMatches = searchSongs(query);
      const seedId = topMatches[0]?.id;
      tracks = seedId ? getRecommendations([seedId], limit) : getTrendingSongs(limit);
    } else {
      // Default to trending
      tracks = getTrendingSongs(limit);
    }

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
