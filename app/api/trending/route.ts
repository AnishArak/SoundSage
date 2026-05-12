import { NextResponse } from "next/server";
import { getTrendingSongs, getNewReleases, getSongsByLanguage } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "trending";
  const language = searchParams.get("language") as "english" | "hindi" | null;
  const limit = parseInt(searchParams.get("limit") || "20");
  const pythonApiUrl = process.env.FLASK_API_URL;

  try {
    if (pythonApiUrl) {
      const url = new URL(`${pythonApiUrl.replace(/\/+$/, "")}/api/trending`);
      url.searchParams.set("limit", limit.toString());
      if (type === "new") url.searchParams.set("type", "new");
      if (language) url.searchParams.set("language", language);

      const response = await fetch(url.toString(), { cache: "no-store" });
      const payload = await response.json();
      return NextResponse.json(payload);
    }

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
