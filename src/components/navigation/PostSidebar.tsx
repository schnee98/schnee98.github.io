import { Post } from "@/constants";
import styles from "@/styles/navigation.module.css";

export default function PostSidebar({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className={styles.sidebarBlur}></div>
      <div className={styles.sidebar}>
        <button className={styles.sidebarCloseButton}>X</button>
        <h3 className={styles.sidebarTitle}>블로그 포스트 목록</h3>
        <hr className={styles.sidebarBreak} />
        <div className={styles.sidebarItem}>
          <a href={"/"}>전체 포스트 보기</a>
        </div>
        {posts.map(({ title, slug }, index) => (
          <div key={`post-items-${index}`} className={styles.sidebarItem}>
            <a href={`/posts/${slug}`}>{title}</a>
          </div>
        ))}
      </div>
    </>
  );
}
