import styles from "./ContentSidebar.module.css";

interface ContentSidebarProps {
  headers: Element[];
  handleClick: () => void;
}

const MARGINS: { [key: string]: string } = {
  H1: "0rem",
  H2: "1rem",
  H3: "2rem",
  H4: "3rem",
  H5: "4rem",
  H6: "5rem",
};

export default function ContentSidebar({
  headers,
  handleClick,
}: ContentSidebarProps) {
  return (
    <>
      <div className={styles.blur} onClick={handleClick}></div>
      <div className={styles.sidebar}>
        <button className={styles.button} onClick={handleClick}>
          X
        </button>
        <p className={styles.title}>목차</p>
        <hr className={styles.break} />
        {headers.map(({ id, tagName, textContent }, index) => (
          <div key={`content-items-${index}`} className={styles.item}>
            <a
              href={`#${id}`}
              onClick={handleClick}
              style={{ marginLeft: MARGINS[tagName] || "0rem" }}
            >
              {textContent}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
