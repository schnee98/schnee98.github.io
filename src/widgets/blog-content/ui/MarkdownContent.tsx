'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Markdown, { Components } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { useIntersectContents } from '../hook/useFadeInContents';
import styles from './MarkdownContent.module.css';

export function MarkdownContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useIntersectContents({
    ref,
    onEnter: element => {
      element.classList.add(styles.contentEnter!);
      element.classList.remove(styles.contentLeave!);
    },
    onLeave: element => {
      element.classList.remove(styles.contentEnter!);
      element.classList.add(styles.contentLeave!);
    },
  });

  return (
    <div className={styles.contentBody} ref={ref}>
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </Markdown>
    </div>
  );
}

const markdownComponents: Components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img({ src, alt, ...props }) {
    return (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className={styles.postImage}
        {...props}
      />
    );
  },
  a({ href, children, ...props }) {
    return (
      <Link
        href={href || ''}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
};
