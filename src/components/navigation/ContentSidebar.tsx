import styles from "@/styles/navigation.module.css";

interface ContentSidebarProps {
  headers: Element[];
}

export default function ContentSidebar({ headers }: ContentSidebarProps) {
  return (
    <>
      <div className={styles.sidebarBlur}></div>
      <div className={styles.sidebar}>
        <button className={styles.sidebarCloseButton}>X</button>
        <h3 className={styles.sidebarTitle}>목차</h3>
        <hr className={styles.sidebarBreak} />
        {headers.map(({ id, textContent }, index) => (
          <div key={`content-items-${index}`} className={styles.sidebarItem}>
            <a href={`#${id}`}>{textContent}</a>
          </div>
        ))}
      </div>
    </>
  );
}
