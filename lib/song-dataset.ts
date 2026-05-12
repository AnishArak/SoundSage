export interface Song {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    release_date: string;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  youtube_url: string;
  popularity: number;
  genre: string;
  mood: string[];
  language: "english" | "hindi";
  energy?: number;
  tempo?: number;
  vibe?: string[];
}

const VIBE_MAPPINGS: Record<string, string[]> = {
  party: ["party", "energetic"],
  energetic: ["energetic", "workout"],
  romantic: ["romantic", "dreamy", "intimate"],
  sad: ["sad", "emotional"],
  calm: ["chill", "relax"],
  happy: ["uplifting", "feelgood"],
  dramatic: ["cinematic", "moody"],
  dance: ["party", "energetic"],
  focus: ["focus", "workout"],
  workout: ["workout", "energetic"],
  festive: ["party", "celebration"],
  dark: ["moody", "intense"],
  inspirational: ["uplifting", "cinematic"],
  theatrical: ["cinematic", "dramatic"],
};

function deriveVibes(mood: string[]): string[] {
  const vibes = new Set<string>();
  mood.forEach((m) => {
    const normalizedMood = m.toLowerCase();
    vibes.add(normalizedMood);
    const mapped = VIBE_MAPPINGS[normalizedMood];
    if (mapped) {
      mapped.forEach((v) => vibes.add(v));
    }
  });
  return Array.from(vibes);
}

// Hollywood Songs Dataset
const hollywoodSongs: Song[] = [
  {
    id: "hw-1",
    name: "Blinding Lights",
    artists: [{ id: "a1", name: "The Weeknd" }],
    album: {
      id: "al1",
      name: "After Hours",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", height: 640, width: 640 }],
      release_date: "2020-03-20",
    },
    duration_ms: 200040,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
    youtube_url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
    popularity: 95,
    genre: "pop",
    mood: ["energetic", "party"],
    language: "english",
  },
  {
    id: "hw-2",
    name: "Shape of You",
    artists: [{ id: "a2", name: "Ed Sheeran" }],
    album: {
      id: "al2",
      name: "÷ (Divide)",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", height: 640, width: 640 }],
      release_date: "2017-01-06",
    },
    duration_ms: 233713,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3" },
    youtube_url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    popularity: 94,
    genre: "pop",
    mood: ["romantic", "happy"],
    language: "english",
  },
  {
    id: "hw-3",
    name: "Uptown Funk",
    artists: [{ id: "a3", name: "Bruno Mars" }, { id: "a4", name: "Mark Ronson" }],
    album: {
      id: "al3",
      name: "Uptown Special",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2", height: 640, width: 640 }],
      release_date: "2014-11-10",
    },
    duration_ms: 269667,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS" },
    youtube_url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    popularity: 92,
    genre: "funk",
    mood: ["party", "energetic", "happy"],
    language: "english",
  },
  {
  id: "en-40",
  name: "Stronger",
  artists: [{ id: "k1", name: "Kanye West" }],
  album: {
    id: "el40",
    name: "Graduation",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg",
        height: 640,
        width: 640
      }
    ],
    release_date: "2007-09-11",
  },
  duration_ms: 311000,
  preview_url: null,
  external_urls: {
    spotify: "https://open.spotify.com/track/1Sa7B2YweHJG3O2UEc1VcM"
  },
  youtube_url: "https://www.youtube.com/watch?v=PsO6ZnUZI0g",
  popularity: 98,
  genre: "hip-hop",
  mood: ["workout", "party"],
  language: "english",
},

{
  id: "en-41",
  name: "Heartless",
  artists: [{ id: "k2", name: "Kanye West" }],
  album: {
    id: "el41",
    name: "808s & Heartbreak",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/f/f1/808s_%26_Heartbreak.png",
        height: 640,
        width: 640
      }
    ],
    release_date: "2008-11-24",
  },
  duration_ms: 230000,
  preview_url: null,
  external_urls: {
    spotify: "https://open.spotify.com/track/4EWCNWgDS8707fNSZ1oaA5"
  },
  youtube_url: "https://www.youtube.com/watch?v=Co0tTeuUVhU",
  popularity: 96,
  genre: "hip-hop",
  mood: ["sad", "chill"],
  language: "english",
},

{
  id: "en-42",
  name: "Starboy",
  artists: [{ id: "e15", name: "The Weeknd" }],
  album: {
    id: "el42",
    name: "Starboy",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png",
        height: 640,
        width: 640
      }
    ],
    release_date: "2016-09-22",
  },
  duration_ms: 230000,
  preview_url: null,
  external_urls: {
    spotify: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
  },
  youtube_url: "https://www.youtube.com/watch?v=34Na4j8AVgA",
  popularity: 99,
  genre: "pop",
  mood: ["party", "workout"],
  language: "english",
},

