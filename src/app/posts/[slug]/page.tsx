import styles from "@/styles/page.module.css";
import Navigation from "../../../components/navigation/Navigation/Navigation";
import { getPost, getPosts } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent/PageContent";
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
      <h1>{title}</h1>
      <PageContent content={content} />
    </>
  );
};

export default PostPage;
