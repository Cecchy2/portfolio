import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Image } from "react-bootstrap";

const CarouselLoghi: React.FC = () => {
  // Clean array without duplicates
  const loghi: string[] = useMemo(
    () => [
      "/Icone/intellij.png",
      "/Icone/koyeb_logo_icon_247887.webp",
      "/Icone/netlify.png",
      "/Icone/html.png",
      "/Icone/css.png",
      "/Icone/bootstrap.png",
      "/Icone/sass.png",
      "/Icone/vite-js-logo.png",
      "/Icone/redux.png",
      "/Icone/sql.png",
      "/Icone/Postgresql_elephant.svg.png",
      "/Icone/postman.png",
      "/Icone/visual-studio-code.png",
      "/Icone/git.png",
      "/Icone/GitHub-Mark-ea2971cee799.png",
      "/Icone/hibernate.png",
    ],
    []
  );

  const [carouselPosition, setCarouselPosition] = useState<number>(0);
  const lastScrollY = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState<number>(100); // Start with desktop size
  const [gap, setGap] = useState<number>(20); // Start with desktop gap

  // Calculate dimensions based on container and device pixel ratio
  const calculateDimensions = useCallback(() => {
    if (carouselRef.current) {
      const containerHeight = carouselRef.current.offsetHeight || 120;
      const containerPadding = 20; // Account for padding
      const availableHeight = containerHeight - containerPadding;
      const screenWidth = window.innerWidth;

      let newItemWidth: number;
      let newGap: number;

      // Keep original desktop size (100px), scale down only on mobile
      if (screenWidth > 768) {
        // Desktop and tablet - use original size
        newItemWidth = 100;
        newGap = 20;
      } else if (screenWidth > 480) {
        // Medium mobile - slightly smaller
        newItemWidth = Math.max(80, Math.min(90, availableHeight * 0.8));
        newGap = 15;
      } else {
        // Small mobile - smallest size
        newItemWidth = Math.max(60, Math.min(75, availableHeight * 0.8));
        newGap = 10;
      }

      setItemWidth(newItemWidth);
      setGap(newGap);
    }
  }, []);

  const totalWidth = useMemo(
    () => loghi.length * (itemWidth + gap),
    [loghi.length, itemWidth, gap]
  );

  useEffect(() => {
    // Initial calculation after a short delay to ensure CSS is applied
    const initialCalculation = () => {
      calculateDimensions();
    };

    const timeoutId = setTimeout(initialCalculation, 100);

    const handleResize = () => {
      calculateDimensions();
    };

    // Use ResizeObserver to detect container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (carouselRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateDimensions();
      });
      resizeObserver.observe(
        carouselRef.current.parentElement || carouselRef.current
      );
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;
          lastScrollY.current = currentScrollY;

          setCarouselPosition((prevPosition) => {
            const newPosition = prevPosition - delta * 1.5; // Reduced multiplier for smoother movement
            const singleLoopWidth = totalWidth;

            // Seamless infinite loop
            if (newPosition <= -singleLoopWidth) {
              return newPosition + singleLoopWidth;
            } else if (newPosition >= 0) {
              return newPosition - singleLoopWidth;
            }

            return newPosition;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [totalWidth, calculateDimensions]);

  return (
    <>
      <div className="striscia">
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            transform: `translateX(${carouselPosition}px)`,
            gap: `${gap}px`,
          }}
        >
          {/* Create seamless infinite loop by rendering the array three times */}
          {[...loghi, ...loghi, ...loghi].map((logo, index) => (
            <div
              className="item"
              key={`${logo}-${index}`}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                flexShrink: 0,
              }}
            >
              <Image
                src={logo}
                alt={`Logo ${(index % loghi.length) + 1}`}
                className="logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselLoghi;
