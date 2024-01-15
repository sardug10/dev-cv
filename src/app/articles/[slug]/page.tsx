"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RESUME_DATA } from "@/data/resume-data";

function Article() {
  const pathName = usePathname();
  const slugArr = pathName.split("/");
  const slug = slugArr[slugArr.length - 1];

  const article = RESUME_DATA.articles.find((item) => item.slug == slug);

  return (
    <div className="items-center p-2 text-center">
      <h1 className="text-2xl font-bold">{article?.title}</h1>
    </div>
  );
}

export default Article;
