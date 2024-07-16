import { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';
import * as THREE from 'three';
import { DecalGeometry } from 'three-stdlib';

const Neutrogena = () => {
  const groupRef = useRef<THREE.Group>(null);
  const decalMesh = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, '/neutrogena/scene.gltf');
  const decalTexture = useLoader(
    THREE.TextureLoader,
    '/decal/png-2702691_640.png'
  ); // Update with your decal path

  useEffect(() => {
    if (groupRef.current && decalTexture) {
      // Find the mesh within the GLTF scene
      const mesh = groupRef.current.getObjectByProperty(
        'type',
        'Mesh'
      ) as THREE.Mesh;
      if (mesh) {
        const position = new THREE.Vector3(1, 1, 1); // Adjust the position to where you want the decal
        const rotation = new THREE.Euler(0, 0, 0); // No rotation needed
        const scale = new THREE.Vector3(20, 20, 20); // Adjust the scale if needed

        const decalGeometry = new DecalGeometry(
          mesh,
          position,
          rotation,
          scale
        );
        if (decalMesh.current) {
          decalMesh.current.geometry = decalGeometry;
        }
      }
    }
  }, [gltf, decalTexture]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={gltf.scene} rotation={[0, 0, 0]} scale={1} />
      {/* No rotation applied */}
      <mesh ref={decalMesh} rotation={[Math.PI / 2, Math.PI, Math.PI]}>
        <meshStandardMaterial map={decalTexture} transparent />
      </mesh>
    </group>
  );
};

export default function Demo() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
        <Neutrogena />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
