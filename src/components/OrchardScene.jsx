import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

const palette = {
  soil: '#8e7054',
  grass: '#698c57',
  grassTop: '#7f9d67',
  foliage: ['#507449', '#688854', '#799965', '#466942', '#8da772'],
  trunk: '#715941',
  house: '#f5ead5',
  roof: '#8d6547',
  water: '#8cbdb0',
};

function Tree({ position, scale = 1, tone = 0 }) {
  const leafColor = palette.foliage[tone % palette.foliage.length];
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.095, 0.14, 1.15, 8]} />
        <meshStandardMaterial color={palette.trunk} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 1.26, 0]}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial color={leafColor} roughness={0.94} flatShading />
      </mesh>
      <mesh castShadow position={[-0.31, 1.11, 0.04]}>
        <icosahedronGeometry args={[0.38, 2]} />
        <meshStandardMaterial color={palette.foliage[(tone + 1) % 5]} roughness={0.98} flatShading />
      </mesh>
      <mesh castShadow position={[0.33, 1.16, -0.05]}>
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial color={palette.foliage[(tone + 2) % 5]} roughness={0.94} flatShading />
      </mesh>
      <mesh castShadow position={[0.08, 1.61, 0.08]}>
        <icosahedronGeometry args={[0.34, 2]} />
        <meshStandardMaterial color={leafColor} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function House() {
  return (
    <group position={[0.38, -0.47, -0.63]} rotation={[0, 0.23, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.47, 0]}>
        <boxGeometry args={[1.36, 0.92, 1.2]} />
        <meshStandardMaterial color={palette.house} roughness={0.96} />
      </mesh>
      <mesh castShadow position={[-0.37, 1.16, 0]} rotation={[0, 0, 0.62]}>
        <boxGeometry args={[1.08, 0.12, 1.52]} />
        <meshStandardMaterial color={palette.roof} roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0.37, 1.16, 0]} rotation={[0, 0, -0.62]}>
        <boxGeometry args={[1.08, 0.12, 1.52]} />
        <meshStandardMaterial color={palette.roof} roughness={0.88} />
      </mesh>
      <mesh position={[0.05, 0.37, 0.609]}>
        <boxGeometry args={[0.36, 0.66, 0.025]} />
        <meshStandardMaterial color="#725e48" roughness={0.95} />
      </mesh>
      <mesh position={[-0.44, 0.63, 0.62]}>
        <boxGeometry args={[0.25, 0.25, 0.035]} />
        <meshStandardMaterial color="#b6ccc0" metalness={0.04} roughness={0.2} />
      </mesh>
      <mesh position={[0.49, 0.63, 0.62]}>
        <boxGeometry args={[0.25, 0.25, 0.035]} />
        <meshStandardMaterial color="#b6ccc0" metalness={0.04} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0, -0.03, 0.91]}>
        <boxGeometry args={[1.55, 0.1, 0.65]} />
        <meshStandardMaterial color="#c5b090" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Pond() {
  return (
    <group position={[-1.22, -0.484, 0.78]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1.17, 0.64, 1]} receiveShadow>
        <circleGeometry args={[0.58, 64]} />
        <meshPhysicalMaterial color={palette.water} metalness={0.14} roughness={0.19} transparent opacity={0.9} clearcoat={0.65} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.008, 0]} scale={[1.25, 0.7, 1]}>
        <ringGeometry args={[0.515, 0.58, 64]} />
        <meshStandardMaterial color="#d3c59f" roughness={0.96} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Bird({ position, rotation = 0, size = 1 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={size}>
      <mesh rotation={[0, 0, -0.35]} position={[-0.1, 0, 0]}>
        <torusGeometry args={[0.13, 0.012, 5, 16, Math.PI]} />
        <meshBasicMaterial color="#f5dfb8" />
      </mesh>
      <mesh rotation={[0, 0, -0.35]} position={[0.1, 0, 0]}>
        <torusGeometry args={[0.13, 0.012, 5, 16, Math.PI]} />
        <meshBasicMaterial color="#f5dfb8" />
      </mesh>
    </group>
  );
}

const trees = [
  [-1.64, -0.43, -0.65, 0.72, 0],
  [-2.07, -0.44, 0.28, 0.55, 2],
  [-1.17, -0.43, -1.33, 0.64, 3],
  [1.61, -0.45, -0.76, 0.65, 1],
  [1.96, -0.42, -0.06, 0.57, 4],
  [1.63, -0.44, 0.88, 0.67, 0],
  [0.67, -0.44, -1.83, 0.6, 3],
  [-0.43, -0.43, -1.89, 0.62, 1],
];

