import { useLayoutEffect, useRef } from "react";

export interface ColossalLine {
  text: string;
  variant?: "solid" | "outline" | "amber";
  /** deriva orizzontale in pixel durante lo scorrimento */
  px?: number;
}

/**
 * Titoli "colossal": la misura non e' stimata in vw, ma calcolata misurando
 * il testo reale con una Range, perche' la riga tocchi entrambi i bordi.
 * Tutte le righe di un blocco condividono la misura della piu' lunga: e'
 * quello che evita l'effetto sproporzionato di righe di corpo diverso.
 */
const ColossalText = ({
  lines,
  className = "",
  style,
}: {
  lines: ColossalLine[];
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const block = ref.current;
    if (!block) return;

    const fit = () => {
      const els = Array.from(block.querySelectorAll<HTMLElement>("[data-fit]"));
      if (!els.length) return;
      const range = document.createRange();
      let size = Infinity;
      els.forEach((el) => {
        const avail = el.parentElement?.clientWidth ?? 0;
        el.style.fontSize = "100px";
        range.selectNodeContents(el);
        const w = range.getBoundingClientRect().width;
        if (avail && w) size = Math.min(size, (100 * avail) / w);
      });
      if (!isFinite(size)) return;
      // tetto massimo: senza, una riga corta diventerebbe sproporzionata
      const cap = Math.min(window.innerWidth * 0.108, window.innerHeight * 0.2);
      size = Math.max(24, Math.min(size, cap));
      els.forEach((el) => (el.style.fontSize = size + "px"));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(block);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [lines]);

  return (
    <div className={`colossal ${className}`.trim()} data-mask ref={ref} style={style}>
      {lines.map((l, i) => (
        <span
          key={l.text}
          className="mask"
          style={{ "--i": i } as React.CSSProperties}
          {...(l.px !== undefined ? { "data-px": String(l.px) } : {})}
        >
          <span
            className={
              "colossal-line" +
              (l.variant === "outline" ? " out" : l.variant === "amber" ? " amber" : "")
            }
            data-fit
          >
            {l.text}
          </span>
        </span>
      ))}
    </div>
  );
};

export default ColossalText;
