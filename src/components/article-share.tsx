"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArticleShare({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm p-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        "transition-colors duration-150 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={copied ? "Link copied" : "Share or copy link"}
    >
      {copied ? (
        <Check className="size-3.5 shrink-0 text-foreground" strokeWidth={2.25} />
      ) : (
        <Share2 className="size-3.5 shrink-0" strokeWidth={2.25} />
      )}
      <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
    </button>
  );
}
