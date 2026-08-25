/**
 * Nastro che scorre da solo e reagisce alla velocita' di scorrimento:
 * accelera e si inclina mentre scorri, rallenta quando ti fermi.
 * Il gruppo viene duplicato dal motore in scrollFx per un ciclo continuo.
 */
const VelocityMarquee = ({
  text,
  speed = 42,
  dir = -1,
  outline = false,
  edge = true,
}: {
  text: string;
  speed?: number;
  dir?: 1 | -1;
  outline?: boolean;
  edge?: boolean;
}) => (
  <div
    className={
      "vmarquee" + (edge ? " vmarquee--edge" : "") + (outline ? " vmarquee--outline" : "")
    }
    aria-hidden="true"
  >
    <div
      className="vmarquee-track"
      data-vtrack
      data-speed={speed}
      data-dir={dir}
      data-skew="1"
    >
      <div className="vmarquee-item" data-vgroup>
        <span>{text}</span>
        <span className="vmarquee-dot" />
        <span>{text}</span>
        <span className="vmarquee-dot" />
      </div>
    </div>
  </div>
);

export default VelocityMarquee;
