import type { Metadata } from "next";
import { Inter, Outfit, Poppins, Roboto, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniket Mishra | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building digital experiences that matter.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Web Developer", "Portfolio"],
  authors: [{ name: "Aniket Mishra" }],
  openGraph: {
    title: "Aniket Mishra | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Mishra | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${poppins.variable} ${roboto.variable} ${spaceGrotesk.variable} ${playfair.variable} antialiased bg-[var(--background)] text-[var(--foreground)] noise-overlay`}
      >
        <DataProvider>
          <ParticleBackground />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
