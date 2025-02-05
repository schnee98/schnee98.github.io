import { Children } from "react";
import { ReactNode } from "react";
import { Components } from "react-markdown";
import PrismLight from "./PrismLight";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export const markdownComponents: Components = {
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
  h4: ({ node, ...props }) => (
    <Header level={4} {...props}>
      {props.children}
    </Header>
  ),
  h5: ({ node, ...props }) => (
    <Header level={5} {...props}>
      {props.children}
    </Header>
  ),
  h6: ({ node, ...props }) => (
    <Header level={6} {...props}>
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
};
