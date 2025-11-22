import { useEffect, useRef } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";

export const useSectionObserver = (sectionId: string, threshold = 0.5) => {
  const { setActiveSection } = useActiveSection();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionId, setActiveSection, threshold]);

  return ref;
};
