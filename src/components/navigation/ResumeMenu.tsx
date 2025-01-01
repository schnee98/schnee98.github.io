import Link from "next/link";
import styles from "@/styles/navigation.module.css";
import IconDocument from "@/assets/icon-document.svg?react";

export default function ResumeMenu() {
  return (
    <>
      <Link className={styles.resume} href={"/resume"}>
        <IconDocument width={24} height={24} />
      </Link>
    </>
  );
}
