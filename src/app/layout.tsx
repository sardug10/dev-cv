import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Sans, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site";
import { SparkleBackdrop } from "@/components/sparkle-backdrop";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Sarthak Duggal",
    template: "%s · Sarthak Duggal",
  },
  description: "Full stack engineer — portfolio and writing.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sarthak Duggal",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SarthakDuggal",
  },
};

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, serif.variable, mono.variable)}
      suppressHydrationWarning
    >
      <body>
        <SparkleBackdrop />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 min-h-dvh">
            {children}
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