{
  id: "en-43",
  name: "Industry Baby",
  artists: [{ id: "e16", name: "Lil Nas X" }],
  album: {
    id: "el43",
    name: "Montero",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/f/f1/Lil_Nas_X_-_Montero.png",
        height: 640,
        width: 640
      }
    ],
    release_date: "2021-07-23",
  },
  duration_ms: 212000,
  preview_url: null,
  external_urls: {
    spotify: "https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK"
  },
  youtube_url: "https://www.youtube.com/watch?v=UTHLKHL_whs",
  popularity: 97,
  genre: "hip-hop",
  mood: ["party", "workout"],
  language: "english",
},

{
  id: "en-44",
  name: "Die For You",
  artists: [{ id: "e17", name: "The Weeknd" }],
  album: {
    id: "el44",
    name: "Starboy",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png",
        height: 640,
        width: 640
      }
    ],
    release_date: "2016-11-25",
  },
  duration_ms: 260000,
  preview_url: null,
  external_urls: {
    spotify: "https://open.spotify.com/track/2Ch7LmS7r2Gy2kc64wv3Bz"
  },
  youtube_url: "https://www.youtube.com/watch?v=QLCpqdqeoII",
  popularity: 98,
  genre: "rnb",
  mood: ["romantic", "sad"],
  language: "english",
  },

  {
    id: "hw-4",
    name: "Someone Like You",
    artists: [{ id: "a5", name: "Adele" }],
    album: {
      id: "al4",
      name: "21",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300", height: 640, width: 640 }],
      release_date: "2011-01-24",
    },
    duration_ms: 285000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV" },
    youtube_url: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
    popularity: 91,
    genre: "pop",
    mood: ["sad", "romantic"],
    language: "english",
  },
  {
    id: "hw-5",
    name: "Bohemian Rhapsody",
    artists: [{ id: "a6", name: "Queen" }],
    album: {
      id: "al5",
      name: "A Night at the Opera",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a", height: 640, width: 640 }],
      release_date: "1975-10-31",
    },
    duration_ms: 354320,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J" },
    youtube_url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    popularity: 93,
    genre: "rock",
    mood: ["energetic"],
    language: "english",
  },
  {
    id: "hw-6",
    name: "Bad Guy",
    artists: [{ id: "a7", name: "Billie Eilish" }],
    album: {
      id: "al6",
      name: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce", height: 640, width: 640 }],
      release_date: "2019-03-29",
    },
    duration_ms: 194088,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m" },
    youtube_url: "https://www.youtube.com/watch?v=DyDfgMOUjCI",
    popularity: 90,
    genre: "pop",
    mood: ["energetic", "party"],
    language: "english",
  },
  {
    id: "hw-7",
    name: "Rolling in the Deep",
    artists: [{ id: "a5", name: "Adele" }],
    album: {
      id: "al4",
      name: "21",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300", height: 640, width: 640 }],
      release_date: "2011-01-24",
    },
    duration_ms: 228000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1c8gk2PeTE04A1pIDH9YMk" },
    youtube_url: "https://www.youtube.com/watch?v=rYEDA3JcQqw",
    popularity: 89,
    genre: "pop",
    mood: ["energetic", "sad"],
    language: "english",
  },
  {
    id: "hw-8",
    name: "Thinking Out Loud",
    artists: [{ id: "a2", name: "Ed Sheeran" }],
    album: {
      id: "al7",
      name: "x (Multiply)",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273407bd04707c463bbb3410737", height: 640, width: 640 }],
      release_date: "2014-06-23",
    },
    duration_ms: 281560,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f" },
    youtube_url: "https://www.youtube.com/watch?v=lp-EO5I60KA",
    popularity: 88,
    genre: "pop",
    mood: ["romantic", "calm"],
    language: "english",
  },
  {
    id: "hw-9",
    name: "Happier",
    artists: [{ id: "a8", name: "Marshmello" }, { id: "a9", name: "Bastille" }],
    album: {
      id: "al8",
      name: "Happier",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2734d1a5f6c81ebea16aff3cc81", height: 640, width: 640 }],
      release_date: "2018-08-17",
    },
    duration_ms: 214293,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2dpaYNEQHiRxtZbfNsse99" },
    youtube_url: "https://www.youtube.com/watch?v=m7Bc3pLyij0",
    popularity: 87,
    genre: "edm",
    mood: ["sad", "energetic"],
    language: "english",
  },
  {
    id: "hw-10",
    name: "Despacito",
    artists: [{ id: "a10", name: "Luis Fonsi" }, { id: "a11", name: "Daddy Yankee" }],
    album: {
      id: "al9",
      name: "Vida",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c", height: 640, width: 640 }],
      release_date: "2017-01-12",
    },
    duration_ms: 228827,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb" },
    youtube_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    popularity: 95,
    genre: "latin",
    mood: ["party", "romantic", "happy"],
    language: "english",
  },
  {
    id: "hw-11",
    name: "Stay With Me",
    artists: [{ id: "a12", name: "Sam Smith" }],
    album: {
      id: "al10",
      name: "In the Lonely Hour",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273d2aac193bdfeb86c6ed8b123", height: 640, width: 640 }],
      release_date: "2014-05-26",
    },
    duration_ms: 172000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/22skzmqfdWrjJECcfBFCQW" },
    youtube_url: "https://www.youtube.com/watch?v=pB-5XG-DbAA",
    popularity: 86,
    genre: "pop",
    mood: ["sad", "romantic"],
    language: "english",
  },
  {
    id: "hw-12",
    name: "Levitating",
    artists: [{ id: "a13", name: "Dua Lipa" }],
    album: {
      id: "al11",
      name: "Future Nostalgia",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946", height: 640, width: 640 }],
      release_date: "2020-03-27",
    },
    duration_ms: 203807,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP" },
    youtube_url: "https://www.youtube.com/watch?v=TUVcZfQe-Kw",
    popularity: 91,
    genre: "pop",
    mood: ["happy", "party", "energetic"],
    language: "english",
  },
  {
    id: "hw-13",
    name: "Photograph",
    artists: [{ id: "a2", name: "Ed Sheeran" }],
    album: {
      id: "al7",
      name: "x (Multiply)",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273407bd04707c463bbb3410737", height: 640, width: 640 }],
      release_date: "2014-06-23",
    },
    duration_ms: 258987,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1HNkqx9Ahdgi1Ixy2xkKkL" },
    youtube_url: "https://www.youtube.com/watch?v=nSDgHBxUbVQ",
    popularity: 87,
    genre: "pop",
    mood: ["romantic", "sad"],
    language: "english",
  },
  {
    id: "hw-14",
    name: "Starboy",
    artists: [{ id: "a1", name: "The Weeknd" }, { id: "a14", name: "Daft Punk" }],
    album: {
      id: "al12",
      name: "Starboy",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452", height: 640, width: 640 }],
      release_date: "2016-11-25",
    },
    duration_ms: 230453,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB" },
    youtube_url: "https://www.youtube.com/watch?v=34Na4j8AVgA",
    popularity: 90,
    genre: "pop",
    mood: ["energetic", "party"],
    language: "english",
  },
  {
    id: "hw-15",
    name: "Closer",
    artists: [{ id: "a15", name: "The Chainsmokers" }, { id: "a16", name: "Halsey" }],
    album: {
      id: "al13",
      name: "Collage",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2739130c66562d2d4cae6cd11d0", height: 640, width: 640 }],
      release_date: "2016-07-29",
    },
    duration_ms: 244960,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7BKLCZ1jbUBVqRi2FVlTVw" },
    youtube_url: "https://www.youtube.com/watch?v=PT2_F-1esPk",
    popularity: 89,
    genre: "edm",
    mood: ["romantic", "party"],
    language: "english",
  },
  {
    id: "hw-16",
    name: "Perfect",
    artists: [{ id: "a2", name: "Ed Sheeran" }],
    album: {
      id: "al2",
      name: "÷ (Divide)",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96", height: 640, width: 640 }],
      release_date: "2017-03-03",
    },
    duration_ms: 263400,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v" },
    youtube_url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    popularity: 92,
    genre: "pop",
    mood: ["romantic", "calm"],
    language: "english",
  },
  {
    id: "hw-17",
    name: "Attention",
    artists: [{ id: "a17", name: "Charlie Puth" }],
    album: {
      id: "al14",
      name: "Voicenotes",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27340421b7852ce2aaeb026c6fd", height: 640, width: 640 }],
      release_date: "2018-05-11",
    },
    duration_ms: 211867,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7FESgYLcOufHqKlwrvJN60" },
    youtube_url: "https://www.youtube.com/watch?v=nfs8NYg7yQM",
    popularity: 86,
    genre: "pop",
    mood: ["energetic", "romantic"],
    language: "english",
  },
  {
    id: "hw-18",
    name: "Sunflower",
    artists: [{ id: "a18", name: "Post Malone" }, { id: "a19", name: "Swae Lee" }],
    album: {
      id: "al15",
      name: "Spider-Man: Into the Spider-Verse",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02", height: 640, width: 640 }],
      release_date: "2018-10-18",
    },
    duration_ms: 158040,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0RiRZpuVRbi7oqRdSMwhQY" },
    youtube_url: "https://www.youtube.com/watch?v=ApXoWvfEYVU",
    popularity: 91,
    genre: "hip-hop",
    mood: ["happy", "calm"],
    language: "english",
  },
  {
    id: "hw-19",
    name: "Dance Monkey",
    artists: [{ id: "a20", name: "Tones and I" }],
    album: {
      id: "al16",
      name: "The Kids Are Coming",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273c6f7af36ecdc3ed6e0a1f169", height: 640, width: 640 }],
      release_date: "2019-05-10",
    },
    duration_ms: 209438,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2XU0oxnq2qxCpomAAuJY8K" },
    youtube_url: "https://www.youtube.com/watch?v=q0hyYWKXF0Q",
    popularity: 88,
    genre: "pop",
    mood: ["happy", "energetic", "party"],
    language: "english",
  },
  {
    id: "hw-20",
    name: "Lose Yourself",
    artists: [{ id: "a21", name: "Eminem" }],
    album: {
      id: "al17",
      name: "8 Mile",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a", height: 640, width: 640 }],
      release_date: "2002-10-28",
    },
    duration_ms: 326000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ" },
    youtube_url: "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
    popularity: 88,
    genre: "hip-hop",
    mood: ["energetic", "workout", "focus"],
    language: "english",
  },
  {
    id: "hw-21",
    name: "Believer",
    artists: [{ id: "a22", name: "Imagine Dragons" }],
    album: {
      id: "al18",
      name: "Evolve",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27375aa7f76f9a0e2f19b0b0f87", height: 640, width: 640 }],
      release_date: "2017-06-23",
    },
    duration_ms: 204347,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0pqnGHJpmpxLKifKRmU6WP" },
    youtube_url: "https://www.youtube.com/watch?v=7wtfhZwyrcc",
    popularity: 89,
    genre: "rock",
    mood: ["energetic", "workout"],
    language: "english",
  },
  {
    id: "hw-22",
    name: "Thunder",
    artists: [{ id: "a22", name: "Imagine Dragons" }],
    album: {
      id: "al18",
      name: "Evolve",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27375aa7f76f9a0e2f19b0b0f87", height: 640, width: 640 }],
      release_date: "2017-06-23",
    },
    duration_ms: 187147,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1zB4vmk8tFRmM9UULNzbLB" },
    youtube_url: "https://www.youtube.com/watch?v=fKopy74weus",
    popularity: 87,
    genre: "rock",
    mood: ["energetic", "happy"],
    language: "english",
  },
  {
    id: "hw-23",
    name: "Shallow",
    artists: [{ id: "a23", name: "Lady Gaga" }, { id: "a24", name: "Bradley Cooper" }],
    album: {
      id: "al19",
      name: "A Star Is Born",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342", height: 640, width: 640 }],
      release_date: "2018-10-05",
    },
    duration_ms: 215733,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2VxeLyX666F8uXCJ0dZF8B" },
    youtube_url: "https://www.youtube.com/watch?v=bo_efYhYU2A",
    popularity: 88,
    genre: "pop",
    mood: ["romantic", "sad"],
    language: "english",
  },
  {
    id: "hw-24",
    name: "All of Me",
    artists: [{ id: "a25", name: "John Legend" }],
    album: {
      id: "al20",
      name: "Love in the Future",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a0e9d5df70ae9b9af12d6fb8", height: 640, width: 640 }],
      release_date: "2013-08-30",
    },
    duration_ms: 269000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a" },
    youtube_url: "https://www.youtube.com/watch?v=450p7goxZqg",
    popularity: 90,
    genre: "r-n-b",
    mood: ["romantic", "calm"],
    language: "english",
  },
  {
    id: "hw-25",
    name: "Counting Stars",
    artists: [{ id: "a26", name: "OneRepublic" }],
    album: {
      id: "al21",
      name: "Native",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27342284fb7dab2e0c82d0acf53", height: 640, width: 640 }],
      release_date: "2013-03-22",
    },
    duration_ms: 257000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1" },
    youtube_url: "https://www.youtube.com/watch?v=hT_nvWreIhg",
    popularity: 87,
    genre: "pop",
    mood: ["happy", "energetic"],
    language: "english",
  },
];

