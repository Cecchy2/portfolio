import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ==========================================================================
   HeroFX — Il mockup del MacBook vive come piano texturizzato in 3D,
   circondato da lucciole. Al primo scorrimento si disgrega e lo sciame di
   farfalle parte dai suoi stessi pixel.

   Le farfalle non sono sprite piatti: ogni ala e' un quad istanziato che
   ruota davvero attorno all'asse del corpo, e l'insetto viene orientato
   sulla propria velocita', quindi vira e si inclina volando.

   Uscendo dalla home il componente si smonta e libera tutto: e' anche cio'
   che evita che l'animazione si accavalli a una sezione di destinazione.
   ========================================================================== */

const N_FLY = 2000;
const N_GLOW = 1400;
/** Pixel di scorrimento dedicati all'animazione: e' anche l'altezza extra
 *  del contenitore agganciato in App.css. */
const SCRUB = 1100;

const HeroFX = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const front = frontRef.current;
    if (!host || !front) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if (window.scrollY > 40) return; // pagina gia' scorsa: scena fuori contesto

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const img = new Image();
    img.onload = () => {
      if (disposed || !img.naturalWidth) return;
      cleanup = build(host, front, img);
    };
    img.src = "/macbook.png";

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      {/* Il portatile e la bruciatura passano dietro ai contenuti, le
          farfalle davanti: due canvas separati, due livelli diversi. */}
      <div className="hero-fx hero-fx--back" data-fx aria-hidden="true" ref={hostRef} />
      <div className="hero-fx hero-fx--front" ref={frontRef} aria-hidden="true" />
    </>
  );
};

