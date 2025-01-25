"use client";
import styles from "./PostDescription.module.css";
import { Post } from "@/constants";
import { parseDate } from "@/utils/dateUtils";
import Image from "next/image";
import Link from "next/link";

const PostDescription = ({
  slug,
  title,
  date,
  description,
  thumbnail,
}: Post) => {
  return (
    <article key={slug} className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <Image
          src={thumbnail}
          width={350}
          height={350}
          alt={`${title} 썸네일 이미지`}
          className={styles.thumbnail}
        />
      </Link>
      <div>
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p>{description}</p>
      </div>
      <time dateTime={date}>{parseDate(date)}</time>
    </article>
  );
};

export default PostDescription;
