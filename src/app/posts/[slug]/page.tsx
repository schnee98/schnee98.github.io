import styles from "@/styles/page.module.css";
import Navigation from "../../../components/navigation/Navigation";
import { Post } from "@/constants";
import { getPosts } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent";

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(({ slug: postSlug }) => postSlug === slug);
}

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const post = await getPost(slug);
  const { title, content } = post;

  if (!post) notFound();

  return (
    <>
      <Navigation />
      <header className={styles.header}>
        <div className={styles.background}></div>
        <h1>{title}</h1>
      </header>
      <main className={styles.main}>
        <PageContent content={content} />
      </main>
    </>
  );
};

export default PostPage;
