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
  const foliage = palette.foliage;
  const clusters = [
    [-0.27, 1.28, -0.1, .48, .43, .48],
    [0.28, 1.31, 0.02, .52, .41, .46],
    [0.02, 1.56, -0.13, .52, .48, .50],
    [-0.04, 1.24, 0.32, .45, .39, .48],
    [0.36, 1.63, 0.17, .34, .33, .40],
    [-0.35, 1.63, 0.06, .33, .30, .39],
    [-0.02, 1.84, -0.08, .34, .26, .35],
  ];
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, .61, 0]}>
        <cylinderGeometry args={[.087, .17, 1.19, 10]} />
        <meshStandardMaterial color={palette.trunk} roughness={.99} />
      </mesh>
      <mesh castShadow position={[-.19, 1.15, -.06]} rotation={[.21, 0, .49]}>
        <cylinderGeometry args={[.045, .09, .65, 8]} />
        <meshStandardMaterial color="#74533b" roughness={1} />
      </mesh>
      <mesh castShadow position={[.22, 1.15, .02]} rotation={[.08, 0, -.51]}>
        <cylinderGeometry args={[.035, .075, .63, 8]} />
        <meshStandardMaterial color="#74533b" roughness={1} />
      </mesh>
      {clusters.map(([x,y,z,sx,sy,sz],i)=>(
        <mesh castShadow receiveShadow key={i} position={[x,y,z]} scale={[sx,sy,sz]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={foliage[(tone+i)%foliage.length]} roughness={.93} />
        </mesh>
      ))}
      {[[-.28,1.12,.27],[.34,1.22,.26],[-.05,1.51,.38]].map((pos,i)=>(
        <mesh key={'fruit-'+i} position={pos}>
          <sphereGeometry args={[.057, 10, 8]} />
          <meshStandardMaterial color={i===1?'#dcae5a':'#c69c47'} roughness={.54}/>
        </mesh>
      ))}
    </group>
  );
}


const ZIPLINE_START = new THREE.Vector3(-1.82, 2.72, -0.04);
const ZIPLINE_END = new THREE.Vector3(1.79, 1.85, 0.54);

function ZiplineTower({ landing = false }) {
  const x = landing ? 1.82 : -1.84;
  const z = landing ? 0.53 : -0.04;
  const deckY = landing ? 1.28 : 1.76;
  const wood = '#a17a59';
  return (
    <group position={[x, -0.43, z]}>
      {[-0.31, 0.31].flatMap((dx,i) => [-0.27, 0.27].map((dz,j) => (
        <mesh key={i+'-'+j} castShadow position={[dx, deckY/2, dz]}>
          <cylinderGeometry args={[0.052, 0.068, deckY, 8]} />
          <meshStandardMaterial color={wood} roughness={0.96} />
        </mesh>
      )))}
      <mesh castShadow position={[0, deckY, 0]}>
        <boxGeometry args={[0.93, 0.13, 0.78]}/>
        <meshStandardMaterial color="#decbaa" roughness={0.93}/>
      </mesh>
      {[-0.32,0.32].map((dx,i) => (
        <mesh key={'rail'+i} castShadow position={[dx, deckY+0.27,-0.28]}>
          <boxGeometry args={[0.07,0.57,0.065]}/>
          <meshStandardMaterial color={wood} roughness={0.94}/>
        </mesh>
      ))}
      <mesh castShadow position={[0, deckY+0.54,-0.28]}>
        <boxGeometry args={[0.75, 0.06,0.06]}/>
        <meshStandardMaterial color={wood} roughness={0.94}/>
      </mesh>
    </group>
  );
}

function ZiplineCable() {
  const difference = ZIPLINE_END.clone().sub(ZIPLINE_START);
  const middle = ZIPLINE_START.clone().add(ZIPLINE_END).multiplyScalar(0.5);
  const orientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0,1,0), difference.clone().normalize()
  );
  return (
    <group>
      <mesh castShadow position={middle} quaternion={orientation}>
        <cylinderGeometry args={[0.013, 0.013, difference.length(), 12]}/>
        <meshStandardMaterial color="#efe7d3" metalness={0.42} roughness={0.42}/>
      </mesh>
      {[0.08,0.92].map((t,i) => (
        <mesh key={i} position={ZIPLINE_START.clone().lerp(ZIPLINE_END,t)}>
          <sphereGeometry args={[0.024,10,8]}/>
          <meshStandardMaterial color="#d7c6a6" metalness={0.35} roughness={0.45}/>
        </mesh>
      ))}
    </group>
  );
}