const steppingStones = Array.from({ length: 9 }, (_, i) => {
  const z = 1.93 - i * 0.247;
  return { x: 0.4 + Math.sin(i * 0.56) * 0.17, z, s: 0.82 + (i % 3) * 0.08 };
});

function Island() {
  const world = useRef();
  const specks = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    x: Math.sin(i * 1.92) * (1.25 + (i % 7) * 0.29),
    y: 1.7 + (i % 9) * 0.22,
    z: Math.cos(i * 1.26) * (0.8 + (i % 5) * 0.29),
    size: 0.011 + (i % 3) * 0.007,
  })), []);

  useFrame(({ clock, pointer }) => {
    if (!world.current) return;
    const t = clock.getElapsedTime();
    const ry = -0.23 + Math.sin(t * 0.17) * 0.045 + pointer.x * 0.12;
    const rx = 0.07 - pointer.y * 0.047;
    world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, ry, 0.035);
    world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, rx, 0.035);
    world.current.position.y = Math.sin(t * 0.85) * 0.042;
  });

  return (
    <group ref={world} rotation={[0, -0.23, 0]} position={[0, -0.25, 0]}>
      <mesh castShadow receiveShadow position={[0, -0.82, 0]}>
        <cylinderGeometry args={[2.47, 2.28, 0.54, 72]} />
        <meshStandardMaterial color={palette.soil} roughness={0.99} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.51, 0]}>
        <cylinderGeometry args={[2.52, 2.47, 0.11, 72]} />
        <meshStandardMaterial color={palette.grassTop} roughness={0.97} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <torusGeometry args={[2.33, 0.045, 8, 96]} />
        <meshStandardMaterial color="#b19169" roughness={0.94} />
      </mesh>
      <Pond />
      {steppingStones.map((stone, i) => (
        <mesh key={i} castShadow receiveShadow rotation={[-Math.PI / 2, 0, i * 0.14]} position={[stone.x, -0.434, stone.z]} scale={[stone.s, 1, 0.75]}>
          <circleGeometry args={[0.21, 16]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#dfd4bc' : '#e9ddc3'} roughness={1} />
        </mesh>
      ))}
      <House />
      {trees.map(([x, y, z, scale, tone], i) => <Tree key={i} position={[x, y, z]} scale={scale} tone={tone} />)}
      {Array.from({ length: 7 }, (_, i) => {
        const x = -1.73 + i * 0.16;
        return <mesh key={i} position={[x, -0.365, 1.57]} castShadow>
          <boxGeometry args={[0.043, 0.38, 0.047]} />
          <meshStandardMaterial color="#dac7a4" roughness={1} />
        </mesh>;
      })}
      <mesh castShadow position={[-1.25, -0.22, 1.57]}>
        <boxGeometry args={[1.13, 0.04, 0.04]} />
        <meshStandardMaterial color="#dac7a4" roughness={1} />
      </mesh>
      <mesh castShadow position={[-1.25, -0.36, 1.57]}>
        <boxGeometry args={[1.13, 0.04, 0.04]} />
        <meshStandardMaterial color="#dac7a4" roughness={1} />
      </mesh>
      {specks.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color="#f9e6bb" transparent opacity={0.54} />
        </mesh>
      ))}
      <Bird position={[-1.65, 2.55, -0.1]} rotation={0.25} size={0.8} />
      <Bird position={[-1.14, 2.73, -0.2]} rotation={-0.16} size={0.48} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.75} color="#fff4dc" />
      <hemisphereLight intensity={1.3} color="#ecf3dc" groundColor="#85684e" />
      <directionalLight castShadow position={[3.5, 8, 5]} intensity={3.2} color="#ffe7b6" shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={22} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
      <pointLight position={[-5, 3, -2]} intensity={1.1} color="#c3eed2" />
      <Float speed={1.0} floatIntensity={0.04} rotationIntensity={0.015}>
        <Island />
      </Float>
      <ContactShadows opacity={0.21} scale={9} blur={2.3} far={4.5} resolution={256} color="#1c2a1b" position={[0, -1.73, 0]} />
    </>
  );
}

export default function OrchardScene() {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="hero-3d-fallback" aria-label="Garden and nature photograph" />;
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [6.9, 4.35, 8.65], fov: 33, near: 0.1, far: 100 }}
      shadows
      dpr={[1, 1.7]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
      onError={() => setFailed(true)}
      aria-label="Interactive 3D miniature of the Kumar Agro Tourism gardens"
    >
      <Scene />
    </Canvas>
  );
}
