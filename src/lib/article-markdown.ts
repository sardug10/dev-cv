import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { RESUME_DATA } from "@/data/resume-data";

export type ArticleFrontmatter = {
  title: string;
  date?: string;
  /** Short summary for OG / Twitter and search snippets */
  description?: string;
  /** Alias for `description` */
  excerpt?: string;
  /** Hero shown on the article page; also used as social image unless `ogImage` is set */
  cover?: string;
  coverAlt?: string;
  /** Social preview only (path from site root, e.g. `/assets/.../share.png`) */
  ogImage?: string;
  /** Small labels under the title (e.g. `["Rust", "Systems"]`) */
  tags?: string[];
};

export function articleMarkdownPath(slug: string): string {
  return path.join(process.cwd(), "public", "assets", slug, "index.md");
}

export async function loadArticleMarkdown(slug: string) {
  const filename = articleMarkdownPath(slug);
  const file = await readFile(filename, "utf8");
  const { content, data } = matter(file);
  return {
    content,
    data: data as ArticleFrontmatter,
  };
}

export function getResumeArticleDescription(slug: string): string | undefined {
  const entry = RESUME_DATA.articles.find((a) => a.slug === slug);
  return entry?.description;
}

/** Plain-text-ish excerpt for meta description when frontmatter is missing */
export function excerptFromMarkdown(markdown: string, maxLen = 165): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const trimmed = (lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim();
  return `${trimmed}…`;
}

export function resolveArticleDescription(
  slug: string,
  content: string,
  data: ArticleFrontmatter,
): string {
  const fromMatter = data.description?.trim() || data.excerpt?.trim();
  if (fromMatter) return fromMatter;

  const fromResume = getResumeArticleDescription(slug)?.trim();
  if (fromResume) return fromResume;

  return excerptFromMarkdown(content);
}
