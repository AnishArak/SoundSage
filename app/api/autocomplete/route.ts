import { NextResponse } from "next/server";
import { searchSongs } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "8");
  const pythonApiUrl = process.env.FLASK_API_URL;

  if (!query.trim()) {
    return NextResponse.json({ suggestions: [] });
  }

  if (pythonApiUrl) {
    const response = await fetch(
      `${pythonApiUrl.replace(/\/+$/, "")}/api/autocomplete?q=${encodeURIComponent(query)}&limit=${limit}`,
      { cache: "no-store" }
    );
    const payload = await response.json();
    return NextResponse.json(payload);
  }

  const songs = searchSongs(query).slice(0, limit);
  const suggestions = songs.map((song) => ({
    id: song.id,
    label: song.name,
    artists: song.artists.map((artist) => artist.name),
  }));

  return NextResponse.json({ suggestions });
}
