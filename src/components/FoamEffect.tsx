import { useEffect, useRef } from "react";
import * as THREE from "three";

const BUBBLE_COUNT = 1200;
const DRIP_COUNT = 200;
const FOAM_BAND_HEIGHT = 120; // px height of the foam band

const FoamEffect = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, -window.innerHeight, -1, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── State ──────────────────────────────────────────────
    let phase: "idle" | "exploding" | "foam" = "idle";
    let explosionProgress = 0;
    let hasScrolled = false;
    let scrollY = 0;
    let targetBandY = 0; // where the foam band should be (screen coords)
    let currentBandY = 0;

    // ── Bubble textures ───────────────────────────────────
    const createBubbleTexture = (size: number, opacity: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      // Outer bubble
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.1})`);
      grad.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.25})`);
      grad.addColorStop(0.7, `rgba(255, 255, 255, ${opacity * 0.5})`);
      grad.addColorStop(0.85, `rgba(255, 255, 255, ${opacity * 0.7})`);
      grad.addColorStop(0.95, `rgba(255, 255, 255, ${opacity * 0.3})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Highlight
      const hlGrad = ctx.createRadialGradient(
        size * 0.38, size * 0.35, 0,
        size * 0.38, size * 0.35, size * 0.18
      );
      hlGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
      hlGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = hlGrad;
      ctx.fillRect(0, 0, size, size);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const bubbleTex = createBubbleTexture(64, 1);

    // ── Foam bubbles (main band) ──────────────────────────
    const bubblePositions = new Float32Array(BUBBLE_COUNT * 3);
    const bubbleSizes = new Float32Array(BUBBLE_COUNT);
    const bubbleAlphas = new Float32Array(BUBBLE_COUNT);
    // Per-bubble data
    const bubbleHomeX = new Float32Array(BUBBLE_COUNT);
    const bubbleHomeYOffset = new Float32Array(BUBBLE_COUNT); // offset within band
    const bubbleVx = new Float32Array(BUBBLE_COUNT);
    const bubbleVy = new Float32Array(BUBBLE_COUNT);
    const bubbleWobblePhase = new Float32Array(BUBBLE_COUNT);
    const bubbleWobbleSpeed = new Float32Array(BUBBLE_COUNT);

    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      // Start position: center of screen (for explosion)
      bubblePositions[i * 3] = W / 2;
      bubblePositions[i * 3 + 1] = -H / 2;
      bubblePositions[i * 3 + 2] = 0;

      const size = 4 + Math.random() * 18;
      bubbleSizes[i] = size;
      bubbleAlphas[i] = 0;

      // Home position: spread across full width
      bubbleHomeX[i] = Math.random() * W;
      // Y offset within band (-1 to 1, denser near 0, sparser at edges)
      const r = Math.random();
      bubbleHomeYOffset[i] = (r * r * (Math.random() < 0.5 ? -1 : 1)) * FOAM_BAND_HEIGHT / 2;
      // Larger bubbles near bottom (dripping effect)
      if (bubbleHomeYOffset[i] > FOAM_BAND_HEIGHT * 0.3) {
        bubbleSizes[i] *= 0.6;
      }

      bubbleVx[i] = (Math.random() - 0.5) * 8;
      bubbleVy[i] = (Math.random() - 0.5) * 8;
      bubbleWobblePhase[i] = Math.random() * Math.PI * 2;
      bubbleWobbleSpeed[i] = 0.5 + Math.random() * 1.5;
    }

    const bubbleGeometry = new THREE.BufferGeometry();
    bubbleGeometry.setAttribute("position", new THREE.BufferAttribute(bubblePositions, 3));
    bubbleGeometry.setAttribute("aSize", new THREE.BufferAttribute(bubbleSizes, 1));
    bubbleGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(bubbleAlphas, 1));

    const bubbleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTexture: { value: bubbleTex },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uPixelRatio;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying float vAlpha;
        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(texColor.rgb, texColor.a * vAlpha);
        }
      `,
    });

    const bubblePoints = new THREE.Points(bubbleGeometry, bubbleMaterial);
    scene.add(bubblePoints);

    // ── Drip particles ────────────────────────────────────
    const dripPositions = new Float32Array(DRIP_COUNT * 3);
    const dripSizes = new Float32Array(DRIP_COUNT);
    const dripAlphas = new Float32Array(DRIP_COUNT);
    const dripVy = new Float32Array(DRIP_COUNT);
    const dripActive = new Uint8Array(DRIP_COUNT);

    for (let i = 0; i < DRIP_COUNT; i++) {
      dripPositions[i * 3] = 0;
      dripPositions[i * 3 + 1] = 0;
      dripPositions[i * 3 + 2] = 0;
      dripSizes[i] = 2 + Math.random() * 6;
      dripAlphas[i] = 0;
      dripVy[i] = 0;
      dripActive[i] = 0;
    }

    const dripGeometry = new THREE.BufferGeometry();
    dripGeometry.setAttribute("position", new THREE.BufferAttribute(dripPositions, 3));
    dripGeometry.setAttribute("aSize", new THREE.BufferAttribute(dripSizes, 1));
    dripGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(dripAlphas, 1));

    const dripPoints = new THREE.Points(dripGeometry, bubbleMaterial);
    scene.add(dripPoints);

    // ── Scroll handler ────────────────────────────────────
    const handleScroll = () => {
      scrollY = window.scrollY;
      if (!hasScrolled && scrollY > 10) {
        hasScrolled = true;
        phase = "exploding";
        explosionProgress = 0;
        // Give each bubble an explosion velocity
        for (let i = 0; i < BUBBLE_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 5 + Math.random() * 15;
          bubbleVx[i] = Math.cos(angle) * speed;
          bubbleVy[i] = Math.sin(angle) * speed;
        }
      }
    };

    // ── Find section title Y positions ────────────────────
    const getSectionTitleY = (): number => {
      // Find the section header closest to being at top of viewport
      const headers = document.querySelectorAll(".section-header, .hero-content");
      let bestY = 200; // default: near top

      for (const header of headers) {
        const rect = header.getBoundingClientRect();
        // Find the header that's closest to the top third of the viewport
        if (rect.top > -100 && rect.top < H * 0.7) {
          bestY = rect.top + rect.height / 2;
          break;
        }
      }

      return bestY;
    };

    // ── Animation loop ────────────────────────────────────
    let time = 0;
    let dripTimer = 0;

    const animate = () => {
      time += 0.016;
      dripTimer += 0.016;

      // Update target band position
      if (phase === "foam") {
        targetBandY = getSectionTitleY();
      }

      // Smooth follow
      currentBandY += (targetBandY - currentBandY) * 0.05;

      // ── Phase: idle ──
      if (phase === "idle") {
        for (let i = 0; i < BUBBLE_COUNT; i++) {
          bubbleAlphas[i] = Math.min(bubbleAlphas[i] + 0.005, 0.4);
          // Gentle wobble at center
          const wobble = Math.sin(time * bubbleWobbleSpeed[i] + bubbleWobblePhase[i]);
          bubblePositions[i * 3] = W / 2 + wobble * 30 + (bubbleHomeX[i] - W / 2) * 0.05;
          bubblePositions[i * 3 + 1] = -(H / 2) + Math.sin(time * 0.5 + i) * 10;
        }
      }

      // ── Phase: exploding ──
      if (phase === "exploding") {
        explosionProgress += 0.016;

        for (let i = 0; i < BUBBLE_COUNT; i++) {
          // Apply explosion velocity with friction
          bubblePositions[i * 3] += bubbleVx[i];
          bubblePositions[i * 3 + 1] += bubbleVy[i]; // Note: negative Y is down in ortho
          bubbleVx[i] *= 0.96;
          bubbleVy[i] *= 0.96;

          bubbleAlphas[i] = Math.min(bubbleAlphas[i] + 0.02, 0.9);
        }

        // After explosion, transition to foam
        if (explosionProgress > 1.2) {
          phase = "foam";
          targetBandY = getSectionTitleY();
          currentBandY = targetBandY;
        }
      }

      // ── Phase: foam ──
      if (phase === "foam") {
        const bandCenterY = -currentBandY; // Convert to Three.js coords (negative Y is down)

        for (let i = 0; i < BUBBLE_COUNT; i++) {
          // Target position
          const tx = bubbleHomeX[i];
          const ty = bandCenterY + bubbleHomeYOffset[i];

          // Wobble
          const wobbleX = Math.sin(time * bubbleWobbleSpeed[i] + bubbleWobblePhase[i]) * 3;
          const wobbleY = Math.cos(time * bubbleWobbleSpeed[i] * 0.7 + bubbleWobblePhase[i]) * 2;

          // Smoothly move to target
          const px = bubblePositions[i * 3];
          const py = bubblePositions[i * 3 + 1];
          bubblePositions[i * 3] = px + (tx + wobbleX - px) * 0.03;
          bubblePositions[i * 3 + 1] = py + (ty + wobbleY - py) * 0.03;

          // Alpha: full in center, fade at edges
          const distFromCenter = Math.abs(bubblePositions[i * 3 + 1] - bandCenterY);
          const bandFade = 1 - Math.pow(distFromCenter / (FOAM_BAND_HEIGHT * 0.6), 2);
          bubbleAlphas[i] += (Math.max(0.1, Math.min(0.85, bandFade)) - bubbleAlphas[i]) * 0.05;
        }

        // ── Drip particles ──
        if (dripTimer > 0.08) {
          dripTimer = 0;
          // Spawn a drip
          for (let i = 0; i < DRIP_COUNT; i++) {
            if (!dripActive[i]) {
              dripActive[i] = 1;
              dripPositions[i * 3] = Math.random() * W;
              dripPositions[i * 3 + 1] = bandCenterY + FOAM_BAND_HEIGHT * 0.4;
              dripAlphas[i] = 0.4 + Math.random() * 0.3;
              dripVy[i] = -(0.5 + Math.random() * 1.5); // fall down
              dripSizes[i] = 2 + Math.random() * 5;
              break;
            }
          }
        }

        // Update drips
        for (let i = 0; i < DRIP_COUNT; i++) {
          if (dripActive[i]) {
            dripPositions[i * 3 + 1] += dripVy[i];
            dripVy[i] -= 0.02; // gravity
            dripAlphas[i] -= 0.004;

            // Elongate while falling (stretch)
            dripSizes[i] = Math.max(1, dripSizes[i] - 0.01);

            if (dripAlphas[i] <= 0 || dripPositions[i * 3 + 1] < -(H + 100)) {
              dripActive[i] = 0;
              dripAlphas[i] = 0;
            }
          }
        }
      }

      // Update buffers
      bubbleGeometry.attributes.position.needsUpdate = true;
      bubbleGeometry.attributes.aAlpha.needsUpdate = true;
      dripGeometry.attributes.position.needsUpdate = true;
      dripGeometry.attributes.aAlpha.needsUpdate = true;
      dripGeometry.attributes.aSize.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // ── Resize ────────────────────────────────────────────
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.right = w;
      camera.bottom = -h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      bubbleGeometry.dispose();
      bubbleMaterial.dispose();
      dripGeometry.dispose();
      bubbleTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
};

export default FoamEffect;
