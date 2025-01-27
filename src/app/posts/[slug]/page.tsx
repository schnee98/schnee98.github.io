import { getPost, getPosts } from "@/utils/postUtils";
import { notFound } from "next/navigation";
import PageContent from "@/components/post/PageContent/PageContent";
import RootLayout from "@/app/layout";

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
    <RootLayout params={params}>
      <h1>{title}</h1>
      <PageContent content={content} />
    </RootLayout>
  );
};

export default PostPage;
