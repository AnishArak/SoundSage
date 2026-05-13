import { NextResponse } from "next/server";
import { getTrendingSongs, getNewReleases, getSongsByLanguage } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "trending";
  const language = searchParams.get("language") as "english" | "hindi" | null;
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    let tracks;

    if (type === "new") {
      tracks = getNewReleases(limit);
    } else {
      tracks = getTrendingSongs(limit);
    }

    // Filter by language if specified
    if (language) {
      tracks = tracks.filter((t) => t.language === language);
    }

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Trending error:", error);
    return NextResponse.json(
      { error: "Failed to get trending songs" },
      { status: 500 }
    );
  }
}
