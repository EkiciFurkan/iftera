'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface IfGoButtonProps {
  onClick: () => void;
}

export default function IfGoButton({ onClick }: IfGoButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed z-50 bottom-8 right-8 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Neon Pulse Effect */}
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
        
        {/* Button Content */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-black border-2 border-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-purple-900/50" />
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Rocket className="w-8 h-8 text-white mb-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] font-bold text-white tracking-widest drop-shadow-[0_0_5px_rgba(59,130,246,1)]">
              IF GO
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
