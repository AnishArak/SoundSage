import { NextResponse } from "next/server";
import { getRecommendations, getSongsByMood, getTrendingSongs, searchSongs } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedTracks = searchParams.get("tracks")?.split(",").filter(Boolean) || [];
  const query = searchParams.get("q")?.trim();
  const mood = searchParams.get("mood");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
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
