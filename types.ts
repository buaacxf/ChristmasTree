export type DecorationType = 'apple' | 'orange' | 'gift' | 'bauble';

export interface OrnamentData {
  id: string;
  type: DecorationType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface TreeTier {
  radiusBottom: number;
  radiusTop: number;
  height: number;
  yPos: number;
  segments: number;
}