function ZiplineRider({ progressRef }) {
  const rig = useRef();
  const target = useMemo(()=>new THREE.Vector3(),[]);
  useFrame(({ clock }, delta)=>{
    if (!rig.current) return;
    const values = progressRef?.current ?? { progress:0, pointerX:0, pointerY:0 };
    const t = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp(values.progress,0,1),0,1
    );
    target.copy(ZIPLINE_START).lerp(ZIPLINE_END,t);
    target.y += Math.sin(clock.elapsedTime * 3.1 + t*4) * 0.014;
    rig.current.position.lerp(target, 1 - Math.exp(-Math.min(delta,0.07)*5.7));
    rig.current.rotation.z = THREE.MathUtils.damp(rig.current.rotation.z,-0.13 + t * .12,4,delta);
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y,values.pointerX*.12,3,delta);
  });
  return (
    <group ref={rig} position={ZIPLINE_START}>
      {/* Trolley, hanging ropes, visible safety harness */}
      <mesh castShadow position={[0,0,0]}>
        <boxGeometry args={[.24,.13,.17]}/>
        <meshStandardMaterial color="#c4baa7" metalness={.57} roughness={.34}/>
      </mesh>
      <mesh position={[0,-.08,.11]}>
        <torusGeometry args={[.11,.021,8,16]}/>
        <meshStandardMaterial color="#e7d9ba" metalness={.32} roughness={.58}/>
      </mesh>
      {[-.11,.11].map((x,i)=>(
        <mesh key={i} castShadow position={[x,-.30,0]}>
          <cylinderGeometry args={[.012,.012,.46,8]}/>
          <meshStandardMaterial color="#e1d0a4" roughness={.75}/>
        </mesh>
      ))}
      <mesh castShadow position={[0,-.43,.012]}>
        <sphereGeometry args={[.135,18,14]}/>
        <meshStandardMaterial color="#eee8d7" roughness={.6}/>
      </mesh>
      <mesh position={[0,-.465,.135]}>
        <sphereGeometry args={[.088,14,12]}/>
        <meshStandardMaterial color="#c39470" roughness={.9}/>
      </mesh>
      <mesh castShadow position={[0,-.74,0]}>
        <capsuleGeometry args={[.155,.29,6,12]}/>
        <meshStandardMaterial color="#d4ad6f" roughness={.93}/>
      </mesh>
      {/* Raised arms hold the hanging handle */}
      {[-1,1].map((side,i)=>(
        <group key={i}>
          <mesh castShadow position={[side*.19,-.63,.06]} rotation={[0,0,-side*.55]}>
            <capsuleGeometry args={[.045,.25,5,10]}/>
            <meshStandardMaterial color="#c39470" roughness={.9}/>
          </mesh>
          <mesh castShadow position={[side*.085,-.33,.08]}>
            <sphereGeometry args={[.052,10,8]}/>
            <meshStandardMaterial color="#c39470" roughness={.91}/>
          </mesh>
          <mesh castShadow position={[side*.095,-1.08,0]} rotation={[0,0,side*.24]}>
            <capsuleGeometry args={[.065,.32,5,12]}/>
            <meshStandardMaterial color="#3e665a" roughness={.96}/>
          </mesh>
          <mesh castShadow position={[side*.16,-1.30,.095]}>
            <boxGeometry args={[.19,.075,.23]}/>
            <meshStandardMaterial color="#544b3d" roughness={.95}/>
          </mesh>
        </group>
      ))}
      {/* Dark climbing harness distinguishes the rider from a decorative figurine */}
      <mesh castShadow position={[0,-.91,.02]}>
        <torusGeometry args={[.16,.025,10,20]}/>
        <meshStandardMaterial color="#424d46" roughness={.82}/>
      </mesh>
      <mesh castShadow position={[0,-.79,.15]} rotation={[.1,0,0]}>
        <boxGeometry args={[.18,.055,.04]}/>
        <meshStandardMaterial color="#424d46" roughness={.84}/>
      </mesh>
    </group>
  );
}

