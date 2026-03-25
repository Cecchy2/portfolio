import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Classic Perlin 2-D gradient noise ─────────────────────────────────────────
class Perlin {
  private perm: Uint8Array;
  constructor() {
    const p = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) {
      this.perm[i] = p[i];
      this.perm[256 + i] = p[i];
    }
  }
  private static fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  private static lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }
  private grad(h: number, x: number, y: number): number {
    switch (h & 3) {
      case 0:
        return x + y;
      case 1:
        return -x + y;
      case 2:
        return x - y;
      default:
        return -x - y;
    }
  }
  sample(x: number, y: number): number {
    const xi = Math.floor(x) & 255,
      yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x),
      yf = y - Math.floor(y);
    const u = Perlin.fade(xf),
      v = Perlin.fade(yf);
    const aa = this.perm[this.perm[xi] + yi];
    const ba = this.perm[this.perm[xi + 1] + yi];
    const ab = this.perm[this.perm[xi] + yi + 1];
    const bb = this.perm[this.perm[xi + 1] + yi + 1];
    return Perlin.lerp(
      Perlin.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      Perlin.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v,
    );
  }
}

// ── Multi-octave potential → curl (divergence-free flow) ──────────────────────
function buildPotential(p: Perlin, x: number, y: number, t: number): number {
  let v = 0,
    amp = 1,
    scale = 1;
  // 4 octaves of fBm — no periodic repetition, proper smoke turbulence
  for (let i = 0; i < 4; i++) {
    v += p.sample(x * scale, y * scale + t * 0.4) * amp;
    amp *= 0.5;
    scale *= 2.08;
  }
  return v;
}

const EPS = 0.06;
function curlAt(p: Perlin, x: number, y: number, t: number, baseScale: number) {
  const bx = x * baseScale,
    by = y * baseScale;
  const dpdy =
    buildPotential(p, bx, by + EPS, t) - buildPotential(p, bx, by - EPS, t);
  const dpdx =
    buildPotential(p, bx + EPS, by, t) - buildPotential(p, bx - EPS, by, t);
  return { fx: dpdy / (2 * EPS), fy: -dpdx / (2 * EPS) };
}

// ── Flow-field grid (pre-computed each frame, particles bilinear-interpolate) ─
const GW = 72,
  GH = 40; // grid resolution
const flowGrid = new Float32Array(GW * GH * 2); // [fx, fy] per cell

function updateGrid(p: Perlin, t: number, sx: number, sy: number) {
  for (let gy = 0; gy < GH; gy++) {
    for (let gx = 0; gx < GW; gx++) {
      const wx = (gx / (GW - 1) - 0.5) * sx;
      const wy = (gy / (GH - 1) - 0.5) * sy;
      const { fx, fy } = curlAt(p, wx, wy, t, 0.0025);
      const i = (gy * GW + gx) * 2;
      flowGrid[i] = fx;
      flowGrid[i + 1] = fy;
    }
  }
}

function sampleGrid(px: number, py: number, sx: number, sy: number) {
  const u = (px / sx + 0.5) * (GW - 1);
  const v = (py / sy + 0.5) * (GH - 1);
  const x0 = Math.max(0, Math.min(GW - 2, Math.floor(u)));
  const y0 = Math.max(0, Math.min(GH - 2, Math.floor(v)));
  const tx = u - x0,
    ty = v - y0;
  const i00 = (y0 * GW + x0) * 2;
  const i10 = i00 + 2;
  const i01 = ((y0 + 1) * GW + x0) * 2;
  const i11 = i01 + 2;
  return {
    fx:
      (flowGrid[i00] * (1 - tx) + flowGrid[i10] * tx) * (1 - ty) +
      (flowGrid[i01] * (1 - tx) + flowGrid[i11] * tx) * ty,
    fy:
      (flowGrid[i00 + 1] * (1 - tx) + flowGrid[i10 + 1] * tx) * (1 - ty) +
      (flowGrid[i01 + 1] * (1 - tx) + flowGrid[i11 + 1] * tx) * ty,
  };
}

// ── HSL → RGB (all 0-1) ───────────────────────────────────────────────────────
function hsl(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
}

