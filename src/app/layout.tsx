import type { Metadata } from "next";
import "@/styles/globals.css";
import styles from "@/styles/page.module.css";
import { Analytics } from "./analytics";

const potionStlyes = "https://cdn.jsdelivr.net/gh/miloxeon/potion/potion.min.css";

export const metadata: Metadata = {
  title: "schnee98 (박주은, Schnee) 블로그",
  description: "주니어 프론트엔드 개발자 Schnee의 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={potionStlyes} />
        <Analytics />
      </head>
      <body className={styles.body}>{children}</body>
    </html>
  );
}
