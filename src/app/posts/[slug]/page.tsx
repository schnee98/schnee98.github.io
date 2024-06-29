import styles from "@/styles/page.module.css";
import Navigation from "../../../components/navigation/Navigation";
import { getPost } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent";

interface PostPageProps {
  params: { slug: string };
}

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const post = await getPost(slug);

  if (!post) notFound();

  const { title, content } = post;

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
