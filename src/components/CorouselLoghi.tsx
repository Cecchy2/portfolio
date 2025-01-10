import { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

const CarouselLoghi: React.FC = () => {
  const loghi: string[] = [
    "/Icone/intellij.png",
    "/Icone/koyeb_logo_icon_247887.webp",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
    /* "/Icone/javascript.png", */
    /* "/Icone/typescript.png", */
    "/Icone/vite-js-logo.png",
    /* "/Icone/react.png", */
    "/Icone/redux.png",
    /* "/Icone/java 2.png", */
    /* "/Icone/spring.png", */
    "/Icone/sql.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/intellij.png",
    "/Icone/koyeb_logo_icon_247887.webp",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
    /* "/Icone/javascript.png", */
    /* "/Icone/typescript.png", */
    "/Icone/vite-js-logo.png",
    /* "/Icone/react.png", */
    "/Icone/redux.png",
    /* "/Icone/java 2.png", */
    /* "/Icone/spring.png", */
    "/Icone/sql.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
    "/Icone/vite-js-logo.png",
    "/Icone/redux.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/intellij.png",
    "/Icone/koyeb_logo_icon_247887.webp",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
    "/Icone/vite-js-logo.png",
    "/Icone/redux.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/postman.png",
    "/Icone/visual-studio-code.png",
    "/Icone/git.png",
    "/Icone/GitHub-Mark-ea2971cee799.png",
    "/Icone/hibernate.png",
    "/Icone/intellij.png",
    "/Icone/koyeb_logo_icon_247887.webp",
    "/Icone/netlify.png",
    "/Icone/html.png",
    "/Icone/Postgresql_elephant.svg.png",
    "/Icone/css.png",
    "/Icone/bootstrap.png",
    "/Icone/sass.png",
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
