"use client";

import Link from "next/link";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "April 2026";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-16 border-t border-border pt-10 pb-6 print:mt-8 print:pt-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="space-y-2">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground">
            Colophon
          </p>
          <p className="max-w-md font-serif text-sm leading-relaxed text-foreground">
            This site is a static résumé and writing archive. Typography is IBM Plex
            Sans, Source Serif 4, and JetBrains Mono. Built with Next.js.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-4 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:items-end md:text-right">
          <div className="space-y-1.5">
            <p className="text-foreground">{RESUME_DATA.name}</p>
            <p>Last updated · {LAST_UPDATED}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <Link
              className="border-b border-transparent transition-colors duration-150 hover:border-foreground hover:text-foreground"
              href={RESUME_DATA.portfolioRepoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source
            </Link>
            <Link
              className="border-b border-transparent transition-colors duration-150 hover:border-foreground hover:text-foreground"
              href={`mailto:${RESUME_DATA.contact.email}`}
            >
              Contact
            </Link>
            <span className="text-muted-foreground/80">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
