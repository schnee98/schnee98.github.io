/**
 * Blog Page
 */

import { Header } from '@/widgets/header';
import { BlogCard } from '@/widgets/blog-list';
import { dataService } from '@/features/services/dataService';
import styles from './page.module.css';

export default async function BlogPage() {
  const blogPosts = await dataService.getBlogPosts();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <h2 className={`h2 ${styles.title}`}>Blog</h2>
          <div className={styles.grid}>
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

