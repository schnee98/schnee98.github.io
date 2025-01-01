import { Post } from "@/constants";
import styles from "@/styles/navigation.module.css";
import Link from "next/link";

interface PostSidebarProps {
  posts: Post[];
  handleClick: () => void;
}

export default function PostSidebar({ posts, handleClick }: PostSidebarProps) {
  return (
    <>
      <div className={styles.sidebarBlur} onClick={handleClick}></div>
      <div className={styles.sidebar}>
        <button className={styles.sidebarCloseButton} onClick={handleClick}>
          X
        </button>
        <h3 className={styles.sidebarTitle}>블로그 포스트 목록</h3>
        <hr className={styles.sidebarBreak} />
        <div className={styles.sidebarItem}>
          <Link href={"/"}>전체 포스트 보기</Link>
        </div>
        {posts.map(({ title, slug }, index) => (
          <div key={`post-items-${index}`} className={styles.sidebarItem}>
            <Link href={`/posts/${slug}`} onClick={handleClick}>
              {title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
