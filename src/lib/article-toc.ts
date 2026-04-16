import Slugger from "github-slugger";

export type TocItem = { depth: 2 | 3; text: string; id: string };

/** Strip fenced code so `##` inside blocks does not become TOC entries */
function stripFencedBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, "\n");
}

function stripInlineMarks(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/**
 * Extract h2/h3 from raw markdown. Slugs must match `rehype-slug` (github-slugger).
 */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const body = stripFencedBlocks(markdown);
  const slugger = new Slugger();
  const items: TocItem[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;

    const depth = m[1].length;
    if (depth !== 2 && depth !== 3) continue;

    let raw = m[2].replace(/\s+#+\s*$/, "").trim();
    raw = stripInlineMarks(raw);
    if (!raw) continue;

    const id = slugger.slug(raw);
    items.push({ depth: depth as 2 | 3, text: raw, id });
  }

  return items;
}
