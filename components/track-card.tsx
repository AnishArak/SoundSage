"use client";

import Image from "next/image";
import { Play, Pause, ExternalLink, Plus, Check, Youtube } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/song-dataset";
import type { Song } from "@/lib/song-dataset";

interface TrackCardProps {
  track: Song;
  onSelect?: (track: Song) => void;
  isSelected?: boolean;
  variant?: "grid" | "list";
}

export function TrackCard({
  track,
  onSelect,
  isSelected,
  variant = "grid",
}: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const albumImage = track.album.images[0]?.url || "/placeholder-album.jpg";
  const artistNames = track.artists.map((a) => a.name).join(", ");

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!track.preview_url) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(track.preview_url);
        audioRef.current.volume = 0.5;
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (variant === "list") {
    return (
      <div
        className={cn(
          "group flex items-center gap-4 p-3 rounded-xl transition-all duration-300",
          "hover:bg-secondary/50",
          isSelected && "bg-primary/10 ring-1 ring-primary/30"
        )}
      >
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={albumImage}
            alt={track.album.name}
            fill
            className="object-cover"
            sizes="56px"
          />
          {track.preview_url && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" fill="white" />
              ) : (
                <Play className="h-5 w-5 text-white" fill="white" />
              )}
            </button>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{track.name}</h4>
          <p className="text-xs text-muted-foreground truncate">{artistNames}</p>
        </div>

        <span className="text-xs text-muted-foreground">
          {formatDuration(track.duration_ms)}
        </span>

        <div className="flex items-center gap-2">
          {onSelect && (
            <Button
              size="sm"
              variant={isSelected ? "default" : "ghost"}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(track);
              }}
              className="h-8 w-8 p-0"
            >
              {isSelected ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          )}
          <a
            href={track.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-red-500 hover:text-red-400 transition-colors"
            title="Watch on YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Open in Spotify"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300",
        "glass-card hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10",
        isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={albumImage}
          alt={track.album.name}
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

        {track.preview_url && (
          <button
            onClick={togglePlay}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "flex items-center justify-center w-14 h-14 rounded-full",
              "bg-primary text-primary-foreground shadow-lg",
              "transition-all duration-300",
              isHovered
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            )}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6 ml-1" fill="currentColor" />
            )}
          </button>
        )}

        {onSelect && (
          <Button
            size="sm"
            variant={isSelected ? "default" : "secondary"}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(track);
            }}
            className={cn(
              "absolute top-3 right-3 h-8 w-8 p-0 transition-all duration-300",
              isHovered || isSelected ? "opacity-100" : "opacity-0"
            )}
          >
            {isSelected ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        )}

        <div className={cn(
          "absolute top-3 left-3 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <a
            href={track.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition-all duration-300"
            title="Watch on YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            title="Open in Spotify"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm truncate mb-1 group-hover:text-primary transition-colors">
          {track.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{artistNames}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatDuration(track.duration_ms)}
          </span>
          <span className="text-xs text-muted-foreground">
            {track.album.release_date?.split("-")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
