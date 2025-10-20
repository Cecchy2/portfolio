import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Image } from "react-bootstrap";

const CarouselLoghi: React.FC = () => {
  // Clean array without duplicates
  const loghi: string[] = useMemo(() => [
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
  ], []);

  const [carouselPosition, setCarouselPosition] = useState<number>(0);
  const lastScrollY = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const itemWidth = useRef<number>(120); // Will be dynamically calculated
  const gap = useRef<number>(20); // Will be dynamically calculated

  // Calculate dimensions based on container and device pixel ratio
  const calculateDimensions = useCallback(() => {
    if (carouselRef.current) {
      const containerHeight = carouselRef.current.offsetHeight || 120;
      
      // Adjust dimensions based on container size for better responsiveness
      itemWidth.current = Math.max(80, Math.min(120, containerHeight * 0.85));
      gap.current = Math.max(15, itemWidth.current * 0.2);
    }
  }, []);

  const totalWidth = useMemo(() => 
    loghi.length * (itemWidth.current + gap.current), 
    [loghi.length]
  );

  useEffect(() => {
    calculateDimensions();
    
    const handleResize = () => {
      calculateDimensions();
    };

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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
            gap: `${gap.current}px`
          }}
        >
          {/* Create seamless infinite loop by rendering the array three times */}
          {[...loghi, ...loghi, ...loghi].map((logo, index) => (
            <div 
              className="item" 
              key={`${logo}-${index}`}
              style={{
                width: `${itemWidth.current}px`,
                height: `${itemWidth.current}px`,
                flexShrink: 0
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
