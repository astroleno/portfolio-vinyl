
import React from 'react';
import { motion } from 'framer-motion';

interface TonearmProps {
  trackIndexInSide: number; // 0-5
  active: boolean; // Arm down
}

export const Tonearm: React.FC<TonearmProps> = ({ trackIndexInSide, active }) => {
  // Angle Logic:
  // Move INWARD as track number increases.
  // Pivot is at top-right (290, 100).
  // Record is to the left/bottom.
  // Clockwise rotation moves the needle towards the center (leftwards/downwards relative to pivot arc).
  
  // Base Angle (Start of record): 20 degrees
  // Max Angle (End of record): 48 degrees
  const baseAngle = 20;
  const maxAngle = 48;
  const progress = Math.min(trackIndexInSide / 5, 1);
  const targetAngle = baseAngle + (progress * (maxAngle - baseAngle));

  return (
    // Positioning adjustment:
    // Moved closer to the record. 
    // Top: -10% (was -18%) -> moves down
    // Right: -15% (was -25%) -> moves left
    <div className="absolute top-[-10%] right-[-15%] w-[450px] h-[675px] z-30 pointer-events-none hidden md:block">
      <motion.div
        className="w-full h-full drop-shadow-2xl"
        // Use direct animate props to ensure reactivity to targetAngle changes
        animate={{ 
          rotate: active ? targetAngle : 0,
        }}
        initial={{ rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 1
        }}
        style={{ 
          // Accurate pivot point based on SVG coordinates (290, 100) in 400x600 viewBox
          // 290/400 = 72.5%, 100/600 = 16.66%
          transformOrigin: "72.5% 16.66%" 
        }}
      >
        <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
           {/* DEFINITIONS for Gradients */}
           <defs>
             <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#999" />
               <stop offset="50%" stopColor="#fff" />
               <stop offset="100%" stopColor="#999" />
             </linearGradient>
             <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#333" />
               <stop offset="100%" stopColor="#111" />
             </linearGradient>
           </defs>

           {/* --- PIVOT BASE ASSEMBLY (Top Right) --- */}
           {/* Base Circle */}
           <circle cx="290" cy="100" r="50" fill="url(#darkMetal)" stroke="#555" strokeWidth="2" />
           <circle cx="290" cy="100" r="40" fill="#222" />
           {/* Gimbal Structure */}
           <rect x="260" y="70" width="60" height="60" rx="4" fill="url(#chrome)" />
           <circle cx="290" cy="100" r="20" fill="#111" />

           {/* --- COUNTERWEIGHT (Back) --- */}
           <rect x="275" y="10" width="30" height="50" rx="2" fill="#333" stroke="#666" />
           <rect x="280" y="5" width="20" height="10" fill="#111" />

           {/* --- ARM TUBE (S-Shape) --- */}
           {/* Path starting from pivot (290,100) curving down to headshell */}
           <path 
             d="M 290 100 
                C 290 180, 290 250, 200 350
                S 80 450, 60 520" 
             stroke="url(#chrome)" 
             strokeWidth="12" 
             fill="none" 
             strokeLinecap="round" 
           />

           {/* --- HEADSHELL (Front) --- */}
           {/* Attached to end of path (60, 520) */}
           <g transform="translate(60, 520) rotate(15)">
             {/* Connector */}
             <rect x="-6" y="-5" width="12" height="10" fill="#666" />
             {/* Shell Body */}
             <path d="M -15 0 L 15 0 L 12 50 L -12 50 Z" fill="#111" stroke="#444" strokeWidth="1" />
             {/* Finger Lift */}
             <path d="M 12 20 C 25 20, 25 40, 15 40" stroke="#ccc" strokeWidth="3" fill="none" />
             {/* Cartridge */}
             <rect x="-10" y="50" width="20" height="15" fill="#e5e5e5" />
             {/* Stylus (Needle) */}
             <path d="M 0 65 L -2 75 L 2 75 Z" fill="white" />
           </g>
        </svg>
      </motion.div>
    </div>
  );
};
