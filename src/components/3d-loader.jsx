"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeARHitTest({ modelUrl }) {
  const containerRef = useRef();

  useEffect(() => {
    let container;
    let camera, scene, renderer;
    let controller;
    let reticle;
    let model;
    let hitTestSource = null;
    let hitTestSourceRequested = false;

    function init() {
      container = document.createElement("div");
      containerRef.current.appendChild(container);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
      );

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
      light.position.set(0.5, 1, 0.25);
      scene.add(light);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      container.appendChild(renderer.domElement);

      document.body.appendChild(
        ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
      );

      controller = renderer.xr.getController(0);
      controller.addEventListener("select", onSelect);
      scene.add(controller);

      reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      reticle.matrixAutoUpdate = false;
      reticle.visible = false;
      scene.add(reticle);

      loadModel(modelUrl);

      window.addEventListener("resize", onWindowResize);

      animate();
    }

    function loadModel(url) {
      const loader = new GLTFLoader();
      loader.load(
        url,
        (gltf) => {
          model = gltf.scene;
          // Increase scale here. Experiment with different values.
          model.scale.set(1, 1, 1); // Example: Scaling up to natural size
          model.visible = false; // Make model initially invisible
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("An error happened loading the model", error);
        }
      );
    }

    function onSelect() {
      if (reticle.visible && model) {
        model.position.setFromMatrixPosition(reticle.matrix);
        model.quaternion.setFromRotationMatrix(reticle.matrix);
        model.visible = true; // Make the model visible
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.setAnimationLoop((timestamp, frame) => render(timestamp, frame));
    }

    function render(timestamp, frame) {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (!hitTestSourceRequested) {
          session.requestReferenceSpace("viewer").then((referenceSpace) => {
            session
              .requestHitTestSource({ space: referenceSpace })
              .then((source) => {
                hitTestSource = source;
              });
          });

          session.addEventListener("end", () => {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });

          hitTestSourceRequested = true;
        }

        if (hitTestSource) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length) {
            const hit = hitTestResults[0];
            reticle.visible = true;
            reticle.matrix.fromArray(
              hit.getPose(referenceSpace).transform.matrix
            );
          } else {
            reticle.visible = false;
          }
        }
      }

      renderer.render(scene, camera);
    }

    init();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
      if (container) {
        container.remove();
      }
      window.removeEventListener("resize", onWindowResize);
    };
  }, [modelUrl]); // Re-run effect if modelUrl changes

  return <div ref={containerRef}></div>;
}

export default ThreeARHitTest;
