"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Music,
  Sparkles,
  TrendingUp,
  Headphones,
  ArrowRight,
  Disc,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { TrackCard } from "@/components/track-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Song } from "@/lib/song-dataset";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const features = [
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get personalized song suggestions based on your music taste and preferences.",
  },
  {
    icon: Headphones,
    title: "Mood-Based Discovery",
    description: "Find the perfect playlist for any mood - happy, sad, energetic, or calm.",
  },
  {
    icon: TrendingUp,
    title: "Trending Music",
    description: "Stay updated with Hollywood and Bollywood hits from around the world.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const { data: trendingData } = useSWR<{ tracks: Song[] }>(
    "/api/trending?limit=8",
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleSearch = (query: string) => {
    setIsSearching(true);
    router.push(`/discover?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <Disc className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                <span>Hollywood &amp; Bollywood Hits</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-balance">Discover Music That</span>
              <br />
              <span className="gradient-text">Moves You</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Let our AI-powered recommendation engine help you find your next favorite 
              song. Search, explore moods, and discover music tailored just for you.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar
                onSearch={handleSearch}
                isLoading={isSearching}
                size="lg"
                placeholder="Search for songs, artists, or albums..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/mood">
                <Button size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Explore by Mood
                </Button>
              </Link>
              <Link href="/discover">
                <Button size="lg" variant="outline" className="gap-2">
                  Browse All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SoundSage uses advanced algorithms to deliver personalized recommendations 
              from both Hollywood and Bollywood music.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl glass-card hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                Trending Now
              </h2>
              <p className="text-muted-foreground">
                Top hits from Hollywood and Bollywood
              </p>
            </div>
            <Link href="/discover">
              <Button variant="outline" className="gap-2">
                See All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {trendingData?.tracks ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {trendingData.tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-secondary/50 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            </div>

            <Music className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
              Ready to Find Your Sound?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-pretty">
              Start exploring personalized recommendations based on your mood, 
              favorite artists, or any song you love.
            </p>
            <Link href="/mood">
              <Button size="lg" className="gap-2 animate-pulse-glow">
                <Sparkles className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
