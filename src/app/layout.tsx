import type { Metadata } from "next";
import "@/styles/globals.css";
import styles from "./layout.module.css";
import { Analytics } from "./analytics";
import Navigation from "@/components/navigation/Navigation/Navigation";
import { getPosts } from "@/utils/postUtils";
import Background from "@/components/header/Background/Background";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string | undefined }>;
}>) {
  const slug = await params;
  const posts = await getPosts();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={potionStyles} />
        <Analytics />
      </head>
      <body className={styles.body}>
        <Navigation type={slug != null ? "post" : "home"} posts={posts} />
        <header className={styles.header}>
          <Background />
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