function GardenSwing() {
  const timber = '#997758';
  return (
    <group position={[1.19,-.43,1.2]} scale={.7}>
      <mesh castShadow position={[-.48,.85,0]} rotation={[0,0,-.13]}>
        <cylinderGeometry args={[.045,.058,1.8,8]}/><meshStandardMaterial color={timber} roughness={1}/>
      </mesh>
      <mesh castShadow position={[.48,.85,0]} rotation={[0,0,.13]}>
        <cylinderGeometry args={[.045,.058,1.8,8]}/><meshStandardMaterial color={timber} roughness={1}/>
      </mesh>
      <mesh castShadow position={[0,1.73,0]} rotation={[0,0,Math.PI/2]}>
        <cylinderGeometry args={[.06,.06,1.23,8]}/><meshStandardMaterial color={timber} roughness={1}/>
      </mesh>
      {[-.3,.3].map(x=><mesh key={x} position={[x,.97,.04]}>
        <cylinderGeometry args={[.012,.012,1.31,6]}/><meshStandardMaterial color="#e7dbb4" metalness={.1} roughness={.83}/>
      </mesh>)}
      <mesh castShadow position={[0,.32,.04]}>
        <boxGeometry args={[.79,.075,.34]}/><meshStandardMaterial color="#b98b5a" roughness={.92}/>
      </mesh>
    </group>
  );
}

function Meadow() {
  const instance = useRef();
  React.useEffect(() => {
    if (!instance.current) return;
    const dummy = new THREE.Object3D();
    const count = instance.current.count;
    for (let i=0; i<count; i++) {
      const angle = i * 2.399963;
      const radius = Math.sqrt((i+.5)/count) * 2.34;
      dummy.position.set(Math.cos(angle)*radius, -.416, Math.sin(angle)*radius);
      dummy.rotation.set(0, angle, Math.sin(i*8.17)*.12);
      const h = .7+(i%6)*.13;
      dummy.scale.set(.67,h,.67);
      dummy.updateMatrix();
      instance.current.setMatrixAt(i,dummy.matrix);
    }
    instance.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={instance} args={[null,null,205]}>
      <coneGeometry args={[.032,.18,3]}/>
      <meshStandardMaterial color="#85a56c" roughness={1} side={THREE.DoubleSide}/>
    </instancedMesh>
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

function Island({ progressRef }) {
  const world = useRef();
  const specks = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    x: Math.sin(i * 1.92) * (1.25 + (i % 7) * 0.29),
    y: 1.7 + (i % 9) * 0.22,
    z: Math.cos(i * 1.26) * (0.8 + (i % 5) * 0.29),
    size: 0.011 + (i % 3) * 0.007,
  })), []);

  useFrame(({ clock, camera }, delta) => {
    if (!world.current) return;
    const t = clock.getElapsedTime();
    const state = progressRef?.current ?? { progress: 0, pointerX: 0, pointerY: 0 };
    const progress = THREE.MathUtils.clamp(state.progress, 0, 1);
    const desiredY = -.27 + progress * .72 + state.pointerX * .12;
    const desiredX = .075 + Math.sin(progress * Math.PI) * .05 - state.pointerY * .038;
    const pulse = 1 + Math.sin(progress*Math.PI)*.115;
    world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, desiredY, 3.2, delta);
    world.current.rotation.x = THREE.MathUtils.damp(world.current.rotation.x, desiredX, 3.2, delta);
    world.current.position.y = -.25 + Math.sin(t*.6)*.035;
    const newScale = THREE.MathUtils.damp(world.current.scale.x, pulse, 2.2, delta);
    world.current.scale.setScalar(newScale);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 6.9 - progress*.78, 1.7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 4.35 - Math.sin(progress*Math.PI)*.2, 1.7, delta);
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
      <Meadow />
      <ZiplineTower />
      <ZiplineTower landing />
      <ZiplineCable />
      <ZiplineRider progressRef={progressRef} />
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

function Scene({ progressRef }) {
  return (
    <>
      <ambientLight intensity={1.75} color="#fff4dc" />
      <hemisphereLight intensity={1.3} color="#ecf3dc" groundColor="#85684e" />
      <directionalLight castShadow position={[3.5, 8, 5]} intensity={3.2} color="#ffe7b6" shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-far={22} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
      <pointLight position={[-5, 3, -2]} intensity={1.1} color="#c3eed2" />
      <Float speed={1.0} floatIntensity={0.04} rotationIntensity={0.015}>
        <Island progressRef={progressRef} />
      </Float>
      <ContactShadows opacity={0.21} scale={9} blur={2.3} far={4.5} resolution={256} color="#1c2a1b" position={[0, -1.73, 0]} />
    </>
  );
}

export default function OrchardScene({ progressRef }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="hero-3d-fallback" aria-label="Zipline adventure photograph" />;
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [6.9, 4.35, 8.65], fov: 33, near: 0.1, far: 100 }}
      shadows
      dpr={[1, 1.7]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
      onError={() => setFailed(true)}
      aria-label="Scroll-controlled 3D zipline adventure at Kumar Agro Tourism"
    >
      <Scene progressRef={progressRef} />
    </Canvas>
  );
}
