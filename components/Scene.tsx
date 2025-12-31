import React from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera, 
  MeshReflectorMaterial, 
  Float
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { ChristmasTree } from './Tree';
import { Fireflies } from './Fireflies';
import { COLORS } from '../constants';

export const Scene: React.FC = () => {
  return (
    <Canvas shadows="soft" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[8, 4, 12]} fov={50} />
      
      {/* --- Controls --- */}
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enablePan={false} 
        maxPolarAngle={Math.PI / 1.8} // Don't go below ground
        minPolarAngle={Math.PI / 6}
      />

      {/* --- Environment & Lighting --- */}
      <color attach="background" args={['#010a05']} />
      <fog attach="fog" args={['#010a05', 5, 30]} />
      
      <ambientLight intensity={0.2} />
      
      {/* Key Light for warmth */}
      <spotLight 
        position={[10, 20, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
        color="#FFFAF0"
      />

      {/* Fill Light for Emeralds */}
      <pointLight position={[-10, 5, -10]} intensity={1} color="#c2f2d0" />

      {/* Backlight for Rim */}
      <spotLight position={[0, 10, -10]} intensity={5} color={COLORS.gold} />

      {/* HDR Environment for Metallic Reflections */}
      <Environment preset="city" />

      {/* --- Objects --- */}
      
      {/* Floating Tree Logic */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <ChristmasTree />
      </Float>

      {/* Floor */}
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#05100a"
          metalness={0.5}
          mirror={1} // Mirror 1 = perfect reflection, but combined with roughness
        />
      </mesh>

      {/* Ambience */}
      <Fireflies count={80} color={COLORS.gold} />
      <Fireflies count={40} color="#ffffff" />

      {/* --- Post Processing for "Cinematic" feel --- */}
      <EffectComposer enableNormalPass={false}>
        {/* Glow effect */}
        <Bloom 
          luminanceThreshold={0.5} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.6}
        />
        {/* Cinematic darkening of corners */}
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  );
};