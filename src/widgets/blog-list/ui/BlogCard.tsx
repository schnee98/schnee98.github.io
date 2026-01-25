import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/entities/blog-post';
import { formatDate } from '@/shared/lib';
import { ExternalLinkIcon } from '@/shared/ui';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
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
          />
        )}
        <div className={styles.button}>
          <ExternalLinkIcon width={24} height={24} />
        </div>
      </div>
      <div className={styles.post}>
        <p className={styles.date}>{formatDate(post.date)}</p>
        <h4 className={styles.title}>{post.title}</h4>
      </div>
    </Link>
  );
};

