"use client";

import { Search, X, Loader2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
}

interface AutocompleteSuggestion {
  id: string;
  label: string;
  artists: string[];
}

export function SearchBar({
  onSearch,
  isLoading,
  placeholder = "Search for songs, artists, or albums...",
  className,
  size = "default",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `/api/autocomplete?q=${encodeURIComponent(query)}&limit=8`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") {
          setSuggestions([]);
        }
      }
    };

    const timeout = window.setTimeout(fetchSuggestions, 220);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
        setSuggestions([]);
      }
    },
    [query, onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          )}
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-24 bg-secondary/50 border-border/50 focus:border-primary/50",
            "placeholder:text-muted-foreground/70",
            size === "lg" && "h-14 text-lg rounded-xl"
          )}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-20 left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="cursor-pointer px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary"
                onClick={() => {
                  setQuery(suggestion.label);
                  setSuggestions([]);
                  onSearch(suggestion.label);
                }}
              >
                <span className="font-semibold">{suggestion.label}</span>
                <span className="block text-muted-foreground">{suggestion.artists.join(", ")}</span>
              </li>
            ))}
          </ul>
        )}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            size === "lg" && "h-10"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </form>
  );
}
