import React from 'react';
import { Track } from '../constants';
import { Play, Pause } from 'lucide-react';

interface MobileFallbackProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}

export const MobileFallback: React.FC<MobileFallbackProps> = ({ tracks, currentTrackIndex, isPlaying, onTrackSelect }) => {
  return (
    <div className="w-full pb-20 px-4 md:hidden z-40 relative mt-[400px]">
      <h2 className="text-xl font-bold mb-4 tracking-widest uppercase text-white/60">Playlist</h2>
      <div className="space-y-4">
        {tracks.map((track, idx) => {
          const isActive = idx === currentTrackIndex;
          return (
            <div 
              key={track.id}
              onClick={() => onTrackSelect(idx)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isActive ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-black/40 border border-white/5'}`}
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                {isActive && (
                   <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     {isPlaying ? <Pause size={20} className="fill-white" /> : <Play size={20} className="fill-white" />}
                   </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-base font-semibold truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>{track.title}</h3>
                <p className="text-sm text-gray-500 truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-gray-600 font-mono">{track.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};