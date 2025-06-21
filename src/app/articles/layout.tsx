"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Articles({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-8 md:p-12">
      <ThemeToggle className="fixed top-4 right-4 z-50 print:hidden" />
      <section className="mx-auto w-full max-w-4xl space-y-8 bg-background print:space-y-6">
        <ChevronLeftCircle
          className="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
          onClick={() => router.push("/")}
        />
        <div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
