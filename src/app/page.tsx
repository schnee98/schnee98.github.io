import Link from 'next/link';
import styles from './page.module.css';
import { blogPostsData, profileData, projectsData } from '@/shared/data/mockData';
import type { BlogListItem } from '@/types/blog';
import { Header } from '@/widgets/header';
import { SocialLinks } from '@/shared/ui/SocialLinks';
import { BlogCard } from '@/widgets/blog-list';

export default function HomePage() {
  // Selected work (first 4 items only)
  const selectedProjects = projectsData.slice(0, 4);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header />

        {/* Hero Section */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <h1 id="hero-title" className="h1">{profileData.title}</h1>
            <div>
            {profileData.description.map((text, index) => (
              <p key={text} className="paragraph">
                {text}
              </p>
            ))}
            </div>
          </div>
          <SocialLinks 
            linkedin={profileData.linkedin.address} 
            github={profileData.github.address} 
            aria-label="Social media links"
          />
        </section>

        {/* Recent Posts Section */}
        <section className={styles.section} aria-labelledby="recent-posts-title">
          <div className={styles.sectionHeader}>
            <h2 id="recent-posts-title" className={`h3 ${styles.sectionTitle}`}>Recent posts</h2>
            <Link 
              href="/blog" 
              className={styles.sectionLink}
              aria-label="View all blog posts"
            >
              See All Posts
            </Link>
          </div>
          <div className={styles.blogGrid} role="list" aria-label="Recent blog posts">
            {blogPostsData.map((post) => (
              <BlogCard key={post.slug} post={post as BlogListItem} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

