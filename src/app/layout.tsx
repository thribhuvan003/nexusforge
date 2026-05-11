import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusForge — Ideas That Evolve",
  description: "Drop any seed idea and watch Gemini birth it into a living organism with real DNA, autonomous evolution, and a 5-agent swarm that builds actual deliverables.",
  keywords: ["NexusForge", "Gemini", "idea evolution", "AI agents", "creative biosphere"],
  openGraph: {
    title: "NexusForge — Ideas That Evolve",
    description: "The first creative biosphere where ideas literally evolve.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-base">
        {children}
      </body>
    </html>
  );
}
