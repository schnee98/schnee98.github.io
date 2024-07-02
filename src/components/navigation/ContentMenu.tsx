"use client";
import styles from "@/styles/post.module.css";
import { useState } from "react";

export default function ContentMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const menuProps = {
    className: isClicked ? styles.fadeInAnimation : undefined,
  };

  const handleClick = () => setIsClicked(!isClicked);

  return (
    <div {...menuProps} onClick={handleClick}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 12h.01M8 12h.01M16 12h.01"
        />
      </svg>
    </div>
  );
}
