"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import rehypeHighlight from "rehype-highlight";

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

interface Props {
  mdxContent: MDXRemoteSerializeResult;
}

export default function RemoteMdxPage({ mdxContent }: Props) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
      ></link>
      <MDXRemote {...mdxContent} frontmatter={true} />
    </>
  );
}
