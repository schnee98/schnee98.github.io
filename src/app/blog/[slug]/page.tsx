
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPostsData } from '@/shared';
import { formatDate } from '@/shared/lib';
import styles from './page.module.css';
import { Header } from '@/widgets/header';
import { BlogCard } from '@/widgets/blog-list';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // 다른 포스트 (현재 포스트 제외)
  const otherPosts = blogPostsData.filter((p) => p.slug !== slug);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.title}>
            <h2 className="h2">{post.title}</h2>
            <p className={styles.metadata}>{formatDate(post.date)}</p>
          </div>

          {post.imageUrl && (
            <div className={styles.imageWrapper}>
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="640px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {post.content && (
            <div className="paragraph">{post.content}</div>
          )}
        </div>

        {otherPosts.length > 0 && (
          <div className={styles.content}>
            <div className={styles.otherPosts}>
              <h3 className="h3">Other posts</h3>
              <div className={styles.otherPostsGrid}>
                {otherPosts.map((otherPost) => (
                  <BlogCard key={otherPost.slug} post={otherPost} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

