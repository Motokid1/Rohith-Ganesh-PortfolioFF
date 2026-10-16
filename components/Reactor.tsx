'use client';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import * as THREE from 'three';
import { projects } from '../data/content';
import { disciplineProjects } from '../data/disciplines';
import { casePath } from '../data/routes';

const disciplines = [
  {
    name: 'Artificial Intelligence',
    short: 'AI systems',
    note: 'Intelligence grounded in useful evidence.',
  },
  {
    name: 'Agentic AI & MCP',
    short: 'Agents & MCP',
    note: 'Tools and workflows, connected with intent.',
  },
  {
    name: 'Cloud & DevOps',
    short: 'Cloud & DevOps',
    note: 'Infrastructure and deployment paths you can inspect.',
  },
  {
    name: 'Full-Stack Development',
    short: 'Digital products',
    note: 'Complete interfaces, APIs and application workflows.',
  },
  {
    name: 'Data Intelligence',
    short: 'Data intelligence',
    note: 'Validated analytics and audience insights.',
  },
  {
    name: 'Backend & Security',
    short: 'Backend & security',
    note: 'Identity, authorization and reliable API boundaries.',
  },
];

function Orbit({
  selected,
  choose,
}: {
  selected: number;
  choose: (n: number) => void;
}) {
  return (
    <group rotation={[0.65, 0.25, -0.38]}>
      {disciplines.map((_, index) => {
        const angle = (index * Math.PI) / 3;
        const active = selected === index;
        return (
          <group key={index} rotation={[0, 0, angle]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                choose(index);
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <torusGeometry
                args={[
                  1.65,
                  active ? 0.085 : 0.062,
                  16,
                  64,
                  Math.PI / 3 - 0.035,
                ]}
              />
              <meshStandardMaterial
                color={active ? '#bd7850' : '#9a6e54'}
                metalness={0.8}
                roughness={0.22}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Sculpture({
  selected,
  choose,
  reduced,
}: {
  selected: number;
  choose: (n: number) => void;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = reduced
      ? -0.15
      : THREE.MathUtils.damp(
          ref.current.rotation.y,
          -0.15 + pointer.x * 0.16,
          3,
          delta,
        );
    ref.current.rotation.x = reduced
      ? 0.08
      : THREE.MathUtils.damp(
          ref.current.rotation.x,
          0.08 - pointer.y * 0.1,
          3,
          delta,
        );
  });
  return (
    <group ref={ref} rotation={[0.08, -0.15, 0]}>
      <mesh rotation={[0.24, 0.22, -0.18]}>
        <torusGeometry args={[0.99, 0.235, 40, 160]} />
        <meshStandardMaterial
          color="#f0ede4"
          metalness={0.04}
          roughness={0.36}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.56, 64, 48]} />
        <meshStandardMaterial
          color="#677e75"
          metalness={0.55}
          roughness={0.36}
        />
      </mesh>
      <mesh rotation={[0.24, 0.22, -0.18]}>
        <torusGeometry args={[0.742, 0.018, 12, 128]} />
        <meshStandardMaterial
          color="#b18a65"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>
      <Orbit selected={selected} choose={choose} />
      <mesh rotation={[1.25, -0.65, 0.45]}>
        <torusGeometry args={[1.9, 0.013, 12, 160]} />
        <meshStandardMaterial
          color="#8daba8"
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

class Boundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="reactor-fallback">
        ◈<p>Explore the six disciplines below.</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default function Reactor({
  select,
  onChoose,
}: {
  select: (n: number) => void;
  onChoose?: (n: number) => void;
}) {
  const [selected, setSelected] = useState(1);
  const [reduced, setReduced] = useState(true);
  const choose = (n: number) => {
    setSelected(n);
    onChoose?.(n);
  };
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
      document.body.style.cursor = 'auto';
    };
  }, []);
  return (
    <div className="identity-assembly">
      <div className="reactor-scene">
        <Boundary>
          <Canvas
            camera={{ position: [0.2, 1.1, 6.7], fov: 35 }}
            dpr={[1, 1.5]}
            aria-label="Sculptural porcelain gyroscope with a mineral core and six selectable copper segments"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 5, 5]} intensity={2.5} />
            <directionalLight
              position={[-4, 2, -2]}
              color="#b3c8cd"
              intensity={3}
            />
            <Suspense fallback={null}>
              <Sculpture
                selected={selected}
                choose={choose}
                reduced={reduced}
              />
              <Environment resolution={128} frames={1}>
                <Lightformer
                  intensity={2.2}
                  position={[-3, 3, 4]}
                  scale={[6, 6, 1]}
                  rotation={[0, 0.6, 0]}
                />
                <Lightformer
                  intensity={2}
                  position={[4, 0, 2]}
                  scale={[2, 5, 1]}
                  rotation={[0, -1, 0]}
                />
                <Lightformer
                  intensity={1.4}
                  position={[0, 4, -3]}
                  scale={[5, 2, 1]}
                  rotation={[Math.PI / 2, 0, 0]}
                />
              </Environment>
              <ContactShadows
                position={[0, -2.25, 0]}
                opacity={0.13}
                scale={7}
                blur={3.5}
                far={4}
                resolution={128}
                frames={1}
              />
            </Suspense>
          </Canvas>
        </Boundary>
      </div>
      <div
        className="reactor-labels"
        aria-label="Select an engineering discipline"
      >
        {disciplines.map((d, i) => (
          <button
            key={d.name}
            aria-label={d.name}
            aria-pressed={selected === i}
            onClick={() => choose(i)}
          >
            <span>0{i + 1}</span>
            {d.short}
            <i />
          </button>
        ))}
      </div>
      <div className="reactor-selection" aria-live="polite">
        <div>
          <span className="eyebrow">Discipline 0{selected + 1}</span>
          <strong>{disciplines[selected].name}</strong>
          <p>{disciplines[selected].note}</p>
        </div>
        <button
          onClick={() => select(selected)}
          aria-label={`Explore ${disciplines[selected].name} projects`}
        >
          <ArrowUpRight size={20} />
        </button>
      </div>
      <div className="reactor-proof-links">
        <span>Connected work</span>
        {disciplineProjects[selected].slice(0, 3).map((id) => (
          <Link key={id} href={casePath(id)}>
            {projects.find((p) => p.id === id)?.title} ↗
          </Link>
        ))}
      </div>
    </div>
  );
}
