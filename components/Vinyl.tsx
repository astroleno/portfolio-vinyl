
import React from 'react';
import { motion } from 'framer-motion';
import { Track } from '../constants';

interface VinylProps {
  currentTrackIndex: number;
  tracks: Track[];
  viewState: 'hero' | 'player';
  isPlaying: boolean;
}

export const Vinyl: React.FC<VinylProps> = ({ currentTrackIndex, tracks, viewState, isPlaying }) => {
  const isSideB = currentTrackIndex >= 6;
  
  return (
    <div className="relative w-full h-full perspective-1000">
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{
          // Hero State:
          // scale: 2.3 -> Very large to create a horizon line effect
          // y: 640 -> Adjusted to find the sweet spot between 550 (too high) and 750 (too low)
          rotateX: viewState === 'hero' ? 60 : 0, 
          rotateY: viewState === 'hero' ? 0 : (isSideB ? 180 : 0),
          rotateZ: 0,
          scale: viewState === 'hero' ? 2.3 : 1,
          y: viewState === 'hero' ? 580 : 0 
        }}
        transition={{
          duration: 1.4,
          type: "spring",
          stiffness: 40,
          damping: 18
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* --- FRONT SIDE (SIDE A) --- */}
        <div 
          className="absolute inset-0 rounded-full shadow-2xl bg-[#0a0a0a]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <VinylFace 
            labelColor="from-red-600 to-red-900" 
            sideLabel="SIDE A" 
            isActiveSide={!isSideB}
            isPlaying={isPlaying && !isSideB && viewState === 'player'}
          />
        </div>

        {/* --- BACK SIDE (SIDE B) --- */}
        <div 
          className="absolute inset-0 rounded-full shadow-2xl bg-[#0a0a0a]" 
          style={{ 
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <VinylFace 
            labelColor="from-cyan-600 to-blue-900" 
            sideLabel="SIDE B" 
            isActiveSide={isSideB}
            isPlaying={isPlaying && isSideB && viewState === 'player'}
          />
        </div>
      </motion.div>
    </div>
  );
};

interface VinylFaceProps {
  labelColor: string;
  sideLabel: string;
  isActiveSide: boolean;
  isPlaying: boolean;
}

const VinylFace: React.FC<VinylFaceProps> = ({ labelColor, sideLabel, isActiveSide, isPlaying }) => {
  return (
    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5">
        {/* --- SPINNING TEXTURE LAYER --- */}
        <motion.div 
            className="absolute inset-0"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
                rotate: {
                    repeat: Infinity, 
                    // EXACT 33 1/3 RPM MATH:
                    // 60 seconds / 33.3333 rotations = 1.818181... seconds per rotation
                    duration: 1.8181, 
                    ease: "linear", 
                    repeatType: "loop"
                },
                default: { duration: 0.5 } 
            }}
            style={{ willChange: 'transform' }}
        >
            {/* Realistic Vinyl Grooves */}
            <div 
                className="absolute inset-[2%] rounded-full opacity-90"
                style={{
                    background: `repeating-radial-gradient(
                    #111 0, 
                    #111 2px, 
                    #222 3px, 
                    #181818 4px
                    )`
                }}
            />
            
            {/* Anisotropy / Light Sheen */}
            <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay bg-[conic-gradient(transparent_0deg,white_45deg,transparent_90deg,white_135deg,transparent_180deg,white_225deg,transparent_270deg,white_315deg,transparent_360deg)]" />

            {/* Label */}
            <div className={`absolute inset-[33%] rounded-full bg-gradient-to-br ${labelColor} flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] border-4 border-[#111]`}>
                <div className="text-center transform rotate-90 md:rotate-0">
                    <span className="block text-white/90 text-[10px] md:text-xs font-black tracking-widest font-mono">{sideLabel}</span>
                    <span className="block text-white/40 text-[8px] tracking-widest mt-1">NEON DRIFT</span>
                    <span className="block text-white/40 text-[8px] tracking-widest">33 ⅓ RPM</span>
                </div>
                {/* Spindle Hole */}
                <div className="absolute w-3 h-3 bg-[#e5e5e5] rounded-full center-abs shadow-inner border border-gray-400"></div>
            </div>
        </motion.div>

        {/* --- STROBE DOTS (Static overlay on the container edge) --- */}
        <div className="absolute inset-0 rounded-full border-[6px] border-[#1a1a1a] opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
    </div>
  );
};
