import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import { readFile } from "fs/promises";
import overnight from "overnight/themes/Overnight-Slumber.json";
import matter from "gray-matter";
import "./markdown.css";
import githubLight from "shiki-themes/data/github-light.json";
import remarkBreaks from "remark-breaks";
import path from "path";
import { RESUME_DATA } from "@/data/resume-data";
import ArticleAlert from "@/components/article-alert";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const articlesSlugs = RESUME_DATA.articles
    .map((article) => article.slug)
    .filter((slug) => slug != "");

  return articlesSlugs.map((articleSlug) => ({
    slug: articleSlug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const filename = path.join(
      process.cwd(),
      "public",
      "assets",
      slug,
      "index.md",
    );
    const file = await readFile(filename, "utf8");
    const { data } = matter(file);

    // Find the article in RESUME_DATA to get additional info
    const article = RESUME_DATA.articles.find((a) => a.slug === slug);
    
    const title = data.title || article?.title || "Article";
    const description = data.description || article?.description || "Read this article on my blog";
    const url = `https://sarthik-dev.vercel.app/articles/${slug}`;
    
    return {
      title: title,
      description: description,
      authors: [{ name: RESUME_DATA.name }],
      openGraph: {
        title: title,
        description: description,
        url: url,
        siteName: `${RESUME_DATA.name}'s Blog`,
        type: "article",
        publishedTime: data.date,
        authors: [RESUME_DATA.name],
        images: [
          {
            url: data.image || RESUME_DATA.avatarUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        creator: "@SarthakDuggal",
        images: [data.image || RESUME_DATA.avatarUrl],
      },
    };
  } catch (error) {
    return {
      title: "Article",
      description: "Read this article",
    };
  }
}

export default async function Article({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const filename = path.join(
    process.cwd(),
    "public",
    "assets",
    slug,
    "index.md",
  );
  const file = await readFile(filename, "utf8");
  const { content, data } = matter(file);
  return (
    <>
      <ArticleAlert />
      <article>
        <h1 className="text-[40px] font-semibold leading-[57.5px]">
          {data.title}
        </h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {new Date(data.date).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="markdown mt-7">
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
                      theme: githubLight,
                    },
                  ],
                ],
              },
            }}
          />
          <hr />
        </div>
      </article>
    </>
  );
}
