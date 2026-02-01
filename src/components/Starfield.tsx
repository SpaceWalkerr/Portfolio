import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  speed?: number;
}

const Starfield = ({ count = 5000, speed = 0 }: StarfieldProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a cylinder around the path
      const radius = 50 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 2000;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = z;

      // Color variation - mostly white with some blue/cyan tints
      const colorChoice = Math.random();
      if (colorChoice > 0.9) {
        // Cyan stars
        colors[i * 3] = 0.5;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice > 0.8) {
        // Gold stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 0.4;
      } else {
        // White stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current && speed > 0) {
      // Move stars toward camera to create warp effect
      const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        positionArray[i * 3 + 2] += speed * delta * 100;
        
        // Reset stars that pass the camera
        if (positionArray[i * 3 + 2] > camera.position.z + 100) {
          positionArray[i * 3 + 2] = camera.position.z - 1000;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Starfield;
