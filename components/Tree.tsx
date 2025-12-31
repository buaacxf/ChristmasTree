import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TIERS, COLORS, DECORATION_DENSITY } from '../constants';
import { Apple, Orange, GiftBox, Bauble, StarTop } from './Decorations';
import { OrnamentData } from '../types';
import * as THREE from 'three';

export const ChristmasTree: React.FC = () => {
  const treeRef = useRef<THREE.Group>(null);

  // Generate ornaments positions based on cone surface
  const ornaments = useMemo(() => {
    const items: OrnamentData[] = [];
    
    TIERS.forEach((tier, tierIndex) => {
      const tierHeight = tier.height;
      const count = Math.floor(tierHeight * DECORATION_DENSITY * (tier.radiusBottom + tier.radiusTop) / 2);
      
      for (let i = 0; i < count; i++) {
        // Random height within this tier
        const h = Math.random() * tierHeight;
        // Calculate radius at this height (linear interpolation)
        const rRatio = 1 - (h / tierHeight);
        const rAtH = tier.radiusTop + (tier.radiusBottom - tier.radiusTop) * rRatio;
        
        // Random angle
        const theta = Math.random() * Math.PI * 2;
        
        // Slightly randomized offset from surface (to bury them slightly or stick out)
        const rOffset = rAtH - 0.2 + (Math.random() * 0.3);

        const x = rOffset * Math.cos(theta);
        const z = rOffset * Math.sin(theta);
        const y = tier.yPos - (tier.height / 2) + h; // Adjust for tier center

        // Determine Type
        const rand = Math.random();
        let type: OrnamentData['type'] = 'bauble';
        if (rand < 0.25) type = 'apple';
        else if (rand < 0.45) type = 'orange';
        else if (rand < 0.65) type = 'gift';

        // Rotate gifts to align somewhat with normal or just random tumble
        const rotation: [number, number, number] = [
          Math.random() * 0.5, 
          theta + Math.PI / 2, // Face outward
          Math.random() * 0.5
        ];

        items.push({
          id: `tier-${tierIndex}-${i}`,
          type,
          position: [x, y, z],
          rotation,
          scale: 0.8 + Math.random() * 0.4,
        });
      }
    });
    return items;
  }, []);

  return (
    <group ref={treeRef} position={[0, -2, 0]}>
      {/* Tree Foliage Layers */}
      {TIERS.map((tier, i) => (
        <mesh 
          key={i} 
          position={[0, tier.yPos, 0]} 
          castShadow 
          receiveShadow
        >
          <cylinderGeometry args={[tier.radiusTop, tier.radiusBottom, tier.height, 32]} />
          <meshStandardMaterial 
            color={COLORS.emerald}
            roughness={0.8}
            metalness={0.1}
            flatShading={false}
          />
        </mesh>
      ))}

      {/* Ornaments */}
      {ornaments.map((data) => {
        switch (data.type) {
          case 'apple':
            return <Apple key={data.id} position={data.position} scale={data.scale} />;
          case 'orange':
            return <Orange key={data.id} position={data.position} scale={data.scale} />;
          case 'gift':
            return <GiftBox key={data.id} position={data.position} rotation={data.rotation} scale={data.scale} />;
          case 'bauble':
          default:
            return <Bauble key={data.id} position={data.position} scale={data.scale} />;
        }
      })}

      {/* Top Star */}
      <StarTop position={[0, 9, 0]} />

      {/* Trunk */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1.2, 3, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={1} />
      </mesh>
    </group>
  );
};