// Bollywood Songs Dataset
const bollywoodSongs: Song[] = [
  {
    id: "bw-1",
    name: "Tum Hi Ho",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl1",
      name: "Aashiqui 2",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a75c2f26913099a420050f01", height: 640, width: 640 }],
      release_date: "2013-04-08",
    },
    duration_ms: 262000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0kHpgMZkLuIDNWQlVS4yXH" },
    youtube_url: "https://www.youtube.com/watch?v=Umqb9KENgmk",
    popularity: 94,
    genre: "bollywood",
    mood: ["romantic", "sad"],
    language: "hindi",
  },
  {
    id: "bw-2",
    name: "Kesariya",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl2",
      name: "Brahmastra",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e30e1d246a3342ae1f8ea034", height: 640, width: 640 }],
      release_date: "2022-07-17",
    },
    duration_ms: 268000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2yLa0QULdQr0qAiV2xN7DH" },
    youtube_url: "https://www.youtube.com/watch?v=BddP6PYo2gs",
    popularity: 95,
    genre: "bollywood",
    mood: ["romantic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-3",
    name: "Chaleya",
    artists: [{ id: "b1", name: "Arijit Singh" }, { id: "b2", name: "Shilpa Rao" }],
    album: {
      id: "bl3",
      name: "Jawan",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27319afe9f731dd91e6029cf2da", height: 640, width: 640 }],
      release_date: "2023-08-30",
    },
    duration_ms: 238000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/5KWXn2yA8rbcvqGIu8nlKX" },
    youtube_url: "https://www.youtube.com/watch?v=E2BwqVkSrTs",
    popularity: 92,
    genre: "bollywood",
    mood: ["romantic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-4",
    name: "Raataan Lambiyan",
    artists: [{ id: "b3", name: "Jubin Nautiyal" }, { id: "b4", name: "Asees Kaur" }],
    album: {
      id: "bl4",
      name: "Shershaah",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2730174f9b04c7fc27bc78d9e02", height: 640, width: 640 }],
      release_date: "2021-07-28",
    },
    duration_ms: 254000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2pwDXS8Qkrsy9g7CXPfxqW" },
    youtube_url: "https://www.youtube.com/watch?v=gvyUuxdRdR4",
    popularity: 93,
    genre: "bollywood",
    mood: ["romantic", "calm"],
    language: "hindi",
  },
  {
    id: "bw-5",
    name: "Kal Ho Naa Ho",
    artists: [{ id: "b5", name: "Sonu Nigam" }],
    album: {
      id: "bl5",
      name: "Kal Ho Naa Ho",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27340f5dd92843ce8a9c0c50155", height: 640, width: 640 }],
      release_date: "2003-11-28",
    },
    duration_ms: 322000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7gXy60xRcwbOLkvCRtyMVh" },
    youtube_url: "https://www.youtube.com/watch?v=g0eO74UmRBs",
    popularity: 91,
    genre: "bollywood",
    mood: ["romantic", "sad", "happy"],
    language: "hindi",
  },
  {
    id: "bw-6",
    name: "Apna Bana Le",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl6",
      name: "Bhediya",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27395e7bd23da59bbeef089a2c6", height: 640, width: 640 }],
      release_date: "2022-11-07",
    },
    duration_ms: 260000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/4oT16sBiPM1U49G2qdGfxi" },
    youtube_url: "https://www.youtube.com/watch?v=B0h4Ih7_Chs",
    popularity: 90,
    genre: "bollywood",
    mood: ["romantic", "calm"],
    language: "hindi",
  },
  {
    id: "bw-7",
    name: "Channa Mereya",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl7",
      name: "Ae Dil Hai Mushkil",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2739ad55a3c1a6c4e3a7d3c3f7e", height: 640, width: 640 }],
      release_date: "2016-10-14",
    },
    duration_ms: 289000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/3IbYZM1qMOvJBfq0dZtxrw" },
    youtube_url: "https://www.youtube.com/watch?v=284Ov7ysmfA",
    popularity: 92,
    genre: "bollywood",
    mood: ["sad", "romantic"],
    language: "hindi",
  },
  {
    id: "bw-8",
    name: "Tere Hawale",
    artists: [{ id: "b1", name: "Arijit Singh" }, { id: "b2", name: "Shilpa Rao" }],
    album: {
      id: "bl8",
      name: "Laal Singh Chaddha",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b27389c943ab4b0a5bb84d7ada78", height: 640, width: 640 }],
      release_date: "2022-08-11",
    },
    duration_ms: 285000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1BVyJU6NkPZzFPJwQP7fLU" },
    youtube_url: "https://www.youtube.com/watch?v=E09cWRd6otc",
    popularity: 87,
    genre: "bollywood",
    mood: ["romantic", "calm"],
    language: "hindi",
  },
  {
    id: "bw-9",
    name: "Kabira",
    artists: [{ id: "b6", name: "Rekha Bhardwaj" }, { id: "b7", name: "Tochi Raina" }],
    album: {
      id: "bl9",
      name: "Yeh Jawaani Hai Deewani",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738468a28f3a0f1db41dbb7c25", height: 640, width: 640 }],
      release_date: "2013-05-31",
    },
    duration_ms: 237000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/5I5IxDh8K7xOyUMJAJaS1t" },
    youtube_url: "https://www.youtube.com/watch?v=jHNNMj5bNQw",
    popularity: 89,
    genre: "bollywood",
    mood: ["romantic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-10",
    name: "Dil Diyan Gallan",
    artists: [{ id: "b8", name: "Atif Aslam" }],
    album: {
      id: "bl10",
      name: "Tiger Zinda Hai",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2733f8f4a9a1e8b8b8b8b8b8b8b", height: 640, width: 640 }],
      release_date: "2017-12-22",
    },
    duration_ms: 277000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/3eX0NZfLtGzoLUxPNvRfqm" },
    youtube_url: "https://www.youtube.com/watch?v=SAcpESN_Fk4",
    popularity: 90,
    genre: "bollywood",
    mood: ["romantic", "calm"],
    language: "hindi",
  },
  {
    id: "bw-11",
    name: "Gerua",
    artists: [{ id: "b1", name: "Arijit Singh" }, { id: "b9", name: "Antara Mitra" }],
    album: {
      id: "bl11",
      name: "Dilwale",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273f40d5e3d8f89a48f5b8d6a32", height: 640, width: 640 }],
      release_date: "2015-12-18",
    },
    duration_ms: 306000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/6fKx0rOZmDSLvAEfSimlWK" },
    youtube_url: "https://www.youtube.com/watch?v=AEIVhBS6baE",
    popularity: 88,
    genre: "bollywood",
    mood: ["romantic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-12",
    name: "Badtameez Dil",
    artists: [{ id: "b10", name: "Benny Dayal" }],
    album: {
      id: "bl9",
      name: "Yeh Jawaani Hai Deewani",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738468a28f3a0f1db41dbb7c25", height: 640, width: 640 }],
      release_date: "2013-05-31",
    },
    duration_ms: 240000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0N3W5peJUQtI4eyR6GJT5O" },
    youtube_url: "https://www.youtube.com/watch?v=II2EO3Nw4m0",
    popularity: 89,
    genre: "bollywood",
    mood: ["party", "energetic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-13",
    name: "Kala Chashma",
    artists: [{ id: "b11", name: "Badshah" }, { id: "b12", name: "Neha Kakkar" }],
    album: {
      id: "bl12",
      name: "Baar Baar Dekho",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273c9c24f11c0a8c3b2b4b5b6b7", height: 640, width: 640 }],
      release_date: "2016-09-09",
    },
    duration_ms: 267000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/6pHNkB3xBDY5mYn3J3HLnP" },
    youtube_url: "https://www.youtube.com/watch?v=k4yXQkG2s1E",
    popularity: 91,
    genre: "bollywood",
    mood: ["party", "energetic"],
    language: "hindi",
  },
  {
    id: "bw-14",
    name: "Kar Gayi Chull",
    artists: [{ id: "b11", name: "Badshah" }, { id: "b12", name: "Neha Kakkar" }],
    album: {
      id: "bl13",
      name: "Kapoor & Sons",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273d9d8d8e8f8a8b8c8d8e8f8a8", height: 640, width: 640 }],
      release_date: "2016-03-18",
    },
    duration_ms: 195000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/4AFLA1iC4PVinHfM7XPVZA" },
    youtube_url: "https://www.youtube.com/watch?v=NTHz9ephYTw",
    popularity: 88,
    genre: "bollywood",
    mood: ["party", "energetic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-15",
    name: "Maan Meri Jaan",
    artists: [{ id: "b13", name: "King" }],
    album: {
      id: "bl14",
      name: "Champagne Talk",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a5a8f8b8c8d8e8f8a8b8c8d8", height: 640, width: 640 }],
      release_date: "2022-10-25",
    },
    duration_ms: 185000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7eQlD6cdGcTdN6Xp3G7X1y" },
    youtube_url: "https://www.youtube.com/watch?v=OAxr3n1g11M",
    popularity: 93,
    genre: "indie",
    mood: ["romantic", "calm", "happy"],
    language: "hindi",
  },
  {
    id: "bw-16",
    name: "O Rangrez",
    artists: [{ id: "b14", name: "Javed Bashir" }, { id: "b15", name: "Shreya Ghoshal" }],
    album: {
      id: "bl15",
      name: "Bhaag Milkha Bhaag",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273f1f1f2f3f4f5f6f7f8f9fafb", height: 640, width: 640 }],
      release_date: "2013-07-12",
    },
    duration_ms: 380000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/3KQ7Q6QlW2p8iW0N6I5o5y" },
    youtube_url: "https://www.youtube.com/watch?v=9NPkQMmBHHU",
    popularity: 86,
    genre: "bollywood",
    mood: ["romantic", "sad"],
    language: "hindi",
  },
  {
    id: "bw-17",
    name: "Agar Tum Saath Ho",
    artists: [{ id: "b1", name: "Arijit Singh" }, { id: "b16", name: "Alka Yagnik" }],
    album: {
      id: "bl16",
      name: "Tamasha",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e2e2e3e4e5e6e7e8e9eaebec", height: 640, width: 640 }],
      release_date: "2015-11-27",
    },
    duration_ms: 340000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/5sJGVMDTeuQkV1qVLUhFoN" },
    youtube_url: "https://www.youtube.com/watch?v=sK7riqg2mr4",
    popularity: 91,
    genre: "bollywood",
    mood: ["sad", "romantic"],
    language: "hindi",
  },
  {
    id: "bw-18",
    name: "Arijit Singh Mashup",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl17",
      name: "Best of Arijit Singh",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273c3c4c5c6c7c8c9cacbcccdce", height: 640, width: 640 }],
      release_date: "2020-01-01",
    },
    duration_ms: 480000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/1qA8k0SHkLqxCQN7Z2tKPV" },
    youtube_url: "https://www.youtube.com/watch?v=cYOB941gyXI",
    popularity: 88,
    genre: "bollywood",
    mood: ["romantic", "sad", "calm"],
    language: "hindi",
  },
  {
    id: "bw-19",
    name: "Tujhe Kitna Chahne Lage",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl18",
      name: "Kabir Singh",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273b4b5b6b7b8b9babbbcbdbebf", height: 640, width: 640 }],
      release_date: "2019-06-21",
    },
    duration_ms: 260000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/0YF8PfcGbsKg5LE3GYPKcN" },
    youtube_url: "https://www.youtube.com/watch?v=AtHZVufnvbQ",
    popularity: 92,
    genre: "bollywood",
    mood: ["romantic", "sad"],
    language: "hindi",
  },
  {
    id: "bw-20",
    name: "Lat Lag Gayee",
    artists: [{ id: "b17", name: "Busta Rhymes" }, { id: "b2", name: "Shilpa Rao" }],
    album: {
      id: "bl19",
      name: "Race 2",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273a6a7a8a9aaabacadaeafb0b1", height: 640, width: 640 }],
      release_date: "2013-01-25",
    },
    duration_ms: 245000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/5wANPM4fQCJwkGd4rN8dPw" },
    youtube_url: "https://www.youtube.com/watch?v=cNuR0Ir3YPQ",
    popularity: 85,
    genre: "bollywood",
    mood: ["party", "energetic"],
    language: "hindi",
  },
  {
    id: "bw-21",
    name: "Ilahi",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl9",
      name: "Yeh Jawaani Hai Deewani",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738468a28f3a0f1db41dbb7c25", height: 640, width: 640 }],
      release_date: "2013-05-31",
    },
    duration_ms: 221000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2z4DPJ5qrE2vQukNDQwL2v" },
    youtube_url: "https://www.youtube.com/watch?v=XvcmdwbfXvM",
    popularity: 87,
    genre: "bollywood",
    mood: ["happy", "energetic"],
    language: "hindi",
  },
  {
    id: "bw-22",
    name: "Pehla Nasha",
    artists: [{ id: "b18", name: "Udit Narayan" }, { id: "b19", name: "Sadhana Sargam" }],
    album: {
      id: "bl20",
      name: "Jo Jeeta Wohi Sikandar",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2739192939495969798999a9b9c", height: 640, width: 640 }],
      release_date: "1992-05-22",
    },
    duration_ms: 330000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/7dPzv4BTRvPsL4vQHPGD4A" },
    youtube_url: "https://www.youtube.com/watch?v=w6SLa4hR600",
    popularity: 89,
    genre: "bollywood",
    mood: ["romantic", "happy"],
    language: "hindi",
  },
  {
    id: "bw-23",
    name: "Tu Jhoothi Main Makkaar",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl21",
      name: "Tu Jhoothi Main Makkaar",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273d1d2d3d4d5d6d7d8d9dadbdc", height: 640, width: 640 }],
      release_date: "2023-03-08",
    },
    duration_ms: 250000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6" },
    youtube_url: "https://www.youtube.com/watch?v=HrY-J4YKWas",
    popularity: 88,
    genre: "bollywood",
    mood: ["happy", "romantic"],
    language: "hindi",
  },
  {
    id: "bw-24",
    name: "Senorita",
    artists: [{ id: "b20", name: "Farhan Akhtar" }],
    album: {
      id: "bl22",
      name: "Zindagi Na Milegi Dobara",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738283848586878889908182", height: 640, width: 640 }],
      release_date: "2011-07-15",
    },
    duration_ms: 244000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/2m3xFCbhhBCrPKuLl7LhBl" },
    youtube_url: "https://www.youtube.com/watch?v=6heaQCbqJjE",
    popularity: 86,
    genre: "bollywood",
    mood: ["party", "happy", "energetic"],
    language: "hindi",
  },
  {
    id: "bw-25",
    name: "Satranga",
    artists: [{ id: "b1", name: "Arijit Singh" }],
    album: {
      id: "bl23",
      name: "Animal",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e1e2e3e4e5e6e7e8e9e0e1e2", height: 640, width: 640 }],
      release_date: "2023-12-01",
    },
    duration_ms: 275000,
    preview_url: null,
    external_urls: { spotify: "https://open.spotify.com/track/6mWfFME9QL5elGkEXSANSL" },
    youtube_url: "https://www.youtube.com/watch?v=Cgo_jMqTxQE",
    popularity: 94,
    genre: "bollywood",
    mood: ["romantic", "sad"],
    language: "hindi",
  },
];

