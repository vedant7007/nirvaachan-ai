import React, { useState, useEffect, useRef, type RefObject } from "react";

interface UseInViewReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  isInView: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit): UseInViewReturn<T> {
  const ref = useRef<T>(null) as React.MutableRefObject<T>;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(currentRef);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [options]);

  return { ref, isInView };
}
