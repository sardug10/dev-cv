import { cn } from "@/lib/utils";

const blobs: { l: string; t: string; s: "sm" | "md" | "lg" }[] = [
  { l: "4%", t: "8%", s: "md" },
  { l: "90%", t: "14%", s: "sm" },
  { l: "82%", t: "86%", s: "lg" },
  { l: "10%", t: "70%", s: "sm" },
];

const sizeMap = {
  sm: "h-36 w-36 md:h-40 md:w-40",
  md: "h-52 w-52 md:h-56 md:w-56",
  lg: "h-64 w-64 md:h-72 md:w-72",
};

const stars: { l: string; t: string }[] = [
  { l: "12%", t: "22%" },
  { l: "28%", t: "8%" },
  { l: "55%", t: "18%" },
  { l: "72%", t: "12%" },
  { l: "8%", t: "48%" },
  { l: "92%", t: "38%" },
  { l: "38%", t: "62%" },
  { l: "88%", t: "58%" },
  { l: "18%", t: "88%" },
  { l: "64%", t: "92%" },
  { l: "48%", t: "45%" },
  { l: "32%", t: "35%" },
];

/**
 * Sits at z-index 1 under `layout`’s `z-10` shell. Page sections use `bg-transparent`
 * so this layer stays visible; cards/headers keep their own solid backgrounds.
 */
export function SparkleBackdrop() {
  return (
    <div
      className="sparkle-backdrop pointer-events-none fixed inset-0 z-[1] overflow-hidden print:hidden"
      aria-hidden
    >
      {blobs.map(({ l, t, s }, i) => (
        <div
          key={`blob-${i}`}
          className={cn(
            "absolute rounded-full",
            "motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2",
            "bg-violet-300/25 dark:bg-violet-400/30",
            "opacity-90 blur-[56px] md:blur-[80px] md:dark:blur-[100px]",
            "motion-reduce:animate-none motion-safe:animate-sparkle-drift",
            sizeMap[s],
          )}
          style={{
            left: l,
            top: t,
            animationDelay: `${-i * 9}s`,
            animationDuration: `${44 + i * 6}s`,
          }}
        />
      ))}
      {stars.map(({ l, t }, i) => (
        <div
          key={`star-${i}`}
          className={cn(
            "absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "bg-violet-500/80 shadow-[0_0_8px_2px] shadow-violet-400/45",
            "dark:bg-violet-200/90 dark:shadow-violet-200/40",
            "motion-reduce:opacity-30 motion-reduce:shadow-none",
            "motion-reduce:animate-none motion-safe:animate-sparkle-twinkle",
          )}
          style={{
            left: l,
            top: t,
            animationDelay: `${-i * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}