// Combined dataset
export const allSongs: Song[] = [...hollywoodSongs, ...bollywoodSongs];

// Get songs by mood
export function getSongsByMood(mood: string): Song[] {
  return allSongs.filter((song) => song.mood.includes(mood.toLowerCase()));
}

// Get songs by language
export function getSongsByLanguage(language: "english" | "hindi"): Song[] {
  return allSongs.filter((song) => song.language === language);
}

// Get songs by genre
export function getSongsByGenre(genre: string): Song[] {
  return allSongs.filter((song) => song.genre.toLowerCase() === genre.toLowerCase());
}

// Search songs
export function searchSongs(query: string): Song[] {
  const lowerQuery = query.toLowerCase();
  return allSongs.filter(
    (song) =>
      song.name.toLowerCase().includes(lowerQuery) ||
      song.artists.some((a) => a.name.toLowerCase().includes(lowerQuery)) ||
      song.album.name.toLowerCase().includes(lowerQuery) ||
      song.genre.toLowerCase().includes(lowerQuery) ||
      song.language.toLowerCase().includes(lowerQuery)
  );
}

const songFeatureIndex = allSongs.reduce<Record<string, number>>((index, song, idx) => {
  index[song.id] = idx;
  return index;
}, {});

const allMoods = Array.from(new Set(allSongs.flatMap((song) => song.mood.map((m) => m.toLowerCase()))));
const allVibes = Array.from(new Set(allSongs.flatMap((song) => deriveVibes(song.mood))));
const allGenres = Array.from(new Set(allSongs.map((song) => song.genre.toLowerCase())));
const allLanguages = Array.from(new Set(allSongs.map((song) => song.language.toLowerCase())));
const allArtists = Array.from(new Set(allSongs.flatMap((song) => song.artists.map((artist) => artist.name.toLowerCase()))));

