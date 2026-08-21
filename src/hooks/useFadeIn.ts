import { useEffect, useRef } from "react";

export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      // threshold MUST stay 0. A ratio threshold is a fraction of the *element*,
      // so a section taller than 1/threshold viewports can never reach it and
      // stays at opacity:0 forever. Projects is ~12000px in one column on a
      // 844px-tall phone — a 0.1 threshold caps out at 844/12000 ≈ 0.07 and the
      // whole section silently never appeared on mobile.
      // rootMargin does the "wait until it's properly on screen" job instead,
      // and it's measured against the viewport, so element height is irrelevant.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
