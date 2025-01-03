import { ComponentPropsWithoutRef } from "react";
import styles from "./Title.module.css";

export function Title({ children, ...props }: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 className={styles.title} {...props}>
      {children}
    </h1>
  );
}
