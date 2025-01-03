import { ReactNode } from "react";
import styles from "./Segment.module.css";
import clsx from "clsx";

type TextType = "default" | "bold";

interface Props {
  textType?: "default" | "bold";
  children: ReactNode;
}

export function Segment({ textType = "default", children }: Props) {
  return <div className={segmentClass(textType)}>{children}</div>;
}

function segmentClass(textType: TextType) {
  return clsx(styles.segment, {
    [styles.bold]: textType === "bold",
  });
}