const tempoValues = allSongs.map((song) => song.tempo ?? 100);
const popularityValues = allSongs.map((song) => song.popularity ?? 50);
const energyValues = allSongs.map((song) => song.energy ?? 0.5);
const minTempo = Math.min(...tempoValues);
const maxTempo = Math.max(...tempoValues);
const minPopularity = Math.min(...popularityValues);
const maxPopularity = Math.max(...popularityValues);
const minEnergy = Math.min(...energyValues);
const maxEnergy = Math.max(...energyValues);

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return (value - min) / (max - min);
}

function buildFeatureVector(song: Song): number[] {
  const moodSet = new Set(song.mood.map((m) => m.toLowerCase()));
  const vibeSet = new Set(deriveVibes(song.mood));
  const artistSet = new Set(song.artists.map((artist) => artist.name.toLowerCase()));

  const features: number[] = [];

  allMoods.forEach((mood) => {
    features.push(moodSet.has(mood) ? 1 : 0);
  });

  allVibes.forEach((vibe) => {
    features.push(vibeSet.has(vibe) ? 1 : 0);
  });

  allGenres.forEach((genre) => {
    features.push(song.genre.toLowerCase() === genre ? 1 : 0);
  });

  allLanguages.forEach((language) => {
    features.push(song.language.toLowerCase() === language ? 1 : 0);
  });

  allArtists.forEach((artist) => {
    features.push(artistSet.has(artist) ? 1 : 0);
  });

  features.push(normalize(song.tempo ?? 100, minTempo, maxTempo));
  features.push(normalize(song.popularity ?? 50, minPopularity, maxPopularity));
  features.push(normalize(song.energy ?? 0.5, minEnergy, maxEnergy));

  return features;
}

