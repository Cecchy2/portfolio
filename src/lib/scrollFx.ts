/* ==========================================================================
   Motore degli effetti legati allo scorrimento.

   Un solo ciclo requestAnimationFrame guida barra di avanzamento, nastri
   reattivi alla velocita', parallax su due assi, sticky stack e pan
   orizzontale. Nessun listener su "scroll": la posizione viene letta dentro
   il frame, cosi' non si accumulano callback e non si perdono frame.

   In React i nodi cambiano a ogni route: initScrollFx() va richiamata a ogni
   navigazione e restituisce la funzione di smontaggio.
   ========================================================================== */

interface Ribbon {
  track: HTMLElement;
  group: HTMLElement;
  speed: number;
  dir: number;
  x: number;
  half: number;
  skew: boolean;
}

interface ParItem {
  el: HTMLElement;
  py: number;
  px: number;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

export function initScrollFx(): () => void {
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMQ = window.matchMedia("(max-width: 1024px)");
  const reduced = () => reduceMQ.matches;

  /* ── Nastri: si duplica il gruppo per un ciclo senza stacco ─────────── */
  const ribbons: Ribbon[] = [];
  document.querySelectorAll<HTMLElement>("[data-vtrack]").forEach((track) => {
    const group = track.querySelector<HTMLElement>("[data-vgroup]");
    if (!group || track.dataset.cloned === "1") return;
    track.appendChild(group.cloneNode(true));
    track.dataset.cloned = "1";
    ribbons.push({
      track,
      group,
      speed: parseFloat(track.dataset.speed || "40"),
      dir: parseFloat(track.dataset.dir || "-1"),
      x: 0,
      half: 0,
      skew: track.dataset.skew === "1",
    });
  });

  /* ── Parallax: il valore e' lo spostamento massimo in pixel ─────────── */
  const parEls: ParItem[] = Array.from(
    document.querySelectorAll<HTMLElement>("[data-py],[data-px]")
  ).map((el) => ({
    el,
    py: parseFloat(el.dataset.py || "0"),
    px: parseFloat(el.dataset.px || "0"),
  }));

  /* ── Pan orizzontale ────────────────────────────────────────────────── */
  const pan = document.querySelector<HTMLElement>("[data-pan]");
  const panTrack = pan?.querySelector<HTMLElement>("[data-pan-track]") ?? null;
  const panBar = pan?.querySelector<HTMLElement>("[data-pan-bar]") ?? null;
  let panDist = 0;

  const panOff = () => reduceMQ.matches || mobileMQ.matches;

  function measure() {
    ribbons.forEach((r) => {
      r.half = r.group.getBoundingClientRect().width;
    });
    if (pan && panTrack) {
      if (panOff()) {
        pan.style.height = "";
        panTrack.style.transform = "";
        panDist = 0;
      } else {
        panDist = Math.max(0, panTrack.scrollWidth - window.innerWidth);
        pan.style.height = window.innerHeight + panDist + "px";
      }
    }
  }

  const bar = document.querySelector<HTMLElement>("[data-progress]");
  const stackItems = Array.from(document.querySelectorAll<HTMLElement>(".stack-item"));

  let lastY = window.scrollY;
  let lastT = performance.now();
  let raf = 0;
  let alive = true;

  function loop(now: number) {
    if (!alive) return;
    const dt = Math.min(0.05, (now - lastT) / 1000) || 0.016;
    lastT = now;
    const y = window.scrollY;
    const vel = (y - lastY) / (dt * 60);
    lastY = y;
    const vh = window.innerHeight;

    if (bar) {
      const max = document.documentElement.scrollHeight - vh;
      bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max, 0, 1) : 0).toFixed(4) + ")";
    }

    if (!reduced()) {
      for (const r of ribbons) {
        if (!r.half) continue;
        r.x += (r.speed + Math.abs(vel) * 26) * r.dir * dt;
        r.x = ((r.x % r.half) - r.half) % r.half;
        const sk = r.skew ? clamp(-vel * 0.5, -8, 8) : 0;
        r.track.style.transform =
          "translate3d(" + r.x.toFixed(2) + "px,0,0)" + (sk ? " skewX(" + sk.toFixed(2) + "deg)" : "");
      }

      if (!mobileMQ.matches) {
        for (const it of parEls) {
          const box = it.el.getBoundingClientRect();
          if (box.bottom < -160 || box.top > vh + 160) continue;
          const c = 1 - 2 * clamp((vh - box.top) / (vh + box.height), 0, 1);
          it.el.style.transform =
            "translate3d(" + (c * it.px).toFixed(1) + "px," + (c * it.py).toFixed(1) + "px,0)";
        }

        for (let k = 0; k < stackItems.length - 1; k++) {
          const inner = stackItems[k].querySelector<HTMLElement>("[data-stackscale]");
          if (!inner) continue;
          const nt = stackItems[k + 1].getBoundingClientRect().top;
          const q = 1 - clamp(nt / vh, 0, 1);
          inner.style.transform = "scale(" + (1 - 0.07 * q).toFixed(4) + ")";
          inner.style.opacity = (1 - 0.55 * q).toFixed(3);
        }
      }

      if (panDist > 0 && panTrack && pan) {
        const pr = clamp(-pan.getBoundingClientRect().top / panDist, 0, 1);
        panTrack.style.transform = "translate3d(" + (-pr * panDist).toFixed(2) + "px,0,0)";
        if (panBar) panBar.style.transform = "scaleX(" + pr.toFixed(4) + ")";
      }
    }

    raf = requestAnimationFrame(loop);
  }

  /* ── Comparse all'ingresso in viewport ──────────────────────────────── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );
  document
    .querySelectorAll("[data-reveal],[data-stagger],[data-mask]")
    .forEach((el) => io.observe(el));

  /* ── Spotlight sotto il cursore e bottoni magnetici ─────────────────── */
  const offs: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>("[data-spot]").forEach((el) => {
    const fn = (ev: PointerEvent) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty("--mx", ev.clientX - b.left + "px");
      el.style.setProperty("--my", ev.clientY - b.top + "px");
    };
    el.addEventListener("pointermove", fn, { passive: true });
    offs.push(() => el.removeEventListener("pointermove", fn));
  });

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    if (reduced()) return;
    const move = (ev: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const dx = (ev.clientX - (b.left + b.width / 2)) * 0.22;
      const dy = (ev.clientY - (b.top + b.height / 2)) * 0.32;
      el.style.transform = "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0)";
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    offs.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });

  /* ── Avvio e rimisurazioni ──────────────────────────────────────────── */
  measure();
  raf = requestAnimationFrame(loop);

  let rt: number | undefined;
  const onResize = () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(measure, 160);
  };
  window.addEventListener("resize", onResize, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
  const onLoad = () => measure();
  window.addEventListener("load", onLoad, { once: true });

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    offs.forEach((f) => f());
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", onLoad);
    window.clearTimeout(rt);
  };
}
