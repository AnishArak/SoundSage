import { NextResponse } from "next/server";

const genres = [
  "pop",
  "rock",
  "hip-hop",
  "r-n-b",
  "edm",
  "bollywood",
  "indie",
  "latin",
  "funk",
  "soul",
  "classical",
  "ambient",
];

export async function GET() {
  try {
    return NextResponse.json({ genres });
  } catch (error) {
    console.error("Genres error:", error);
    return NextResponse.json(
      { error: "Failed to get genres" },
      { status: 500 }
    );
  }
}
