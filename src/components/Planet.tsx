import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size?: number;
  name: string;
  hasRings?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
}

const Planet = ({ 
  position, 
  color, 
  size = 5, 
  name, 
  hasRings = false,
  emissive,
  emissiveIntensity = 0.3
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);

  // Create procedural texture for planet surface
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, new THREE.Color(color).multiplyScalar(0.8).getStyle());
    gradient.addColorStop(1, new THREE.Color(color).multiplyScalar(0.6).getStyle());
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add noise/texture
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const radius = Math.random() * 10 + 2;
      const opacity = Math.random() * 0.3;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [color]);

  // Glow sprite texture
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, new THREE.Color(color).getStyle());
    gradient.addColorStop(0.4, new THREE.Color(color).multiplyScalar(0.5).getStyle());
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.02;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Planet glow */}
      <sprite ref={glowRef} scale={[size * 3, size * 3, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Main planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={emissive || color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Saturn's rings */}
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
          <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.6}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;
