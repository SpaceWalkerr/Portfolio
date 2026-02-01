import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpaceStation = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }
  });

  // Create glow texture
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(0.4, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group position={position}>
      {/* Central glow */}
      <sprite scale={[30, 30, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent={true}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <group ref={groupRef}>
        {/* Central hub */}
        <mesh>
          <cylinderGeometry args={[3, 3, 4, 8]} />
          <meshStandardMaterial
            color="#1a3a4a"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Rotating ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[8, 0.5, 8, 32]} />
          <meshStandardMaterial
            color="#0a2030"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Solar panels */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 10,
              0,
              Math.sin(angle) * 10
            ]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[6, 0.1, 3]} />
            <meshStandardMaterial
              color="#1a1a3a"
              emissive="#4444ff"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Antenna */}
        <mesh position={[0, 4, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
          <meshStandardMaterial
            color="#333"
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 6.5, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Docking ports */}
        {[0, Math.PI].map((angle, i) => (
          <mesh
            key={`dock-${i}`}
            position={[
              Math.cos(angle) * 3.5,
              0,
              Math.sin(angle) * 3.5
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[1, 1.2, 2, 8]} />
            <meshStandardMaterial
              color="#1a2a3a"
              emissive="#00aaff"
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default SpaceStation;
