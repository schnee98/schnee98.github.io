"use client";

import styles from "@/styles/post.module.css";
import { useMemo, useState } from "react";
import PostSidebar from "./PostSidebar";
import { Post } from "@/constants";
import IconHorizontal from "@/assets/icon-horizontal.svg?react";

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
      <IconHorizontal
        width={24}
        height={24}
        className={className}
        onClick={handleClick}
      />
      {posts.length > 0 && isClicked && (
        <PostSidebar posts={posts} handleClick={handleClick} />
      )}
    </div>
  );
}
