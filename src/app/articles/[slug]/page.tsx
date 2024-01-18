import { RESUME_DATA } from "@/data/resume-data";
import RemoteMdxPage from "@/components/MarkdownRenderer";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

async function getArticleFileContent(articleId: string) {
  const url = `http://localhost:3000/assets/${articleId}`;
  return fetch(url, { cache: "no-store" })
    .then((res) => res.text())
    .then(async (text) => {
      const mdx = await serialize(text);
      return mdx;
    })
    .catch(async (e) => {
      console.log("error", e);
      return await serialize("");
    });
}

async function Article({ params: { slug } }: { params: { slug: string } }) {
  const article = RESUME_DATA.articles.find((item) => item.slug == slug);

  const articleMdx: MDXRemoteSerializeResult =
    await getArticleFileContent(slug);

  return (
    <div className="items-center p-2 text-left">
      <h1 className="text-2xl font-bold">{article?.title}</h1>
      <div className="mt-4">
        <RemoteMdxPage mdxContent={articleMdx} />
      </div>
    </div>
  );
}

export default Article;
