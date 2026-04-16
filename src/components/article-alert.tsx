"use client";

import { useState, useEffect } from "react";

export default function ArticleAlert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed left-1/2 top-24 z-50 mx-4 w-full max-w-2xl -translate-x-1/2 transform md:top-20">
      <div className="border border-border bg-muted p-4 shadow-none">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-serif text-xs leading-relaxed text-foreground">
              Some formatting in code blocks or nested lists may look off in this
              MDX setup. Prefer light mode for the closest match to the intended
              layout.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="shrink-0 border border-transparent px-2 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:border-border hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
