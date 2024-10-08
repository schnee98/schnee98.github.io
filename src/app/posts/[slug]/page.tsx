import styles from "@/styles/page.module.css";
import Navigation from "../../../components/navigation/Navigation";
import { getPost, getPosts } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent";
import Background from "@/components/header/Background";

interface PostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

const PostPage = async ({ params: { slug } }: PostPageProps) => {
  const posts = await getPosts();
  const post = await getPost(slug);

  if (!post) notFound();

  const { title, content } = post;

  return (
    <>
      <Navigation type="post" posts={posts} />
      <header className={styles.header}>
        <Background />
      </header>
      <main className={styles.main}>
        <h1>{title}</h1>
        <PageContent content={content} />
      </main>
    </>
  );
};

export default PostPage;
