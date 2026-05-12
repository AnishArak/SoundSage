"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  Search,
  Loader2,
  Music,
  Sparkles,
  Grid,
  List,
  Globe,
  Film,
} from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { TrackCard } from "@/components/track-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Song } from "@/lib/song-dataset";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTracks, setSelectedTracks] = useState<Song[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [languageFilter, setLanguageFilter] = useState<
    "all" | "english" | "hindi"
  >("all");

  const { data: searchData, isLoading: isSearching } = useSWR<{
    tracks: Song[];
  }>(
    searchQuery
      ? `/api/search?q=${encodeURIComponent(searchQuery)}&limit=50`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: trendingData } = useSWR<{ tracks: Song[] }>(
    !searchQuery
      ? `/api/trending?limit=50${
          languageFilter !== "all"
            ? `&language=${languageFilter}`
            : ""
        }`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const autoSeedTrack =
    selectedTracks.length === 0 ? searchData?.tracks?.[0] : undefined;

  const recommendationSeedIds =
    selectedTracks.length > 0
      ? selectedTracks.map((t) => t.id)
      : autoSeedTrack
      ? [autoSeedTrack.id]
      : [];

  const { data: recommendationsData, isLoading: isLoadingRecs } = useSWR<{
    tracks: Song[];
  }>(
    recommendationSeedIds.length > 0
      ? `/api/recommendations?tracks=${recommendationSeedIds.join(
          ","
        )}&limit=15`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = useCallback((newQuery: string) => {
    setSearchQuery(newQuery);
  }, []);

  const toggleTrackSelection = useCallback((track: Song) => {
    setSelectedTracks((prev) => {
      const isSelected = prev.some((t) => t.id === track.id);

      if (isSelected) {
        return prev.filter((t) => t.id !== track.id);
      }

      if (prev.length >= 5) {
        return [...prev.slice(1), track];
      }

      return [...prev, track];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTracks([]);
  }, []);

  const filteredSearchResults = searchData?.tracks?.filter((track) => {
    if (languageFilter === "all") return true;
    return track.language === languageFilter;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" />
            Discover Music
          </h1>

          <p className="text-muted-foreground max-w-2xl">
            Search for songs, artists, or albums. Select up to 5 tracks to get
            personalized recommendations based on your choices.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isSearching}
            placeholder="Search for songs, artists, or albums..."
          />
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm text-muted-foreground">Filter:</span>

          <Button
            variant={languageFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguageFilter("all")}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            All
          </Button>

          <Button
            variant={languageFilter === "english" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguageFilter("english")}
            className="gap-2"
          >
            <Film className="h-4 w-4" />
            Hollywood
          </Button>

          <Button
            variant={languageFilter === "hindi" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguageFilter("hindi")}
            className="gap-2"
          >
            <Film className="h-4 w-4" />
            Bollywood
          </Button>
        </div>

        {/* Recommendations */}
        {recommendationSeedIds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />

              {selectedTracks.length > 0
                ? "Recommended For You"
                : autoSeedTrack
                ? `Similar songs to "${autoSeedTrack.name}"`
                : "Recommended For You"}
            </h2>

            {isLoadingRecs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recommendationsData?.tracks?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recommendationsData.tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onSelect={toggleTrackSelection}
                    isSelected={selectedTracks.some(
                      (t) => t.id === track.id
                    )}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No recommendations found.
              </p>
            )}
          </div>
        )}

        {/* Results */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredSearchResults?.length ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-2"
            )}
          >
            {filteredSearchResults.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                variant={viewMode}
                onSelect={toggleTrackSelection}
                isSelected={selectedTracks.some(
                  (t) => t.id === track.id
                )}
              />
            ))}
          </div>
        ) : (
          !searchQuery &&
          trendingData?.tracks?.length && (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  : "space-y-2"
              )}
            >
              {trendingData.tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  variant={viewMode}
                  onSelect={toggleTrackSelection}
                  isSelected={selectedTracks.some(
                    (t) => t.id === track.id
                  )}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
