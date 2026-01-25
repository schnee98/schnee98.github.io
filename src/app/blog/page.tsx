import { Metadata } from 'next';
import type { BlogListItem } from '@/types/blog';
import { getBlogList } from '@/features/blog/posts';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { BlogCard } from '@/widgets/blog-list';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog - Schnee98',
  description: 'Frontend development blog posts about React, TypeScript, and web development',
  keywords: ['blog', 'frontend', 'development', 'react', 'typescript', 'web development'],
  openGraph: {
    title: 'Blog - Schnee98',
    description: 'Frontend development blog posts about React, TypeScript, and web development',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts: BlogListItem[] = getBlogList('date-desc');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <h1 className={`h1 ${styles.title}`}>Blog</h1>
          <p className={styles.description}>
            Frontend development thoughts, tutorials, and experiences
          </p>
          
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No blog posts found.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </main>
  );
}

