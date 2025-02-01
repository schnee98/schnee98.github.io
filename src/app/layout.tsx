import type { Metadata } from "next";
import "@/styles/globals.css";
import styles from "./layout.module.css";
import { Analytics } from "./analytics";
import { getPosts } from "@/utils/postUtils";

const potionStyles =
  "https://cdn.jsdelivr.net/gh/miloxeon/potion/potion.min.css";

export const metadata: Metadata = {
  title: "schnee98 (박주은, Schnee) 블로그",
  description: "주니어 프론트엔드 개발자 Schnee의 블로그입니다.",
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={potionStyles} />
        <Analytics />
      </head>
      <body className={styles.body}>{children}</body>
    </html>
  );
}
