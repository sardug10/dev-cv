"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/article-toc";

/** Viewport line (px from top): last heading with top ≤ this is the “current” section */
const ACTIVE_MARKER_PX = 80;

function pickActiveId(tocItems: TocItem[]): string {
  let current = tocItems[0]?.id ?? "";
  for (const item of tocItems) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const { top } = el.getBoundingClientRect();
    if (top <= ACTIVE_MARKER_PX) current = item.id;
  }
  return current;
}

export function ArticleSidebar({ tocItems }: { tocItems: TocItem[] }) {
  const [activeId, setActiveId] = useState(() => tocItems[0]?.id ?? "");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const compute = () => {
      const next = pickActiveId(tocItems);
      setActiveId((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    compute();
    requestAnimationFrame(() => {
      requestAnimationFrame(compute);
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [tocItems]);

  return (
    <aside
      className={cn(
        "hidden w-full min-w-0 max-w-[11rem] shrink-0 print:hidden lg:block xl:max-w-[13rem]",
      )}
    >
      <div
        className={cn(
          "sticky max-h-[calc(100vh-5.5rem)] space-y-8 overflow-y-auto overscroll-contain pb-10",
          "top-[calc(4.5rem+env(safe-area-inset-top,0px))]",
        )}
      >
        <Link
          href="/#writing"
          className={cn(
            "inline-flex font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
            "transition-colors duration-150 hover:text-foreground hover:underline",
            "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          ← Writing
        </Link>

        {tocItems.length > 0 ? (
          <nav className="space-y-3" aria-label="On this page">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
              Contents
            </p>
            <ul className="space-y-2 border-l border-border pl-3">
              {tocItems.map((item, idx) => {
                const isActive = item.id === activeId;
                return (
                  <li
                    key={`${item.id}-${idx}`}
                    className={cn(item.depth === 3 && "pl-1.5")}
                  >
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block py-0.5 font-sans text-[11px] leading-snug tracking-tight",
                        "transition-colors duration-150 hover:text-foreground",
                        "line-clamp-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive
                          ? "font-semibold text-foreground"
                          : "font-medium text-muted-foreground",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </aside>
  );
}
