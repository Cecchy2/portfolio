import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Image } from "react-bootstrap";

interface CarouselLoghiProps {
  direction?: "left" | "right";
}

const CarouselLoghi: React.FC<CarouselLoghiProps> = ({
  direction = "left",
}) => {
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
      "/Icone/Docker.png",
      "/Icone/Three.png",
    ],
    []
  );

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<number>(0);
  const scrollSpeedRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const requestRef = useRef<number>();

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

  const animate = useCallback(() => {
    const baseSpeed = 1; // Velocità costante di base

    // Decelerazione inerziale dello scroll
    scrollSpeedRef.current *= 0.95;
    if (Math.abs(scrollSpeedRef.current) < 0.1) scrollSpeedRef.current = 0;

    const currentSpeed = baseSpeed + scrollSpeedRef.current;

    if (direction === "left") {
      positionRef.current -= currentSpeed;
    } else {
      positionRef.current += currentSpeed;
    }

    const singleLoopWidth = totalWidth;

    // Seamless infinite loop
    if (singleLoopWidth > 0) {
      if (positionRef.current <= -singleLoopWidth) {
        positionRef.current += singleLoopWidth;
      } else if (positionRef.current > 0) {
        positionRef.current -= singleLoopWidth;
      }
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [totalWidth, direction]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Aumenta la velocità in base allo scroll
      scrollSpeedRef.current += delta * 0.15;

      // Limite massimo
      if (scrollSpeedRef.current > 20) scrollSpeedRef.current = 20;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateDimensions, { passive: true });

    // Initial setup
    lastScrollY.current = window.scrollY;
    calculateDimensions();

    // ResizeObserver for container
    let resizeObserver: ResizeObserver | null = null;
    if (carouselRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateDimensions();
      });
      resizeObserver.observe(
        carouselRef.current.parentElement || carouselRef.current
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateDimensions]);

  return (
    <>
      <div className="striscia">
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            gap: `${gap}px`,
            willChange: "transform",
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
