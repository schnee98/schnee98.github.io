import { ReactNode } from "react";
import styles from "./Quote.module.css";

interface Props {
  children: ReactNode;
}

export function Quote({ children }: Props) {
  return <div className={styles.quote}>{children}</div>;
}
