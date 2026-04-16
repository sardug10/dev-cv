/** Rough reading time for markdown: strips fenced + inline code so code-heavy posts don’t skew too high. */
export function getReadingMinutes(
  markdown: string,
  wordsPerMinute = 200,
): number {
  const withoutFenced = markdown.replace(/```[\s\S]*?```/g, " ");
  const withoutInline = withoutFenced.replace(/`[^`]+`/g, " ");
  const words = withoutInline
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
