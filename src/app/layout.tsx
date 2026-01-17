import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Sarthak Duggal - Full Stack Developer",
    template: "%s | Sarthak Duggal",
  },
  description: "Full Stack Developer crafting high-impact products with keen attention to detail. Experienced in building scalable web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sarthik-dev.vercel.app",
    siteName: "Sarthak Duggal",
    title: "Sarthak Duggal - Full Stack Developer",
    description: "Full Stack Developer crafting high-impact products with keen attention to detail.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/52778617?v=4",
        width: 1200,
        height: 630,
        alt: "Sarthak Duggal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak Duggal - Full Stack Developer",
    description: "Full Stack Developer crafting high-impact products with keen attention to detail.",
    creator: "@SarthakDuggal",
    images: ["https://avatars.githubusercontent.com/u/52778617?v=4"],
  },
  metadataBase: new URL("https://sarthik-dev.vercel.app"),
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </head>
      <body>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
