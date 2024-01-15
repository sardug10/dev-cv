"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftCircle } from "lucide-react";

export default function Articles({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-8 md:p-12">
      <section className="mx-auto w-full max-w-4xl space-y-8 bg-white print:space-y-6">
        <ChevronLeftCircle
          className="size-8 cursor-pointer text-gray-500 hover:text-gray-600"
          onClick={() => router.push("/")}
        />
        <div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
