"use client";

import styles from "@/styles/post.module.css";
import { useMemo, useState } from "react";
import PostSidebar from "./PostSidebar";
import { Post } from "@/constants";

export default function PostMenu({ posts }: { posts: Post[] }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const className = useMemo(() => {
    if (isInitialLoad) {
      return undefined;
    }
    return isClicked ? styles.rotateStartAnimation : styles.rotateEndAnimation;
  }, [isClicked, isInitialLoad]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsInitialLoad(false);
  };

  return (
    <div>
      <svg className={className} width="24" height="24" viewBox="0 0 18 18" onClick={handleClick}>
        <polyline
          fill="none"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 12, 16 12"
        ></polyline>
        <polyline
          fill="none"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 5, 16 5"
        ></polyline>
      </svg>
      {posts.length > 0 && isClicked && <PostSidebar posts={posts} handleClick={handleClick} />}
    </div>
  );
}
