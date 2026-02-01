import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Starfield from './Starfield';
import Planet from './Planet';
import SpaceStation from './SpaceStation';

// Planet positions along the Z axis (camera travels through)
export const PLANET_POSITIONS = {
  start: 0,
  earth: -100,
  mars: -250,
  venus: -400,
  saturn: -550,
  station: -700,
  end: -800,
};

interface CameraControllerProps {
  scrollProgress: number;
  isLaunched: boolean;
}

const CameraController = forwardRef<THREE.PerspectiveCamera, CameraControllerProps>(
  ({ scrollProgress, isLaunched }, ref) => {
    const { camera } = useThree();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useImperativeHandle(ref, () => cameraRef.current as THREE.PerspectiveCamera);

    useEffect(() => {
      if (cameraRef.current) {
        camera.position.copy(cameraRef.current.position);
      }
    }, [camera]);

    useFrame(() => {
      if (!cameraRef.current || !isLaunched) return;

      // Calculate camera position based on scroll
      const startZ = PLANET_POSITIONS.start;
      const endZ = PLANET_POSITIONS.end;
      const targetZ = startZ + (endZ - startZ) * scrollProgress;

      // Smooth camera movement
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        targetZ,
        0.05
      );

      // Slight camera sway for immersion
      const time = Date.now() * 0.001;
      cameraRef.current.position.x = Math.sin(time * 0.5) * 0.5;
      cameraRef.current.position.y = Math.cos(time * 0.3) * 0.3;
    });

    return (
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 30]}
        fov={75}
        near={0.1}
        far={2000}
      />
    );
  }
);

CameraController.displayName = 'CameraController';

interface SpaceSceneProps {
  scrollProgress: number;
  isLaunched: boolean;
  warpSpeed: number;
}

const SpaceScene = ({ scrollProgress, isLaunched, warpSpeed }: SpaceSceneProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[100, 100, 100]} intensity={1} color="#ffffff" />
        <pointLight position={[-100, -100, -100]} intensity={0.5} color="#00ffff" />

        {/* Camera */}
        <CameraController 
          scrollProgress={scrollProgress} 
          isLaunched={isLaunched}
        />

        {/* Starfield */}
        <Starfield count={8000} speed={warpSpeed} />

        {/* Planets */}
        {isLaunched && (
          <>
            {/* Earth - Education */}
            <Planet
              position={[15, 0, PLANET_POSITIONS.earth]}
              color="#4a9eff"
              size={8}
              name="Earth"
              emissive="#2266aa"
              emissiveIntensity={0.4}
            />

            {/* Mars - Certifications */}
            <Planet
              position={[-12, -5, PLANET_POSITIONS.mars]}
              color="#d4663b"
              size={6}
              name="Mars"
              emissive="#993322"
              emissiveIntensity={0.3}
            />

            {/* Venus - Projects */}
            <Planet
              position={[10, 8, PLANET_POSITIONS.venus]}
              color="#e8c547"
              size={7}
              name="Venus"
              emissive="#aa8833"
              emissiveIntensity={0.4}
            />

            {/* Saturn - About Me */}
            <Planet
              position={[-15, 0, PLANET_POSITIONS.saturn]}
              color="#d4a574"
              size={10}
              name="Saturn"
              hasRings={true}
              emissive="#886644"
              emissiveIntensity={0.3}
            />

            {/* Space Station - Contact */}
            <SpaceStation position={[0, 0, PLANET_POSITIONS.station]} />
          </>
        )}

        {/* Fog for depth */}
        <fog attach="fog" args={['#000510', 100, 500]} />
      </Canvas>
    </div>
  );
};

export default SpaceScene;
