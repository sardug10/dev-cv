"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Articles({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <main
      className={cn(
        "relative mx-auto w-full max-w-layout scroll-my-12 px-4 pb-10 sm:px-6 md:px-10 md:pb-12 lg:px-14",
        "pt-[calc(3rem+env(safe-area-inset-top,0px)+1px)] print:px-8 print:pb-10 print:pt-0",
      )}
    >
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 pt-[env(safe-area-inset-top,0px)] shadow-sm backdrop-blur-sm",
          "print:static print:shadow-none print:backdrop-blur-none",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-12 max-w-layout items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-14",
            "print:px-0",
          )}
        >
          <div className="flex flex-wrap items-center gap-6 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] print:hidden">
            <button
              type="button"
              onClick={() => router.push("/")}
              className={cn(
                "rounded-sm bg-transparent p-0 font-sans text-[10px] font-semibold uppercase tracking-[0.2em]",
                "text-muted-foreground transition-colors duration-150",
                "hover:text-foreground hover:underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              ← Back
            </button>
            <Link
              href="/"
              className="text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline"
            >
              Home
            </Link>
            <a
              href="/#writing"
              className="text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline"
            >
              Writing
            </a>
          </div>
          <ThemeToggle className="relative size-8 shrink-0 print:hidden" />
        </div>
      </header>

      <section className="w-full space-y-8 bg-transparent print:space-y-6 md:space-y-10">
        <div>{children}</div>
        <SiteFooter />
      </section>
    </main>
  );
}
