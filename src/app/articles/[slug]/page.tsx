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

export async function generateStaticParams() {
  const articlesSlugs = RESUME_DATA.articles
    .map((article) => article.slug)
    .filter((slug) => slug != "");

  return articlesSlugs.map((articleSlug) => ({
    slug: articleSlug,
  }));
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
