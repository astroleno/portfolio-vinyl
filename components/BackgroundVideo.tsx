import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundVideoProps {
  videoUrl: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoUrl }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={videoUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }} // Reduced opacity for background feel
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            className="w-full h-full object-cover filter brightness-50 contrast-125 grayscale-[0.3]"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </AnimatePresence>
      {/* Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
      {/* Vignette */}
      <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
    </div>
  );
};