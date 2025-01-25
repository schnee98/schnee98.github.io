"use client";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/styles/post.module.css";
import { markdownComponents } from "./markdownComponents";
import { useFadeInContents } from "@/hooks/useFadeInContents";

const PageContent = ({ content }: { content: string }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  useFadeInContents(markdownRef);

  return (
    <article ref={markdownRef} className={styles.contents}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
export default PageContent;
