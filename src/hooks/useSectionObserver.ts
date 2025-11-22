import { useEffect, useRef } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";

export const useSectionObserver = (sectionId: string) => {
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
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionId, setActiveSection]);

  return ref;
};