// ── Component ─────────────────────────────────────────────────────────────────
const N = 17000;
const DIFFUSION = 0.055; // Brownian motion — breaks up streams
const DAMPING = 0.968; // higher = slower decay, smoother drift
const CURL_FORCE = 5;
const MOUSE_R = 150;

const createSprite = (): THREE.Texture => {
  const sz = 64;
  const c = document.createElement("canvas");
  c.width = c.height = sz;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(200,215,255,0.8)");
  g.addColorStop(0.65, "rgba(140,165,240,0.3)");
  g.addColorStop(1, "rgba(80,110,210,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(c);
};

const ParticlesBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = window.innerWidth,
      h = window.innerHeight;
    const sx = w * 1.15,
      sy = h * 1.15,
      sz = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, w / h, 1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0, 0);
    mount.appendChild(renderer.domElement);

    const perlin = new Perlin();

    // Particle buffers
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const baseHue = new Float32Array(N); // fixed per-particle hue base

    // Uniform initial scatter — flow field will organise them into smoke over time
    for (let i = 0; i < N; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * sx;
      pos[i * 3 + 1] = (Math.random() - 0.5) * sy;
      pos[i * 3 + 2] = (Math.random() - 0.5) * sz;
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.12;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      // Base hue from initial position angle — creates stable color zones
      baseHue[i] =
        (Math.atan2(pos[i * 3 + 1], pos[i * 3 + 0]) / (Math.PI * 2) + 0.5) % 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sprite = createSprite();
    const mat = new THREE.PointsMaterial({
      map: sprite,
      vertexColors: true,
      size: 4.8,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo, mat));

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / w - 0.5) * sx;
      mouse.y = -(e.clientY / h - 0.5) * sy;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf: number,
      t = 0,
      tc = 0; // separate faster clock for colour cycling

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.003; // slow: drives curl field (movement)
      tc += 0.003; // colour clock: ~5s per full hue rotation at 60fps

      // Re-compute flow field grid once per frame
      updateGrid(perlin, t, sx, sy);

      const hx = sx / 2,
        hy = sy / 2,
        hz = sz / 2;

      for (let i = 0; i < N; i++) {
        const xi = i * 3,
          yi = i * 3 + 1,
          zi = i * 3 + 2;
        const px = pos[xi],
          py = pos[yi];

        // Curl noise from grid
        const { fx, fy } = sampleGrid(px, py, sx, sy);
        vel[xi] += fx * CURL_FORCE * 0.001;
        vel[yi] += fy * CURL_FORCE * 0.001;

        // Diffusion — Brownian motion prevents clustering / stripes
        vel[xi] += (Math.random() - 0.5) * DIFFUSION;
        vel[yi] += (Math.random() - 0.5) * DIFFUSION;

        // Mouse repulsion
        const dx = px - mouse.x,
          dy = py - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
          const inv = 1 / Math.sqrt(d2);
          const str = ((MOUSE_R - Math.sqrt(d2)) / MOUSE_R) * 0.55;
          vel[xi] += dx * inv * str;
          vel[yi] += dy * inv * str;
        }

        vel[xi] *= DAMPING;
        vel[yi] *= DAMPING;
        pos[xi] += vel[xi];
        pos[yi] += vel[yi];

        // Wrap
        if (pos[xi] > hx) pos[xi] = -hx;
        else if (pos[xi] < -hx) pos[xi] = hx;
        if (pos[yi] > hy) pos[yi] = -hy;
        else if (pos[yi] < -hy) pos[yi] = hy;
        if (pos[zi] > hz) pos[zi] = -hz;
        else if (pos[zi] < -hz) pos[zi] = hz;

        // Colour: base hue shifts on faster clock, zone-based saturation
        const dist = Math.min(1, Math.hypot(px, py) / (sx * 0.42));
        const hue = (baseHue[i] + tc) % 1;
        const sat = 0.45 + dist * 0.4;
        const lig = 0.85 - dist * 0.25;
        const [r, g, b] = hsl(hue, sat, lig);
        colors[xi] = r;
        colors[yi] = g;
        colors[zi] = b;
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    />
  );
};

export default ParticlesBackground;
