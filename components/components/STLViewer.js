import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const STLViewer = ({ url }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    // Sahne Kurulumu
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Işıklandırma
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // STL Yükleme
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      const material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Modeli merkeze al
      geometry.center();
      scene.add(mesh);
      
      camera.position.z = 150;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, [url]);

  return <div ref={mountRef} className="border-2 border-dashed border-gray-300 rounded-lg" />;
};

export default STLViewer;