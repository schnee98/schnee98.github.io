"use client";

import styles from "@/styles/post.module.css";
import { useMemo, useState } from "react";
import PostSidebar from "./PostSidebar";
import { Post } from "@/constants";
import PostIcon from "@/assets/post-icon.svg";

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
      <PostIcon className={className} onClick={handleClick} />
      {posts.length > 0 && isClicked && (
        <PostSidebar posts={posts} handleClick={handleClick} />
      )}
    </div>
  );
}
