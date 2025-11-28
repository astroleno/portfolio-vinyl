
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { TRACKS } from './constants';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Vinyl } from './components/Vinyl';
import { Tonearm } from './components/Tonearm';
import { MobileFallback } from './components/MobileFallback';
import { ChevronDown, Disc, Pause, Play } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Track Selection Logic ---
  // 0.0 - 0.15: Hero Section
  // 0.15 - 1.0: Track Scrolling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolling(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 500); // Wait a bit before "playing"

    if (latest < 0.15) return;

    const totalTracks = TRACKS.length;
    // Map the remaining 85% of scroll to the tracks
    const progressInTrackZone = (latest - 0.15) / 0.85;
    const rawIndex = Math.floor(progressInTrackZone * totalTracks);
    const safeIndex = Math.min(Math.max(rawIndex, 0), totalTracks - 1);
    
    if (safeIndex !== currentTrackIndex) {
      setCurrentTrackIndex(safeIndex);
    }
  });

  const currentTrack = TRACKS[currentTrackIndex];
  const isSideB = currentTrackIndex >= 6;
  const trackIndexInSide = currentTrackIndex % 6;
  
  // --- View State Logic ---
  const [viewState, setViewState] = useState<'hero' | 'player'>('hero');
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.1 && viewState === 'hero') setViewState('player');
    if (latest <= 0.1 && viewState === 'player') setViewState('hero');
  });

  return (
    <div ref={containerRef} className="relative bg-[#050505] min-h-[1200vh]">
      
      {/* Background Video Layer */}
      <BackgroundVideo videoUrl={currentTrack.video} />
      
      {/* Hero Background Overlay (Hides video in hero state) */}
      <div 
        className={`fixed inset-0 z-10 bg-[#080808] transition-opacity duration-1000 pointer-events-none ${viewState === 'hero' ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
        <div className="flex items-center gap-2">
           <Disc className={`w-6 h-6 ${!isScrolling && viewState === 'player' ? 'animate-spin-slow' : ''}`} />
           <span className="font-bold tracking-widest text-lg uppercase">Neon Drift</span>
        </div>
        <div className="text-xs font-mono opacity-70 hidden md:block">
          {viewState === 'hero' ? 'SCROLL TO START' : 'SCROLL TO BROWSE'}
        </div>
      </nav>

      {/* Main Sticky Area */}
      <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center z-20 pointer-events-none overflow-hidden">
        
        {/* HERO TEXT - Fades out quickly */}
        <motion.div 
          className="absolute inset-x-0 top-[15%] flex flex-col items-center justify-center z-10 text-center px-4"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: viewState === 'hero' ? 1 : 0,
            y: viewState === 'hero' ? 0 : -100,
            scale: viewState === 'hero' ? 1 : 0.9
          }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Sonic <br/> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Ritual</span>
          </h1>
          <p className="text-sm md:text-lg max-w-md text-gray-400 font-mono mb-16 tracking-wide">
            A curated collection of auditory experiences.
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} className="text-white/30" />
          </motion.div>
        </motion.div>

        {/* VINYL & PLAYER CONTAINER */}
        <div className="relative z-20 flex items-center justify-center w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] md:pointer-events-auto">
           {/* 
              The Vinyl component handles its own 3D rotation based on viewState.
              isPlaying prop triggers the continuous spin of the texture.
           */}
           <Vinyl 
              currentTrackIndex={currentTrackIndex} 
              tracks={TRACKS} 
              viewState={viewState}
              isPlaying={!isScrolling && viewState === 'player'}
           />
           
           {/* TONEARM (Desktop) */}
           <AnimatePresence>
             {viewState === 'player' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ zIndex: 40 }}
                >
                  <Tonearm 
                     trackIndexInSide={trackIndexInSide} 
                     active={!isScrolling}
                  />
                </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* TRACK INFO (Desktop) */}
        <div className={`hidden md:flex fixed bottom-12 right-12 flex-col items-end text-right transition-all duration-700 ${viewState === 'player' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl font-black font-mono text-white/20">{(currentTrackIndex + 1).toString().padStart(2, '0')}</span>
          </div>
          <h2 className="text-6xl font-black mb-2 tracking-tighter uppercase">{currentTrack.title}</h2>
          <p className="text-2xl text-gray-300 font-light mb-6 tracking-widest uppercase">{currentTrack.artist}</p>
          
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
             <span className="text-white">{currentTrack.duration}</span>
             <span className="w-px h-3 bg-white/20"></span>
             <span className={isSideB ? "text-blue-400" : "text-red-400"}>{isSideB ? 'SIDE B' : 'SIDE A'}</span>
             <span className="w-px h-3 bg-white/20"></span>
             <span className="flex items-center gap-2">
               {!isScrolling ? <Play size={10} className="fill-green-400 text-green-400"/> : <Pause size={10} />}
               <span className={!isScrolling ? "text-green-400" : ""}>{!isScrolling ? 'PLAYING' : 'SEEKING'}</span>
             </span>
          </div>
        </div>

      </div>

      {/* Mobile Fallback List */}
      <MobileFallback 
        tracks={TRACKS} 
        currentTrackIndex={currentTrackIndex} 
        isPlaying={!isScrolling}
        onTrackSelect={(index) => setCurrentTrackIndex(index)}
      />

    </div>
  );
};

export default App;
