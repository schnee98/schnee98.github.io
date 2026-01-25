import Link from 'next/link';
import Image from 'next/image';
import type { BlogListItem } from '@/types/blog';
import { formatDate } from '@/shared/lib/formatDate';
import { ExternalLinkIcon } from '@/shared/ui/Icons';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogListItem;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            style={{ objectFit: 'contain' }}
          />
        )}
        <div className={styles.button}>
          <ExternalLinkIcon width={24} height={24} />
        </div>
      </div>
      <div className={styles.post}>
        <p className={styles.date}>{formatDate(post.date)}</p>
        <h4 className={styles.title}>{post.title}</h4>
        {post.description && (
          <p className={styles.description}>{post.description}</p>
        )}
        {post.category && (
          <span className={styles.category}>{post.category}</span>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
