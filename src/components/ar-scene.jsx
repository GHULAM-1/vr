"use client";
import "aframe";
import "aframe-ar";

export default function ARScene() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <a-scene
          webxr="optionalFeatures:  hit-test;"
          ar-hit-test="target:#myobject;"
        >
          <a-assets>
            <a-asset-item id="model" src="/leninade/scene.gltf"></a-asset-item>
          </a-assets>
          <a-entity
            gltf-model="#model"
            scale="2 2 2"
            position="0 0.5 0"
            animation-mixer
          ></a-entity>
          <a-camera-static />
        </a-scene>
      </div>
    </div>
  );
}

// "use client";
// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// const ThreeScene = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

//     // Add ambient light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//     scene.add(ambientLight);

//     // Add directional light
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(0, 1, 0);
//     scene.add(directionalLight);

//     // Load 3D model
//     const loader = new GLTFLoader();
//     loader.load(
//       "/leninade/scene.gltf",
//       (gltf) => {
//         scene.add(gltf.scene);
//       },
//       undefined,
//       (error) => {
//         console.error("Error loading 3D model:", error);
//       }
//     );

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     }
//     animate();

//     return () => {
//       // Cleanup
//     };
//   }, []);

//   return <canvas ref={canvasRef} />;
// };

// export default ThreeScene;
// components/ARScene.js
