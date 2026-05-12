"use client";

import { useState } from "react";
import useSWR from "swr";
import { Sparkles, Loader2, Music, RefreshCw } from "lucide-react";
import { MoodSelector } from "@/components/mood-selector";
import { TrackCard } from "@/components/track-card";
import { Button } from "@/components/ui/button";
import type { Song } from "@/lib/song-dataset";

type MoodType = "happy" | "sad" | "energetic" | "calm" | "romantic" | "party" | "focus" | "workout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const {
    data: recommendationsData,
    isLoading,
    mutate,
  } = useSWR<{ tracks: Song[] }>(
    selectedMood ? `/api/recommendations?mood=${selectedMood}&limit=20` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleRefresh = () => {
    mutate();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Mood-Based Discovery</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How Are You Feeling?
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Select your current mood and we&apos;ll curate the perfect playlist for you. 
            Let the music match your emotions.
          </p>
        </div>

        {/* Mood Selector */}
        <div className="max-w-4xl mx-auto mb-12">
          <MoodSelector
            selectedMood={selectedMood}
            onSelectMood={handleMoodSelect}
          />
        </div>

        {/* Results Section */}
        {selectedMood && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                  <Music className="h-6 w-6 text-primary" />
                  {selectedMood} Vibes
                </h2>
                <p className="text-muted-foreground">
                  Songs curated for your current mood
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">
                  Finding the perfect tracks for your mood...
                </p>
              </div>
            ) : recommendationsData?.tracks?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recommendationsData.tracks.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Music className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No tracks found for this mood. Try another mood!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedMood && (
          <div className="text-center py-12">
            <div className="glass-card inline-flex flex-col items-center p-12 rounded-3xl">
              <Sparkles className="h-16 w-16 text-primary/50 mb-6 animate-float" />
              <h3 className="text-xl font-semibold mb-2">Select a Mood Above</h3>
              <p className="text-muted-foreground max-w-md">
                Choose how you&apos;re feeling and we&apos;ll find the perfect music to match 
                your vibe.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
