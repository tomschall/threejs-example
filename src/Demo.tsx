import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';

export default function Demo() {
  return (
    <Canvas camera={{ position: [-1, -1, -1], fov: 100 }}>
      <Experience />
    </Canvas>
  );
}
