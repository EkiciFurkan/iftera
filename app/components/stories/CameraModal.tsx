'use client';

import { motion } from 'framer-motion';
import { X, Camera, RefreshCw, Zap } from 'lucide-react';

interface CameraModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTag: string;
}

export default function CameraModal({ isOpen, onClose, activeTag }: CameraModalProps) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col pt-safe-top pb-safe-bottom"
        >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={onClose} className="text-white p-2">
                    <X className="w-8 h-8" />
                </button>
                <div className="bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                    <span className="text-white font-bold">{activeTag}</span>
                    <span className="text-white/70 text-sm ml-1">için çek</span>
                </div>
                <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Camera Viewport (Simulated) */}
            <div className="flex-1 relative bg-neutral-800 overflow-hidden m-0">
                {/* Simulated Camera Feed */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Camera className="w-24 h-24 text-white/20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 mix-blend-overlay" />

                {/* Flash/Settings mock */}
                <div className="absolute right-4 top-20 flex flex-col gap-6">
                    <button className="flex flex-col items-center gap-1 text-white">
                        <Zap className="w-6 h-6" />
                        <span className="text-[10px]">Flash</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white">
                        <span className="font-bold border border-white rounded-full w-6 h-6 flex items-center justify-center text-[10px]">1x</span>
                        <span className="text-[10px]">Zoom</span>
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="h-32 bg-black flex items-center justify-around px-8 pb-4">
                <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-neutral-600 border-2 border-white/50" />
                </button>

                <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative touch-manipulation active:scale-95 transition-transform">
                    <div className="w-16 h-16 rounded-full bg-white" />
                </button>

                <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                    <RefreshCw className="w-6 h-6" />
                </button>
            </div>
        </motion.div>
    );
}
