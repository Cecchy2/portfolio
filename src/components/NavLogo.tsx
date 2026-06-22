import { useEffect, useRef } from "react";
import * as THREE from "three";

const NavLogo = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const SIZE = 38;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Outer icosahedron – amber wireframe
    const outerGeo = new THREE.IcosahedronGeometry(28, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.9,
    });
    const outerIco = new THREE.LineSegments(outerEdges, outerMat);
    scene.add(outerIco);

    // Inner icosahedron – white, counter-rotates
    const innerGeo = new THREE.IcosahedronGeometry(16, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    });
    const innerIco = new THREE.LineSegments(innerEdges, innerMat);
    scene.add(innerIco);

    // Vertex dots
    const posAttr = outerGeo.getAttribute("position");
    const seen = new Set<string>();
    const pts: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
      const k = `${x.toFixed(1)},${y.toFixed(1)},${z.toFixed(1)}`;
      if (!seen.has(k)) { seen.add(k); pts.push(x, y, z); }
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xfbbf24, size: 3.5, transparent: true, opacity: 1, sizeAttenuation: true,
    });
    outerIco.add(new THREE.Points(dotGeo, dotMat));

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      outerIco.rotation.x += 0.006;
      outerIco.rotation.y += 0.009;
      innerIco.rotation.x -= 0.007;
      innerIco.rotation.y += 0.010;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      outerEdges.dispose();
      innerEdges.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      dotGeo.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: 38, height: 38, display: "inline-block", verticalAlign: "middle" }}
    />
  );
};

export default NavLogo;
