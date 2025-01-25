"use client";
import styles from "./Navigation.module.css";
import Image from "next/image";
import ContentMenu from "../ContentMenu/ContentMenu";
import PostMenu from "../PostMenu/PostMenu";
import { Post } from "@/constants";

interface NavigationProps {
  type: "home" | "post";
  posts: Post[];
}

const Navigation = ({ type, posts }: NavigationProps) => {
  const handleProfileClick = () => (window.location.href = "/");

  return (
    <nav className={styles.navigation}>
      <div className={styles.items}>
        <div className={styles.profile} onClick={handleProfileClick}>
          <Image
            className={styles.icon}
            src="/img/profile_picture.png"
            alt="profile_picture"
            width={48}
            height={48}
          />
        </div>
        <div className={styles.menus}>
          {type === "post" && <ContentMenu />}
          <PostMenu posts={posts} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
