"use client";

import {
  Smile,
  Frown,
  Zap,
  Cloud,
  Heart,
  PartyPopper,
  Brain,
  Dumbbell,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MoodType = "happy" | "sad" | "energetic" | "calm" | "romantic" | "party" | "focus" | "workout";

const moods: { id: MoodType; label: string; icon: React.ElementType; color: string; description: string }[] = [
  {
    id: "happy",
    label: "Happy",
    icon: Smile,
    color: "from-yellow-500 to-orange-500",
    description: "Upbeat and cheerful",
  },
  {
    id: "sad",
    label: "Sad",
    icon: Frown,
    color: "from-blue-500 to-indigo-500",
    description: "Melancholic and emotional",
  },
  {
    id: "energetic",
    label: "Energetic",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    description: "High energy vibes",
  },
  {
    id: "calm",
    label: "Calm",
    icon: Cloud,
    color: "from-cyan-500 to-teal-500",
    description: "Peaceful and relaxing",
  },
  {
    id: "romantic",
    label: "Romantic",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "Love and romance",
  },
  {
    id: "party",
    label: "Party",
    icon: PartyPopper,
    color: "from-purple-500 to-pink-500",
    description: "Get the party started",
  },
  {
    id: "focus",
    label: "Focus",
    icon: Brain,
    color: "from-emerald-500 to-green-500",
    description: "Deep concentration",
  },
  {
    id: "workout",
    label: "Workout",
    icon: Dumbbell,
    color: "from-red-500 to-orange-500",
    description: "Exercise motivation",
  },
];

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.id;
        return (
          <button
            key={mood.id}
            onClick={() => onSelectMood(mood.id)}
            className={cn(
              "group relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300",
              "glass-card hover:scale-[1.02]",
              isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                `bg-gradient-to-br ${mood.color}`,
                isSelected ? "scale-110" : "group-hover:scale-105"
              )}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-sm">{mood.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {mood.description}
              </p>
            </div>
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
