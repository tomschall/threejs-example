import { Suspense } from 'react';
import { Decal, OrbitControls, useTexture } from '@react-three/drei';

export const Experience = () => {
  const texture = useTexture('/lego.svg');

  return (
    <>
      <Suspense fallback={null}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} /> {/* Größe des Würfels */}
          <meshNormalMaterial />
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            polygonOffsetFactor={-1}
          >
            <meshBasicMaterial map={texture} />
          </Decal>
        </mesh>
        <OrbitControls />
      </Suspense>
    </>
  );
};
