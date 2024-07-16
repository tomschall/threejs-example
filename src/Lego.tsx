import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import * as THREE from 'three';

const Neutrogena = () => {
  const groupRef = useRef<THREE.Group>(null);
  const svgData = useLoader(SVGLoader, '/lego.svg'); // Update with your SVG path
  const gltf = useLoader(GLTFLoader, '/neutrogena/scene.gltf');

  useEffect(() => {
    if (groupRef.current && svgData) {
      const scene = gltf.scene;
      const mesh = scene.getObjectByProperty('type', 'Mesh') as THREE.Mesh;

      if (mesh) {
        // Convert SVG to texture
        const svgGroup = new THREE.Group();
        svgData.paths.forEach((path) => {
          const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false,
          });

          const shapes = path.toShapes(true);

          shapes.forEach((shape) => {
            const geometry = new THREE.ShapeGeometry(shape);
            const svgMesh = new THREE.Mesh(geometry, material);
            svgGroup.add(svgMesh);
          });
        });

        // Adjust position and scale of the SVG group
        svgGroup.scale.set(0.05, 0.05, 0.05); // Adjust scale if needed
        svgGroup.position.set(-5, 20, 10); // Adjust position if needed

        // Add SVG group to the main group
        groupRef.current.add(svgGroup);
      }
    }
  }, [gltf, svgData]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={gltf.scene} rotation={[0.2, 0, 0]} scale={10} />
    </group>
  );
};

export default function Demo() {
  return (
    <Canvas style={{ background: 'white' }}>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>
        <Neutrogena />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
