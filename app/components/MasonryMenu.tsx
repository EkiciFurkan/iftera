'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import GameTile from './masonry/GameTile';
import MusicTile from './masonry/MusicTile';
import { ScreenCastTile, CouponTile, ProfileTile, AvatarStoreTile } from './masonry/InfoTiles';

interface MasonryMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onProfileClick?: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export default function MasonryMenu({ isOpen, onClose, onProfileClick }: MasonryMenuProps) {
    const [isGameMode, setIsGameMode] = useState(false);
    const [isMusicMode, setIsMusicMode] = useState(false);
    const [direction, setDirection] = useState(0);

    const toggleGameMode = () => {
        setDirection(isGameMode ? -1 : 1);
        setIsGameMode(!isGameMode);
    };

    const toggleMusicMode = () => {
        setIsMusicMode(!isMusicMode);
    };

    // Reset state when menu closes
    useEffect(() => {
        if (!isOpen) {
            setIsGameMode(false);
            setIsMusicMode(false);
            setDirection(0);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-y-auto"
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="fixed top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <X className="w-8 h-8 text-white" />
                    </motion.button>

                    {/* Grid Container */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-md grid grid-cols-2 gap-4 auto-rows-[minmax(100px,auto)] pb-20 pt-10"
                    >
                        {/* Music Tile (Full Width) */}
                        <MusicTile isExpanded={isMusicMode} onToggle={toggleMusicMode} />

                        {/* Game Tile (Full Width, Taller) */}
                        <GameTile isExpanded={isGameMode} onToggle={toggleGameMode} direction={direction} />

                        {/* Middle Row */}
                        <ScreenCastTile />
                        <CouponTile />

                        {/* Bottom Row */}
                        <ProfileTile />
                        <AvatarStoreTile onClick={onProfileClick} />

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
