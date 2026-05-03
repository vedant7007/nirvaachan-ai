import { useState, useEffect, useRef, MutableRefObject } from "react";

export function useInView(options?: IntersectionObserverInit): {
  ref: MutableRefObject<any>;
  isInView: boolean;
} {
  const ref = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Only trigger once
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}
