import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (w === 0 || h === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Outer icosahedron wireframe (amber) ──────────────────────────────────
    const outerGeo = new THREE.IcosahedronGeometry(130, 2);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
    });
    const outerIco = new THREE.LineSegments(outerEdges, outerMat);
    scene.add(outerIco);

    // ── Inner icosahedron (white, counter-rotates) ───────────────────────────
    const innerGeo = new THREE.IcosahedronGeometry(72, 1);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    });
    const innerIco = new THREE.LineSegments(innerEdges, innerMat);
    scene.add(innerIco);

    // ── Octahedron accent (rotates on different axis) ────────────────────────
    const octaGeo = new THREE.OctahedronGeometry(95, 0);
    const octaEdges = new THREE.EdgesGeometry(octaGeo);
    const octaMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.12,
    });
    const octa = new THREE.LineSegments(octaEdges, octaMat);
    scene.add(octa);

    // ── Vertex glow dots on outer ico ────────────────────────────────────────
    const posAttr = outerGeo.getAttribute("position");
    const uniqueKeys = new Set<string>();
    const dotPositionsArr: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        dotPositionsArr.push(x, y, z);
      }
    }
    const dotPositions = new Float32Array(dotPositionsArr);
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 5.5,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    outerIco.add(dots);


    // ── Scattered ambient particles ───────────────────────────────────────────
    const N_SCATTER = 700;
    const scatterPos = new Float32Array(N_SCATTER * 3);
    for (let i = 0; i < N_SCATTER; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 150 + Math.random() * 90;
      scatterPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      scatterPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      scatterPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const scatterGeo = new THREE.BufferGeometry();
    scatterGeo.setAttribute("position", new THREE.BufferAttribute(scatterPos, 3));
    const scatterMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.4,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(scatterGeo, scatterMat));

    // ── Mouse parallax ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;

      outerIco.rotation.x += 0.0028;
      outerIco.rotation.y += 0.0045;
      innerIco.rotation.x -= 0.003;
      innerIco.rotation.y += 0.005;
      octa.rotation.x += 0.002;
      octa.rotation.z -= 0.003;

      scene.rotation.x = smooth.y * 0.18;
      scene.rotation.y = smooth.x * 0.18;


      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      outerEdges.dispose();
      innerEdges.dispose();
      octaEdges.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      octaGeo.dispose();
      dotGeo.dispose();
      scatterGeo.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", minHeight: "380px" }}
    />
  );
};

export default HeroScene;
