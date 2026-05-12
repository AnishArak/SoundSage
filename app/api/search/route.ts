import { NextResponse } from "next/server";
import { searchSongs } from "@/lib/song-dataset";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "20");
  const pythonApiUrl = process.env.FLASK_API_URL;

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    if (pythonApiUrl) {
      const response = await fetch(
        `${pythonApiUrl.replace(/\/+$/, "")}/api/search?q=${encodeURIComponent(query)}&limit=${limit}`,
        { cache: "no-store" }
      );
      const payload = await response.json();
      return NextResponse.json(payload);
    }

    const tracks = searchSongs(query).slice(0, limit);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search" },
      { status: 500 }
    );
  }
}
