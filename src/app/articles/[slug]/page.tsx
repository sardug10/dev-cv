import { MDXRemote } from "next-mdx-remote/rsc";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import { readFile } from "fs/promises";
import overnight from "overnight/themes/Overnight-Slumber.json";
import matter from "gray-matter";
import "./markdown.css";
import githubLight from "shiki-themes/data/github-light.json";

export default async function Article({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const filename = "./public/assets/" + slug + "/index.md";
  const file = await readFile(filename, "utf8");
  // let postComponents = {};
  // try {
  //   postComponents = await import("./public/" + slug + "/components.js");
  // } catch (e) {
  //   if (!e) {
  //     throw e;
  //   }
  // }
  const { content, data } = matter(file);
  return (
    <article>
      <h1 className="text-[40px] font-semibold leading-[57.5px]">
        {data.title}
      </h1>
      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        {new Date(data.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="markdown mt-7">
        <MDXRemote
          source={content}
          // components={{
          //   a: Link,
          //   ...postComponents,
          // }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [remarkSmartpants as any],
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
  );
}