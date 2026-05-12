import {
  Music,
  Brain,
  Sparkles,
  Target,
  Users,
  Zap,
  Database,
  Radio,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description:
      "Our system leverages Spotify's recommendation engine combined with mood-based audio feature targeting to deliver highly personalized suggestions.",
  },
  {
    icon: Database,
    title: "Massive Music Library",
    description:
      "Access millions of tracks across all genres, from Bollywood hits to international chart-toppers, all through Spotify's extensive catalog.",
  },
  {
    icon: Radio,
    title: "Audio Feature Analysis",
    description:
      "We analyze tracks based on energy, valence, danceability, and tempo to match songs perfectly to your desired mood.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Select seed tracks and get recommendations that truly align with your taste, not just generic popular songs.",
  },
];

const stats = [
  { value: "100M+", label: "Songs Available" },
  { value: "8", label: "Mood Categories" },
  { value: "5", label: "Seed Tracks Max" },
  { value: "Real-time", label: "Recommendations" },
];

const team = [
  {
    name: "SoundSage AI",
    role: "Recommendation Engine",
    description: "Powered by Spotify's algorithms and audio feature analysis.",
  },
  {
    name: "Music Discovery",
    role: "Core Feature",
    description: "Search, explore, and find music that moves you.",
  },
  {
    name: "Mood Matching",
    role: "Intelligent System",
    description: "Maps emotions to audio characteristics for perfect playlists.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <Music className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">SoundSage</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            SoundSage is an AI-powered music recommendation system designed to help you 
            discover new music that matches your taste and mood. Built with modern 
            technology and powered by Spotify&apos;s extensive music library.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Making Music Discovery Personal
              </h2>
              <p className="text-muted-foreground mb-4">
                We believe that finding the right music should be effortless. Whether 
                you&apos;re looking for energetic workout tracks, calming study music, or 
                romantic evening playlists, SoundSage helps you discover songs that 
                resonate with your current state of mind.
              </p>
              <p className="text-muted-foreground">
                By combining advanced audio feature analysis with mood-based 
                recommendations, we create a personalized discovery experience that 
                goes beyond simple genre matching.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-card text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our recommendation system uses multiple approaches to find the perfect 
              music for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl glass-card hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-20">
          <div className="p-8 sm:p-12 rounded-3xl glass-card">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Technology</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Built with Modern Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Next.js 16</div>
                <div className="text-sm text-muted-foreground">Framework</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Spotify API</div>
                <div className="text-sm text-muted-foreground">Music Data</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Tailwind CSS</div>
                <div className="text-sm text-muted-foreground">Styling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">TypeScript</div>
                <div className="text-sm text-muted-foreground">Type Safety</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Core Systems</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">The Building Blocks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SoundSage is built on three core pillars that work together to deliver 
              the best music recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl glass-card text-center hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
