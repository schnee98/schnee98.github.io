"use client";
import dateUtils from "@/utils/dateUtils";
import styles from "@/styles/post.module.css";
import { Post } from "@/constants";

const Post = ({ slug, title, date, description, thumbnail }: Post) => {
  const handlePostClick = () => (window.location.href = `/posts/${slug}`);

  return (
    <article key={slug} className={styles.post}>
      <img src={thumbnail} alt={`${title} 썸네일 이미지`} className={styles.thumbnail} onClick={handlePostClick} />
      <div>
        <h2 className={styles.postTitle} onClick={handlePostClick}>
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <time dateTime={date}>{dateUtils.parseDate(date)}</time>
    </article>
  );
};

export default Post;
