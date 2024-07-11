import { Canvas, useLoader } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import {
  Gltf,
  Environment,
  Fisheye,
  KeyboardControls,
} from '@react-three/drei';
import Controller from 'ecctrl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Neutrogena = () => {
  const gltf = useLoader(GLTFLoader, '/neutrogena/scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={1} position={[1, 0, 0]} />
    </>
  );
};

export default function App() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ];
  return (
    <Canvas shadows>
      <Fisheye zoom={0.4}>
        <Environment files="/fisheye/night.hdr" ground={{ scale: 100 }} />
        <directionalLight
          intensity={2}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-20, 20, 20, -20]}
          />
        </directionalLight>
        <ambientLight intensity={0.2} />
        <Physics timeStep="vary">
          <Gltf
            castShadow
            receiveShadow
            scale={15}
            position={[0, -1, 0]}
            src="/pepsi/pepsi_can.glb"
          />
          <KeyboardControls map={keyboardMap}>
            <Controller maxVelLimit={10}>
              <Neutrogena />
            </Controller>
          </KeyboardControls>
          <RigidBody type="fixed" colliders="cuboid" position={[0, -1, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[50, 1, 50]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </RigidBody>
        </Physics>
      </Fisheye>
    </Canvas>
  );
}
