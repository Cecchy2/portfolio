import { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

const CarouselLoghi: React.FC = () => {
  const loghi: string[] = [
    "/public/Icone/intellij.png",
    "/public/Icone/koyeb_logo_icon_247887.webp",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
    /* "/public/Icone/javascript.png", */
    /* "/public/Icone/typescript.png", */
    "/public/Icone/vite-js-logo.png",
    /* "/public/Icone/react.png", */
    "/public/Icone/redux.png",
    /* "/public/Icone/java 2.png", */
    /* "/public/Icone/spring.png", */
    "/public/Icone/sql.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/intellij.png",
    "/public/Icone/koyeb_logo_icon_247887.webp",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
    /* "/public/Icone/javascript.png", */
    /* "/public/Icone/typescript.png", */
    "/public/Icone/vite-js-logo.png",
    /* "/public/Icone/react.png", */
    "/public/Icone/redux.png",
    /* "/public/Icone/java 2.png", */
    /* "/public/Icone/spring.png", */
    "/public/Icone/sql.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
    "/public/Icone/vite-js-logo.png",
    "/public/Icone/redux.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/intellij.png",
    "/public/Icone/koyeb_logo_icon_247887.webp",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
    "/public/Icone/vite-js-logo.png",
    "/public/Icone/redux.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/postman.png",
    "/public/Icone/visual-studio-code.png",
    "/public/Icone/git.png",
    "/public/Icone/GitHub-Mark-ea2971cee799.png",
    "/public/Icone/hibernate.png",
    "/public/Icone/intellij.png",
    "/public/Icone/koyeb_logo_icon_247887.webp",
    "/public/Icone/netlify.png",
    "/public/Icone/html.png",
    "/public/Icone/Postgresql_elephant.svg.png",
    "/public/Icone/css.png",
    "/public/Icone/bootstrap.png",
    "/public/Icone/sass.png",
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
    <>
      <div className="striscia">
        <div className="carousel " ref={carouselRef} style={{ transform: `translateX(${carouselPosition}px)` }}>
          {loghi.concat(loghi).map((logo, index) => (
            <div className="item me-3" key={index}>
              <Image src={logo} alt={`Logo ${index + 1}`} className="logo" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselLoghi;
