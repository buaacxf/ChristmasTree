import React, { useState, useEffect } from 'react';
import { Scene } from './components/Scene';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-screen relative bg-black">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between p-12">
        {/* Top Header */}
        <div className="text-center animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C2] to-[#D4AF37] font-[Playfair+Display] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            Happy New Year
          </h1>
          <h2 className="text-8xl md:text-9xl font-bold text-[#FFD700] font-[Cinzel] mt-2 drop-shadow-[0_0_25px_rgba(255,215,0,0.8)] tracking-widest">
            2026
          </h2>
        </div>

        {/* Bottom Message */}
        <div className="text-center opacity-80 mb-8">
           <p className="text-[#A7F3D0] text-lg font-[Playfair+Display] tracking-[0.2em] uppercase">
             May your year be as bright as gold
           </p>
        </div>
      </div>
      
      {/* Loading/Interaction Tip (optional, hidden after interaction often, but here just static) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
        <div className="text-[#3b5c4d] text-xs font-mono">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default App;
