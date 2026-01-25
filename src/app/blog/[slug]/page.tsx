import { getBlogList, getPostContent } from '@/features/blog/posts';
import { formatDate } from '@/shared/lib/formatDate';
import { MarkdownContent } from '@/widgets/blog-content';
import { BlogCard } from '@/widgets/blog-list';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postContent = getPostContent(slug);

  if (!postContent) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const { metadata } = postContent;

  return {
    title: `${metadata.title} - Schnee98`,
    description: metadata.description,
    keywords: metadata.tags,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.date.toISOString(),
      authors: ['Schnee98'],
      images: metadata.imageUrl
        ? [
            {
              url: metadata.imageUrl,
              width: 1200,
              height: 630,
              alt: metadata.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const postContent = getPostContent(slug);

  if (!postContent) {
    notFound();
  }

  const { metadata, content } = postContent;

  const allPosts = getBlogList('date-desc');
  const otherPosts = allPosts.filter(post => post.slug !== slug).slice(0, 3);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <article className={styles.content}>
          <header className={styles.header}>
            <h1 className={`h1 ${styles.title}`}>{metadata.title}</h1>
            <div className={styles.metadata}>
              <time dateTime={metadata.date.toISOString()}>
                {formatDate(metadata.date)}
              </time>
              {metadata.category && (
                <span className={styles.category}>{metadata.category}</span>
              )}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className={styles.tags}>
                  {metadata.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {metadata.imageUrl && (
            <div className={styles.imageWrapper}>
              <Image
                src={metadata.imageUrl}
                alt={metadata.title}
                width={800}
                height={400}
                className={styles.featuredImage}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          )}

          <MarkdownContent content={content} />
        </article>

        {otherPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <h2 className={`h2 ${styles.relatedTitle}`}>Related Posts</h2>
            <div className={styles.relatedGrid}>
              {otherPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getBlogList();

  return posts.map(post => ({
    slug: post.slug,
  }));
}
