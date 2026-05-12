import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "SoundSage - AI Music Recommendations",
  description:
    "Discover your next favorite song with our AI-powered music recommendation system. Search, explore moods, and find personalized music suggestions powered by Spotify.",
  keywords: [
    "music recommendations",
    "AI music",
    "Spotify",
    "song discovery",
    "playlist",
    "mood music",
  ],
  authors: [{ name: "SoundSage" }],
  openGraph: {
    title: "SoundSage - AI Music Recommendations",
    description: "Discover your next favorite song with AI-powered recommendations",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1db954",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