const songFeatureVectors = allSongs.map(buildFeatureVector);

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function getRecommendations(songIds: string[], limit: number = 10): Song[] {
  const selectedSongs = allSongs.filter((song) => songIds.includes(song.id));
  if (selectedSongs.length === 0) {
    return getTrendingSongs(limit);
  }

  const seedVectors = selectedSongs.map((song) => songFeatureVectors[songFeatureIndex[song.id]]);
  const averageSeedVector = seedVectors[0].map((_, idx) => {
    return seedVectors.reduce((sum, vector) => sum + vector[idx], 0) / seedVectors.length;
  });

  const scoredSongs = allSongs
    .filter((song) => !songIds.includes(song.id))
    .map((song) => {
      const similarity = cosineSimilarity(averageSeedVector, songFeatureVectors[songFeatureIndex[song.id]]);
      const artistBonus = selectedSongs.some((selected) =>
        song.artists.some((artist) =>
          selected.artists.some((selectedArtist) => selectedArtist.name.toLowerCase() === artist.name.toLowerCase())
        )
      )
        ? 0.08
        : 0;
      const genreBonus = selectedSongs.some((selected) => selected.genre === song.genre) ? 0.05 : 0;
      return {
        song,
        score: similarity + artistBonus + genreBonus + normalize(song.popularity ?? 50, minPopularity, maxPopularity) * 0.02,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scoredSongs.map((item) => item.song);
}

// Get trending songs (sorted by popularity)
export function getTrendingSongs(limit: number = 20): Song[] {
  return [...allSongs].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

// Get new releases (sorted by release date)
export function getNewReleases(limit: number = 20): Song[] {
  return [...allSongs]
    .sort((a, b) => new Date(b.album.release_date).getTime() - new Date(a.album.release_date).getTime())
    .slice(0, limit);
}

// Format duration helper
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
