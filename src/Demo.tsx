import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

interface BoxProps {
  position: [number, number, number];
}

const Pepsi = () => {
  const gltf = useLoader(GLTFLoader, '/pepsi/scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={20} position={[3, 0, 0]} />
    </>
  );
};

const Neutrogena = () => {
  const gltf = useLoader(GLTFLoader, '/neutrogena/scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[-3, 0, 0]} />
    </>
  );
};

function Box(props: BoxProps) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null as any);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Demo() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
        <Neutrogena />
        <Pepsi />
        <OrbitControls />
      </Canvas>
    </>
  );
}
