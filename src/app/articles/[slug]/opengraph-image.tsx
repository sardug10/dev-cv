import { ImageResponse } from "next/og";
import { loadArticleMarkdown } from "@/lib/article-markdown";
import { getSiteUrl } from "@/lib/site";
import { RESUME_DATA } from "@/data/resume-data";

export const runtime = "nodejs";
export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  let title = "Article";
  let subtitle = RESUME_DATA.name;

  try {
    const { data } = await loadArticleMarkdown(params.slug);
    if (data.title) title = data.title;
  } catch {
    // keep defaults
  }

  const site = getSiteUrl().replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafafa",
          color: "#121212",
          border: "1px solid #e0e0e0",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            fontWeight: 700,
            color: "#5c5c5c",
          }}
        >
          Writing
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: title.length > 70 ? 44 : 52,
              lineHeight: 1.12,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            fontWeight: 600,
            color: "#5c5c5c",
          }}
        >
          <span>{subtitle}</span>
          <span style={{ letterSpacing: "0.08em" }}>{site}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
