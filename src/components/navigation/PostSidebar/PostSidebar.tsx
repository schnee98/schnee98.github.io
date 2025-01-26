import { Post } from "@/constants";
import styles from "./PostSidebar.module.css";

interface PostSidebarProps {
  posts: Post[];
  onClick: () => void;
}

export default function PostSidebar({ posts, onClick }: PostSidebarProps) {
  return (
    <>
      <div className={styles.blur} onClick={onClick}></div>
      <div className={styles.sidebar}>
        <button className={styles.button} onClick={onClick}>
          X
        </button>
        <h3 className={styles.title}>블로그 포스트 목록</h3>
        <hr className={styles.break} />
        <div className={styles.item}>
          <a href={"/"}>전체 포스트 보기</a>
        </div>
        {posts.map(({ title, slug }) => (
          <div key={`${title}`} className={styles.item}>
            <a href={`/posts/${slug}`}>{title}</a>
          </div>
        ))}
      </div>
    </>
  );
}
