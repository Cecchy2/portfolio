import { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

const CarouselLoghi: React.FC = () => {
  const loghi: string[] = [
    "/public/BW/intellij.png",
    "/public/BW/koyeb_logo_icon_247887.png",
    "/public/BW/netlifyBW.png",
    "/public/BW/html.png",
    "/public/BW/css.png",
    "/public/BW/bootstrap.png",
    "/public/BW/sass.png",
    "/public/BW/javascript.png",
    "/public/BW/typescript.png",
    "/public/BW/vite-js-logo.png",
    "/public/BW/react.png",
    "/public/BW/redux.png",
    "/public/BW/java.png",
    "/public/BW/spring.png",
    "/public/BW/sql.png",
    "/public/BW/Postgresql_elephant.svg.png",
    "/public/BW/postman.png",
    "/public/BW/visual-studio-code.png",
    "/public/BW/git.png",
    "/public/BW/GitHub-Mark-ea2971cee799.png",
    "/public/BW/hibernate.png",
    "/public/BW/intellij.png",
    "/public/BW/koyeb_logo_icon_247887.png",
    "/public/BW/netlifyBW.png",
    "/public/BW/html.png",
    "/public/BW/css.png",
    "/public/BW/bootstrap.png",
    "/public/BW/sass.png",
    "/public/BW/javascript.png",
    "/public/BW/typescript.png",
    "/public/BW/vite-js-logo.png",
    "/public/BW/react.png",
    "/public/BW/redux.png",
    "/public/BW/java.png",
    "/public/BW/spring.png",
  ];

  const [carouselPosition, setCarouselPosition] = useState<number>(0);
  const lastScrollY = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const totalWidth = loghi.length * 120;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      setCarouselPosition((prevPosition) => {
        const newPosition = prevPosition - delta * 2;

        if (newPosition <= -totalWidth) {
          return newPosition + totalWidth;
        } else if (newPosition >= 0) {
          return newPosition - totalWidth;
        }

        return newPosition;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalWidth]);

  return (
    <div className="striscia">
      <div className="carousel " ref={carouselRef} style={{ transform: `translateX(${carouselPosition}px)` }}>
        {loghi.concat(loghi).map((logo, index) => (
          <div className="item" key={index}>
            <Image src={logo} alt={`Logo ${index + 1}`} className="logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselLoghi;
