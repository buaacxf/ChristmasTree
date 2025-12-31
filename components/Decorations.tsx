import React, { useMemo } from 'react';
import { COLORS } from '../constants';
import * as THREE from 'three';

// --- Apple ---
export const Apple: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => {
  return (
    <group position={position} scale={scale}>
      {/* Fruit Body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={COLORS.red} 
          roughness={0.2} 
          metalness={0.1} 
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#3F2E18" />
      </mesh>
    </group>
  );
};

// --- Orange ---
export const Orange: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[0.32, 16, 16]} />
      <meshStandardMaterial 
        color={COLORS.orange} 
        roughness={0.6} 
        metalness={0.0}
        map={null} // In a real app, a normal map for peel texture would be great
      />
    </mesh>
  );
};

// --- Gift Box ---
export const GiftBox: React.FC<{ position: [number, number, number]; rotation: [number, number, number]; scale: number }> = ({ position, rotation, scale }) => {
  const color = useMemo(() => Math.random() > 0.5 ? COLORS.red : COLORS.gold, []);
  
  return (
    <group position={position} rotation={rotation} scale={scale * 1.5}>
      {/* Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Horizontal Ribbon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial color={COLORS.ribbon} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Vertical Ribbon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.42, 0.42]} />
        <meshStandardMaterial color={COLORS.ribbon} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

// --- Top Star ---
export const StarTop: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Glowing Core */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color={COLORS.gold} 
          emissive={COLORS.gold}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Metallic Outer Spikes */}
      <mesh rotation={[0, Math.PI / 4, 0]} scale={1.5}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color={COLORS.goldMetallic} 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>
      <pointLight color={COLORS.gold} intensity={3} distance={10} decay={2} />
    </group>
  );
};

// --- Generic Bauble (Gold Sphere) ---
export const Bauble: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial 
        color={COLORS.goldMetallic} 
        metalness={0.95} 
        roughness={0.05} 
        envMapIntensity={2}
      />
    </mesh>
  );
};
