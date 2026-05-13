"use client";

export const dynamic = "force-dynamic";

import React, {
  Suspense,
  useState,
  useEffect,
  useCallback,
} from "react";

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

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

function DiscoverContent() {
  const searchParams = useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] =
    useState(initialQuery);

  const [selectedTracks, setSelectedTracks] =
    useState<Song[]>([]);

  const [viewMode, setViewMode] =
    useState<"grid" | "list">("grid");

  const [languageFilter, setLanguageFilter] =
    useState<"all" | "english" | "hindi">(
      "all"
    );

  // SEARCH API
  const {
    data: searchData,
    isLoading: isSearching,
  } = useSWR(
    searchQuery
      ? `/api/search?q=${encodeURIComponent(
          searchQuery
        )}&limit=50`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // TRENDING API
  const { data: trendingData } = useSWR(
    !searchQuery
      ? `/api/trending?limit=50`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // AUTO SELECT FIRST TRACK
  const autoSeedTrack =
    selectedTracks.length === 0
      ? searchData?.tracks?.[0]
      : undefined;

  const recommendationSeedIds =
    selectedTracks.length > 0
      ? selectedTracks.map((t) => t.id)
      : autoSeedTrack
      ? [autoSeedTrack.id]
      : [];

  // RECOMMENDATION API
  const {
    data: recommendationsData,
    isLoading: isLoadingRecs,
  } = useSWR(
    recommendationSeedIds.length > 0
      ? `/api/recommendations?tracks=${recommendationSeedIds.join(
          ","
        )}&limit=15`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      setSearchQuery(newQuery);
    },
    []
  );

  const toggleTrackSelection =
    useCallback((track: Song) => {
      setSelectedTracks((prev) => {
        const exists = prev.some(
          (t) => t.id === track.id
        );

        if (exists) {
          return prev.filter(
            (t) => t.id !== track.id
          );
        }

        if (prev.length >= 5) {
          return [...prev.slice(1), track];
        }

        return [...prev, track];
      });
    }, []);

  const filteredSearchResults =
    searchData?.tracks?.filter(
      (track: Song) => {
        if (languageFilter === "all")
          return true;

        return (
          track.language ===
          languageFilter
        );
      }
    );

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="mx-auto max-w-7xl px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Search className="h-8 w-8 text-green-500" />
            Discover Music
          </h1>

          <p className="text-zinc-400">
            AI-powered Bollywood &
            Hollywood music discovery.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isSearching}
            placeholder="Search songs, artists, albums..."
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-8">

          <Button
            variant={
              languageFilter === "all"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setLanguageFilter("all")
            }
          >
            <Globe className="h-4 w-4 mr-2" />
            All
          </Button>

          <Button
            variant={
              languageFilter === "english"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setLanguageFilter("english")
            }
          >
            Hollywood
          </Button>

          <Button
            variant={
              languageFilter === "hindi"
                ? "default"
                : "outline"
            }
            onClick={() =>
              setLanguageFilter("hindi")
            }
          >
            Bollywood
          </Button>
        </div>

        {/* RECOMMENDATIONS */}
        {recommendationSeedIds.length >
          0 && (
          <div className="mb-12">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-green-500" />

              {autoSeedTrack
                ? `Similar songs to "${autoSeedTrack.name}"`
                : "Recommended Songs"}
            </h2>

            {isLoadingRecs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              </div>
            ) : recommendationsData?.tracks
                ?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recommendationsData.tracks.map(
                  (track: Song) => (
                    <TrackCard
                      key={track.id}
                      track={track}
                      onSelect={
                        toggleTrackSelection
                      }
                      isSelected={selectedTracks.some(
                        (t) =>
                          t.id === track.id
                      )}
                    />
                  )
                )}
              </div>
            ) : (
              <p className="text-zinc-400">
                No recommendations found.
              </p>
            )}
          </div>
        )}

        {/* VIEW MODE */}
        <div className="flex justify-end gap-2 mb-6">

          <Button
            variant={
              viewMode === "grid"
                ? "default"
                : "ghost"
            }
            onClick={() =>
              setViewMode("grid")
            }
          >
            <Grid className="h-4 w-4" />
          </Button>

          <Button
            variant={
              viewMode === "list"
                ? "default"
                : "ghost"
            }
            onClick={() =>
              setViewMode("list")
            }
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* RESULTS */}
        {isSearching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : filteredSearchResults?.length ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-2"
            )}
          >
            {filteredSearchResults.map(
              (track: Song) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  variant={viewMode}
                  onSelect={
                    toggleTrackSelection
                  }
                  isSelected={selectedTracks.some(
                    (t) =>
                      t.id === track.id
                  )}
                />
              )
            )}
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
              {trendingData.tracks.map(
                (track: Song) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    variant={viewMode}
                    onSelect={
                      toggleTrackSelection
                    }
                    isSelected={selectedTracks.some(
                      (t) =>
                        t.id === track.id
                    )}
                  />
                )
              )}
            </div>
          )
        )}

        {!isSearching &&
          searchQuery &&
          !filteredSearchResults
            ?.length && (
            <div className="text-center py-20">
              <Music className="h-16 w-16 text-zinc-600 mx-auto mb-4" />

              <p className="text-zinc-400">
                No songs found.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="text-white p-10">
          Loading...
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
