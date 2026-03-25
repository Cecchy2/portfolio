import { useEffect, useRef } from "react";

/**
 * Continuously tracks the element's position relative to the viewport
 * and sets opacity: 0→1 when entering, 1→0 when leaving.
 */
export const useSectionFade = (fadeZoneFraction = 0.28) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { top, bottom } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const zone = vh * fadeZoneFraction;

      let opacity: number;

      if (bottom <= 0 || top >= vh) {
        opacity = 0;
      } else if (top <= 0 && bottom >= vh) {
        // Section taller than viewport — fully visible
        opacity = 1;
      } else if (top >= 0) {
        // Entering from bottom
        opacity = Math.min(1, (vh - top) / zone);
      } else {
        // Exiting from top
        opacity = Math.min(1, bottom / zone);
      }

      el.style.opacity = opacity.toFixed(3);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [fadeZoneFraction]);

  return ref;
};
