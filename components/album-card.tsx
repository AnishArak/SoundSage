"use client";

import Image from "next/image";
import { ExternalLink, Youtube } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Song } from "@/lib/song-dataset";

interface AlbumCardProps {
  album: Song;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const albumImage = album.album.images[0]?.url || "/placeholder-album.jpg";
  const artistNames = album.artists.map((a) => a.name).join(", ");

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300",
        "glass-card hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={albumImage}
          alt={album.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-60"
          )}
        />

        <div
          className={cn(
            "absolute top-3 right-3 flex gap-2 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <a
            href={album.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors"
            title="Watch on YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-primary-foreground transition-colors"
            title="Open in Spotify"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm truncate mb-1 group-hover:text-primary transition-colors">
          {album.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{artistNames}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {album.language === "hindi" ? "Bollywood" : "Hollywood"}
          </span>
          <span className="text-xs text-muted-foreground">
            {album.album.release_date?.split("-")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
