import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import materialLighter from "shiki-themes/data/material-theme-lighter.json";
import materialPalenight from "shiki-themes/data/material-theme-palenight.json";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESUME_DATA } from "@/data/resume-data";
import { ArticleShare } from "@/components/article-share";
import { ArticleSidebar } from "@/components/article-sidebar";
import { MdxCodeBlockEnhancer } from "@/components/mdx-code-block-enhancer";
import { Badge } from "@/components/ui/badge";
import { getReadingMinutes } from "@/lib/reading-time";
import { cn } from "@/lib/utils";
import {
  loadArticleMarkdown,
  resolveArticleDescription,
} from "@/lib/article-markdown";
import { extractTocFromMarkdown } from "@/lib/article-toc";
import { absoluteFromSite } from "@/lib/site";
import "./markdown.css";

export async function generateStaticParams() {
  const articlesSlugs = RESUME_DATA.articles
    .map((article) => article.slug)
    .filter((slug) => slug != "");

  return articlesSlugs.map((articleSlug) => ({
    slug: articleSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let content: string;
  let data: Awaited<ReturnType<typeof loadArticleMarkdown>>["data"];
  try {
    const article = await loadArticleMarkdown(params.slug);
    content = article.content;
    data = article.data;
  } catch {
    notFound();
  }

  const description = resolveArticleDescription(params.slug, content, data);
  const published = data.date ? new Date(data.date) : undefined;
  const hasValidDate = published && !Number.isNaN(published.getTime());
  const socialPath = data.ogImage?.trim() || data.cover?.trim();
  const articleUrl = absoluteFromSite(`/articles/${params.slug}`);
  const ogImageUrl = socialPath ? absoluteFromSite(socialPath) : undefined;

  return {
    title: data.title,
    description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: data.title,
      description,
      type: "article",
      url: articleUrl,
      publishedTime: hasValidDate ? published!.toISOString() : undefined,
      authors: [RESUME_DATA.name],
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                alt: data.coverAlt?.trim() || data.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      title: data.title,
      description,
      card: "summary_large_image",
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export default async function Article({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let content: string;
  let data: Awaited<ReturnType<typeof loadArticleMarkdown>>["data"];
  try {
    const article = await loadArticleMarkdown(slug);
    content = article.content;
    data = article.data;
  } catch {
    notFound();
  }

  const readMinutes = getReadingMinutes(content);
  const published = data.date ? new Date(data.date) : new Date();
  const hasValidDate = !Number.isNaN(published.getTime());
  const dateIso = hasValidDate ? published.toISOString().slice(0, 10) : "";
  const dateMeta = hasValidDate
    ? published
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : "";

  const tocItems = extractTocFromMarkdown(content);
  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  return (
    <>
      <article className="pb-12">
        <div
          className={cn(
            "lg:grid lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:gap-x-10",
            "xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] xl:gap-x-12",
            "print:block",
          )}
        >
          <ArticleSidebar tocItems={tocItems} />

          <div className="min-w-0">
            <header
              className={cn(
                "mx-auto w-full max-w-[min(100%,65ch)] border-b border-border/80 pb-8",
                "md:pb-10",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                  {hasValidDate ? (
                    <time dateTime={dateIso}>{dateMeta}</time>
                  ) : (
                    <span className="normal-case tracking-normal">Draft</span>
                  )}
                  <span className="select-none text-border" aria-hidden>
                    ·
                  </span>
                  <span>{readMinutes} min read</span>
                </div>
                <ArticleShare />
              </div>

              <h1 className="mt-5 font-serif text-2xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[1.85rem] md:mt-6 md:text-[2.1rem] md:leading-[1.1]">
                {data.title}
              </h1>

              {tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border/80 bg-muted/30 font-sans text-[9px] font-medium normal-case tracking-normal text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              {data.cover ? (
                <div
                  className={cn(
                    "relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-xl border border-border/80 bg-muted shadow-sm",
                    "md:mt-10",
                  )}
                >
                  <Image
                    src={data.cover}
                    alt={data.coverAlt?.trim() || data.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, min(65ch, 100vw)"
                    className="object-cover"
                    unoptimized={!/^https?:\/\//i.test(data.cover)}
                  />
                </div>
              ) : null}
            </header>

            <div className="markdown article-markdown mx-auto mt-10 w-full md:mt-12">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    useDynamicImport: true,
                    remarkPlugins: [remarkSmartpants as any, remarkBreaks as any],
                    rehypePlugins: [
                      [
                        rehypePrettyCode as any,
                        {
                          theme: {
                            light: materialLighter,
                            dark: materialPalenight,
                          },
                          keepBackground: false,
                          defaultLang: "plaintext",
                        },
                      ],
                      rehypeSlug as any,
                    ],
                  },
                }}
              />
              <MdxCodeBlockEnhancer />
              <hr className="article-end-rule" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
