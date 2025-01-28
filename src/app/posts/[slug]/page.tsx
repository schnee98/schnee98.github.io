import { getPost, getPosts } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent/PageContent";
import Navigation from "@/components/navigation/Navigation/Navigation";
import layoutStyles from "@/app/layout.module.css";
import Background from "@/components/header/Background/Background";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const posts = await getPosts();
  const post = getPost(posts, slug);

  if (!post) notFound();

  const { title, content } = post;

  return (
    <>
      <Navigation type="post" posts={posts} />
      <header className={layoutStyles.header}>
        <Background />
      </header>
      <main className={layoutStyles.main}>
        <h1>{title}</h1>
        <PageContent content={content} />
      </main>
    </>
  );
};

export default PostPage;
