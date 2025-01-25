import { useEffect } from "react";
import { RefObject } from "react";

export function useFadeInContents(ref: RefObject<HTMLElement>) {
  const contents = Array.from(ref.current?.children ?? []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.opacity = "1";
          } else {
            element.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );

    contents.forEach((content) => observer.observe(content));

    return () => {
      observer.disconnect();
    };
  }, [contents]);
}
