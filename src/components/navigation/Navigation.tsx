"use client";
import styles from "@/styles/navigation.module.css";
import Image from "next/image";
import ContentMenu from "./ContentMenu/ContentMenu";
import PostMenu from "./PostMenu";
import { Post } from "@/constants";

interface NavigationProps {
  type: "home" | "post";
  posts: Post[];
}

const Navigation = ({ type, posts }: NavigationProps) => {
  const handleProfileClick = () => (window.location.href = "/");

  return (
    <nav className={styles.navigation}>
      <div className={styles.navItems}>
        <div className={styles.profile} onClick={handleProfileClick}>
          <Image
            className={styles.profileIcon}
            src="/img/profile_picture.png"
            alt="profile_picture"
            width={48}
            height={48}
          />
        </div>
        <div className={styles.navMenus}>
          {type === "post" && <ContentMenu />}
          <PostMenu posts={posts} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
