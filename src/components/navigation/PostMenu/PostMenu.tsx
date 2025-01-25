"use client";

import PostSidebar from "../PostSidebar/PostSidebar";
import { Post } from "@/constants";
import PostIcon from "@/assets/post-icon.svg";
import { useRotation } from "@/hooks/useRotation";

export default function PostMenu({ posts }: { posts: Post[] }) {
  const { clicked, onClick, className } = useRotation();

  return (
    <div>
      <PostIcon className={className} onClick={onClick} />
      {posts.length > 0 && clicked && (
        <PostSidebar posts={posts} onClick={onClick} />
      )}
    </div>
  );
}
