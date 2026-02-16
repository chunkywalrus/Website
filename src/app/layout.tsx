import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krish Gupta",
  description: "Personal website of Krish Gupta",
};

import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import { InteractionProvider } from "@/context/InteractionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${caveat.variable} antialiased`}>
      <body>
        <InteractionProvider>
          <Cursor />
          <Navbar />
          {children}
        </InteractionProvider>
      </body>
    </html>
  );
}