function build(host: HTMLDivElement, front: HTMLDivElement, img: HTMLImageElement): () => void {
  /* ── Pixel del mockup: le farfalle devono nascere da li' ─────────────── */
  const cv = document.createElement("canvas");
  cv.width = 460;
  cv.height = Math.round((460 * img.naturalHeight) / img.naturalWidth);
  const cx = cv.getContext("2d")!;
  cx.drawImage(img, 0, 0, cv.width, cv.height);
  const px = cx.getImageData(0, 0, cv.width, cv.height).data;

  // Il PNG ha ampi margini trasparenti: ne calcolo il riquadro utile, cosi'
  // il portatile riempie lo spazio invece di galleggiare al centro.
  const pool: number[] = [];
  let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
  for (let y = 0; y < cv.height; y++)
    for (let x = 0; x < cv.width; x++) {
      if (px[(y * cv.width + x) * 4 + 3] > 120) {
        pool.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  const nPool = pool.length / 2;
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const PLANE_W = 8.6;
  const PLANE_H = (PLANE_W * bh) / bw;

  const originAt = () => {
    const k = Math.floor(Math.random() * nPool) * 2;
    return new THREE.Vector3(
      ((pool[k] - minX) / bw - 0.5) * PLANE_W + (Math.random() - 0.5) * 0.05,
      -((pool[k + 1] - minY) / bh - 0.5) * PLANE_H + (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.12
    );
  };

  /* ── Il mockup come piano, con disgregazione a rumore ─────────────────── */
  const tex = new THREE.Texture(img);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;

  const planeMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uMap: { value: tex },
      uProg: { value: 0 },
      uEdge: { value: new THREE.Color("#f59e0b") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform sampler2D uMap; uniform float uProg; uniform vec3 uEdge;
      varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float vnoise(vec2 p){
        vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x),
                   mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x), f.y);
      }
      void main(){
        vec4 t = texture2D(uMap, vUv);
        if (t.a < .02) discard;
        float n = vnoise(vUv * 9.0) * .72 + vnoise(vUv * 26.0) * .28;
        float cut = smoothstep(n - .10, n + .10, uProg * 1.35);
        float a = t.a * (1.0 - cut);
        if (a < .01) discard;
        float rim = (1.0 - abs(cut - .5) * 2.0) * step(.001, uProg);
        gl_FragColor = vec4(t.rgb + uEdge * rim * .85, a);
      }`,
  });

  // UV rimappate sul solo riquadro utile del PNG
  const planeGeo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 1, 1);
  const uvA = planeGeo.attributes.uv as THREE.BufferAttribute;
  const u0 = minX / cv.width, u1 = (maxX + 1) / cv.width;
  const v0 = 1 - (maxY + 1) / cv.height, v1 = 1 - minY / cv.height;
  for (let q = 0; q < uvA.count; q++) {
    uvA.setXY(q, u0 + uvA.getX(q) * (u1 - u0), v0 + uvA.getY(q) * (v1 - v0));
  }
  uvA.needsUpdate = true;
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.frustumCulled = false;
  plane.renderOrder = 2;

  /* ── Alone dietro: un MacBook nero su fondo nero non si staccherebbe ─── */
  const haloMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uCol: { value: new THREE.Color("#f59e0b") }, uProg: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 uCol; uniform float uProg; varying vec2 vUv;
      void main(){
        float d = length(vUv - .5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.8) * .30 * (1.0 - smoothstep(0.0, .5, uProg));
        if (a < .004) discard;
        gl_FragColor = vec4(uCol, a);
      }`,
  });
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W * 1.5, PLANE_H * 1.5), haloMat);
  halo.position.z = -1.2;
  halo.frustumCulled = false;
  halo.renderOrder = 0;

  /* ── Lucciole d'ambiente ──────────────────────────────────────────────── */
  const amber = new THREE.Color("#f59e0b");
  const gold = new THREE.Color("#ffcf6b");
  const pale = new THREE.Color("#fff3d6");
  const gPos = new Float32Array(N_GLOW * 3);
  const gCol = new Float32Array(N_GLOW * 3);
  const gTw = new Float32Array(N_GLOW * 2);
  const gSz = new Float32Array(N_GLOW);
  for (let i = 0; i < N_GLOW; i++) {
    const onShape = Math.random() < 0.45;
    const v = onShape
      ? originAt()
      : new THREE.Vector3(
          (Math.random() - 0.5) * PLANE_W * 1.35,
          (Math.random() - 0.5) * PLANE_H * 1.3,
          (Math.random() - 0.5) * 3.2
        );
    gPos[i * 3] = v.x; gPos[i * 3 + 1] = v.y; gPos[i * 3 + 2] = v.z - (onShape ? 0.35 : 0);
    const r = Math.random();
    const c = r < 0.55 ? amber : r < 0.86 ? gold : pale;
    gCol[i * 3] = c.r; gCol[i * 3 + 1] = c.g; gCol[i * 3 + 2] = c.b;
    gTw[i * 2] = 1.1 + Math.random() * 3.4;
    gTw[i * 2 + 1] = Math.random() * 6.283;
    gSz[i] = 0.5 + Math.random() * 0.9;
  }
  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
  glowGeo.setAttribute("aColor", new THREE.BufferAttribute(gCol, 3));
  glowGeo.setAttribute("aTw", new THREE.BufferAttribute(gTw, 2));
  glowGeo.setAttribute("aSize", new THREE.BufferAttribute(gSz, 1));

  const glowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uProg: { value: 0 },
      uPR: { value: Math.min(devicePixelRatio, 2) }, uScale: { value: 1 },
    },
    vertexShader: `
      uniform float uTime; uniform float uProg; uniform float uPR; uniform float uScale;
      attribute vec3 aColor; attribute vec2 aTw; attribute float aSize;
      varying vec3 vCol; varying float vA;
      void main(){
        vec3 p = position;
        p.x += sin(uTime * .5 + aTw.y) * .09;
        p.y += cos(uTime * .42 + aTw.y * 1.6) * .09;
        p.z += sin(uTime * .37 + aTw.y * .8) * .06;
        vec4 mv = modelViewMatrix * vec4(p,1.0);
        gl_Position = projectionMatrix * mv;
        float tw = .28 + .72 * pow(.5 + .5 * sin(uTime * aTw.x + aTw.y), 1.7);
        vCol = aColor;
        vA = tw * (1.0 - smoothstep(0.0, .3, uProg));
        gl_PointSize = (2.6 + 5.4 * aSize) * uScale * uPR * (8.6 / max(.1, -mv.z));
      }`,
    fragmentShader: `
      varying vec3 vCol; varying float vA;
      void main(){
        if (vA <= .002) discard;
        float d = length(gl_PointCoord - .5) * 2.0;
        if (d > 1.0) discard;
        float k = 1.0 - d;
        float a = (pow(k, 9.0) + pow(k, 2.4) * .34) * vA;
        if (a < .004) discard;
        gl_FragColor = vec4(vCol, a);
      }`,
  });
  const glow = new THREE.Points(glowGeo, glowMat);
  glow.frustumCulled = false;
  glow.renderOrder = 1;

  /* ── Farfalle istanziate: due ali che ruotano davvero, piu' il corpo ─── */
  const vPos: number[] = [], vUv: number[] = [], vSide: number[] = [], idx: number[] = [];
  for (let w = 0; w < 2; w++) {
    const sgn = w === 0 ? 1 : -1, ofs = w * 4;
    vPos.push(0,0,-.5,  1,0,-.5,  1,0,.5,  0,0,.5);
    vUv.push(0,0,  1,0,  1,1,  0,1);
    vSide.push(sgn, sgn, sgn, sgn);
    idx.push(ofs, ofs+1, ofs+2, ofs, ofs+2, ofs+3);
  }
  // corpo: quad sottile lungo l'asse di volo, aSide = 0 lo esclude dal battito
  vPos.push(-.075,0,-.5,  .075,0,-.5,  .075,0,.72,  -.075,0,.72);
  vUv.push(0,0,  1,0,  1,1,  0,1);
  vSide.push(0, 0, 0, 0);
  idx.push(8,9,10, 8,10,11);

  const flyGeo = new THREE.InstancedBufferGeometry();
  flyGeo.setAttribute("position", new THREE.Float32BufferAttribute(vPos, 3));
  flyGeo.setAttribute("uv", new THREE.Float32BufferAttribute(vUv, 2));
  flyGeo.setAttribute("aSide", new THREE.Float32BufferAttribute(vSide, 1));
  flyGeo.setIndex(idx);

  const warm = new THREE.Color("#fff6e6");
  const iOrg = new Float32Array(N_FLY * 3), iDir = new Float32Array(N_FLY * 3);
  const iRnd = new Float32Array(N_FLY * 4), iCol = new Float32Array(N_FLY * 3);
  const iScl = new Float32Array(N_FLY);
  for (let j = 0; j < N_FLY; j++) {
    const o = originAt();
    iOrg[j*3] = o.x; iOrg[j*3+1] = o.y; iOrg[j*3+2] = o.z;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    const dx = Math.sin(ph) * Math.cos(th);
    const dy = Math.abs(Math.cos(ph)) * 0.55 + 0.28;
    const dz = Math.sin(ph) * Math.sin(th) * 0.45;
    const L = Math.hypot(dx, dy, dz) || 1;
    iDir[j*3] = dx/L; iDir[j*3+1] = dy/L; iDir[j*3+2] = dz/L;
    iRnd[j*4] = 0.5 + Math.random() * 1.1;
    iRnd[j*4+1] = 0.4 + Math.random();
    iRnd[j*4+2] = Math.random() * 6.283;
    iRnd[j*4+3] = 0;                       // nessuna attesa: partono insieme
    const cc = Math.random() < 0.22 ? amber : Math.random() < 0.5 ? warm : pale;
    iCol[j*3] = cc.r; iCol[j*3+1] = cc.g; iCol[j*3+2] = cc.b;
    iScl[j] = 0.1 + Math.random() * 0.13;
  }
  flyGeo.setAttribute("iOrg", new THREE.InstancedBufferAttribute(iOrg, 3));
  flyGeo.setAttribute("iDir", new THREE.InstancedBufferAttribute(iDir, 3));
  flyGeo.setAttribute("iRnd", new THREE.InstancedBufferAttribute(iRnd, 4));
  flyGeo.setAttribute("iCol", new THREE.InstancedBufferAttribute(iCol, 3));
  flyGeo.setAttribute("iScl", new THREE.InstancedBufferAttribute(iScl, 1));
  flyGeo.instanceCount = N_FLY;

  const wingTex = makeWingTexture();
  const flyMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uProg: { value: 0 }, uTravel: { value: 15 }, uWing: { value: wingTex } },
    vertexShader: `
      uniform float uTime; uniform float uProg; uniform float uTravel;
      attribute float aSide;
      attribute vec3 iOrg; attribute vec3 iDir; attribute vec4 iRnd; attribute vec3 iCol; attribute float iScl;
      varying vec2 vUvw; varying vec3 vCol; varying float vA; varying float vShade; varying float vType;
      void main(){
        float t = clamp((uProg - iRnd.w) / max(.0001, 1.0 - iRnd.w), 0.0, 1.0);
        float e = t * t;
        vec3 p = iOrg + iDir * e * iRnd.x * uTravel;
        float sw1 = sin(uTime * iRnd.y * 1.5 + iRnd.z);
        float sw2 = sin(uTime * iRnd.y * 2.2 + iRnd.z * 1.7);
        p.x += sw1 * 1.5 * t;
        p.y += sw2 * 1.0 * t + e * 1.8;
        p.z += sin(uTime * iRnd.y * 1.1 + iRnd.z * .6) * .8 * t;
        vec3 vel = normalize(iDir * 1.2 + vec3(sw1 * .55, .42 + sw2 * .5, 0.0));
        float beat = sin(uTime * (10.0 + iRnd.y * 12.0) + iRnd.z);
        float ang = .30 + 1.05 * (.5 + .5 * beat);
        float grow = smoothstep(0.0, .18, t) * iScl;
        float isBody = step(abs(aSide), .001);
        vec3 wingL = vec3(aSide * position.x * cos(ang), position.x * sin(ang), position.z);
        vec3 lw = mix(wingL, position, isBody) * grow;
        vec3 f = vel;
        vec3 up = mix(vec3(0.,1.,0.), vec3(0.,0.,1.), step(.95, abs(f.y)));
        vec3 r = normalize(cross(up, f));
        vec3 u2 = cross(f, r);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p + r*lw.x + u2*lw.y + f*lw.z, 1.0);
        vUvw = uv; vCol = iCol;
        vA = smoothstep(0.0, .14, t) * (1.0 - smoothstep(.6, 1.0, t));
        vShade = .72 + .28 * abs(sin(ang));
        vType = isBody;
      }`,
    fragmentShader: `
      uniform sampler2D uWing;
      varying vec2 vUvw; varying vec3 vCol; varying float vA; varying float vShade; varying float vType;
      void main(){
        if (vA <= .003) discard;
        if (vType > .5) {
          float taper = sin(clamp(vUvw.y, 0.0, 1.0) * 3.14159);
          float hw = .5 * max(taper, .05);
          float ab = (1.0 - smoothstep(hw * .55, hw, abs(vUvw.x - .5))) * vA;
          if (ab < .02) discard;
          gl_FragColor = vec4(vCol * .42, ab);
        } else {
          float a = texture2D(uWing, vUvw).a;
          if (a < .04) discard;
          gl_FragColor = vec4(vCol * vShade, a * vA);
        }
      }`,
  });
  const flies = new THREE.Mesh(flyGeo, flyMat);
  flies.frustumCulled = false;
  flies.renderOrder = 3;

  /* ── Scena ────────────────────────────────────────────────────────────── */
  const groupBack = new THREE.Group();
  groupBack.add(halo); groupBack.add(plane); groupBack.add(glow);
  const sceneBack = new THREE.Scene();
  sceneBack.add(groupBack);

  const groupFront = new THREE.Group();
  groupFront.add(flies);
  const sceneFront = new THREE.Scene();
  sceneFront.add(groupFront);

  const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  cam.position.z = 8.6;

  const mkRenderer = () => {
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    r.setClearAlpha(0);
    return r;
  };
  const rBack = mkRenderer();
  const rFront = mkRenderer();
  host.appendChild(rBack.domElement);
  front.appendChild(rFront.domElement);

  function resize() {
    const w = innerWidth, h = innerHeight;
    rBack.setSize(w, h, false);
    rFront.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    const visH = 2 * Math.tan(((cam.fov * Math.PI) / 180) / 2) * cam.position.z;
    const visW = visH * cam.aspect;
    const fit = Math.min((visW * 0.4) / PLANE_W, (visH * 0.7) / PLANE_H);
    for (const g of [groupBack, groupFront]) {
      g.scale.setScalar(fit);
      g.position.set(visW * 0.265, -visH * 0.045, 0);
    }
    glowMat.uniforms.uScale.value = Math.max(0.55, Math.min(1.2, fit * 1.5));
    flyMat.uniforms.uTravel.value = (visW * 1.25) / Math.max(fit, 0.001);
  }
  resize();
  addEventListener("resize", resize, { passive: true });
  host.dataset.ready = "true";

  // L'avanzamento non dipende piu' dal tempo ma dalla posizione di scroll:
  // fermi lo scroll, le farfalle restano dove sono.
  const scrub = document.querySelector<HTMLElement>("[data-hero-scrub]");
  scrub?.setAttribute("data-scrub", "1");

  const t0 = performance.now();
  let done = false, raf = 0;

  function teardown() {
    if (done) return;
    done = true;
    host.dataset.ready = "false";
    cancelAnimationFrame(raf);
    removeEventListener("resize", resize);
    glowGeo.dispose(); glowMat.dispose();
    planeGeo.dispose(); planeMat.dispose();
    halo.geometry.dispose(); haloMat.dispose();
    tex.dispose(); wingTex.dispose();
    flyGeo.dispose(); flyMat.dispose();
    rBack.dispose(); rFront.dispose();
    rBack.domElement.parentNode?.removeChild(rBack.domElement);
    rFront.domElement.parentNode?.removeChild(rFront.domElement);
  }

  function frame(now: number) {
    if (done) return;
    const el = (now - t0) / 1000;
    glowMat.uniforms.uTime.value = el;
    flyMat.uniforms.uTime.value = el;

    // Il mockup ha gia' la sua prospettiva: basta un'oscillazione lenta e
    // autonoma. Nessuna reazione al puntatore.
    const ry = Math.sin(el * 0.26) * 0.05;
    const rx = Math.sin(el * 0.2) * 0.028;
    const pz = Math.sin(el * 0.33) * 0.12;
    for (const g of [groupBack, groupFront]) {
      g.rotation.y = ry; g.rotation.x = rx; g.position.z = pz;
    }

    if (scrub) {
      const r = scrub.getBoundingClientRect();
      // superata la sezione, la scena non serve piu': libera la GPU
      if (r.bottom < -200) { teardown(); return; }
      const pr = Math.min(1, Math.max(0, -r.top / SCRUB));
      flyMat.uniforms.uProg.value = pr;
      glowMat.uniforms.uProg.value = pr;
      haloMat.uniforms.uProg.value = pr;
      planeMat.uniforms.uProg.value = pr;
    }
    rBack.render(sceneBack, cam);
    rFront.render(sceneFront, cam);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return teardown;
}

/** Texture di UNA singola ala, con la cerniera sul bordo u=0. */
function makeWingTexture(): THREE.CanvasTexture {
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fff";
  g.beginPath();
  g.moveTo(5, 66);
  g.bezierCurveTo(15, 22, 62, 3, 100, 14);
  g.bezierCurveTo(125, 22, 121, 53, 92, 63);
  g.bezierCurveTo(117, 73, 121, 101, 99, 117);
  g.bezierCurveTo(72, 129, 29, 107, 5, 71);
  g.closePath();
  g.fill();
  // l'ala si assottiglia verso la punta: da' delicatezza al volo
  g.globalCompositeOperation = "destination-in";
  const grad = g.createLinearGradient(0, 0, S, 0);
  grad.addColorStop(0, "rgba(0,0,0,1)");
  grad.addColorStop(0.62, "rgba(0,0,0,.95)");
  grad.addColorStop(1, "rgba(0,0,0,.72)");
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

export default HeroFX;
