"use client";
import { Children, ReactNode, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styles from "@/styles/post.module.css";

const customStyle = {
  ...materialOceanic,
  'pre[class*="language-"]': {
    ...materialOceanic['pre[class*="language-"]'],
    width: "100%",
  },
};

const Header = ({
  level,
  children,
}: {
  level: number;
  children: ReactNode;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const id = Children.toArray(children)
    .join("")
    .replace(/\s+/g, "-")
    .toLowerCase();
  return <Tag id={id}>{children}</Tag>;
};

const PageContent = ({ content }: { content: string }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.opacity = "1";
            return;
          }

          element.style.opacity = "0";
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    if (markdownRef.current) {
      const allElements = markdownRef.current.querySelectorAll(":not(pre)");
      const elements = [...allElements].filter(
        (element) => !element.closest("pre"),
      );
      elements.forEach((element) => observer.observe(element));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article ref={markdownRef} className={styles.contents}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <Header level={1} {...props}>
              {props.children}
            </Header>
          ),
          h2: ({ node, ...props }) => (
            <Header level={2} {...props}>
              {props.children}
            </Header>
          ),
          h3: ({ node, ...props }) => (
            <Header level={3} {...props}>
              {props.children}
            </Header>
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <PrismLight style={customStyle} language={match[1]} PreTag="div">
                {String(children).replace(/\n$/, "")}
              </PrismLight>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
export default PageContent;
