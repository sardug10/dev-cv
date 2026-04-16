"use client";

import { useEffect } from "react";

const COPY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

function getCodeText(pre: Element): string {
  const code = pre.querySelector("code");
  if (code) return (code as HTMLElement).innerText;
  return (pre as HTMLElement).innerText;
}

export function MdxCodeBlockEnhancer() {
  useEffect(() => {
    const root = document.querySelector(
      ".markdown.article-markdown",
    ) as HTMLElement | null;
    if (!root) return;

    const figures = root.querySelectorAll("figure[data-rehype-pretty-code-figure]");
    figures.forEach((figure) => {
      if (figure.querySelector(":scope > .code-block-toolbar")) return;
      const pre = figure.querySelector(":scope > pre");
      if (!pre) return;

      const lang = (pre.getAttribute("data-language") || "text").toLowerCase();

      const toolbar = document.createElement("div");
      toolbar.className = "code-block-toolbar";
      toolbar.setAttribute("data-language", lang);

      const label = document.createElement("span");
      label.className = "code-block-lang";
      label.textContent = lang;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-block-copy";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `${COPY_SVG}<span class="code-block-copy-label">Copy</span>`;

      toolbar.append(label, btn);
      figure.insertBefore(toolbar, figure.firstChild);
    });

    const onClick = async (e: Event) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.(".code-block-copy") as HTMLButtonElement | null;
      if (!btn || !root.contains(btn)) return;
      const figure = btn.closest("figure");
      const pre = figure?.querySelector("pre");
      if (!pre) return;

      const text = getCodeText(pre);
      try {
        await navigator.clipboard.writeText(text);
        const labelEl = btn.querySelector(".code-block-copy-label");
        const prev = labelEl?.textContent;
        if (labelEl) labelEl.textContent = "Copied!";
        btn.classList.add("code-block-copy--done");
        window.setTimeout(() => {
          if (labelEl && prev) labelEl.textContent = prev;
          btn.classList.remove("code-block-copy--done");
        }, 2000);
      } catch {
        const labelEl = btn.querySelector(".code-block-copy-label");
        if (labelEl) labelEl.textContent = "Failed";
        window.setTimeout(() => {
          if (labelEl) labelEl.textContent = "Copy";
        }, 2000);
      }
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
      root.querySelectorAll(".code-block-toolbar").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
