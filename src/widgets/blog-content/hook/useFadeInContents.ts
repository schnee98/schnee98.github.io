import { useEffect, type RefObject } from 'react';

interface UseIntersectContents {
  ref: RefObject<HTMLElement | null>;
  onEnter: (element: HTMLElement) => void;
  onLeave: (element: HTMLElement) => void;
  threshold?: number;
}

export function useIntersectContents({
  ref,
  onEnter,
  onLeave,
  threshold = 0.1,
}: UseIntersectContents) {
  useEffect(() => {
    if (ref.current == null || ref.current.children == null) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            onEnter(element);
          } else {
            onLeave(element);
          }
        });
      },
      { threshold }
    );
    const contents = Array.from(ref.current.children);

    contents.forEach(content => observer.observe(content));
    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
