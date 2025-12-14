'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Music, Gamepad2, Camera, Gift, User, X, ChevronLeft, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

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

const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
    exit: { y: 50, opacity: 0, scale: 0.8 },
};

const slideVariants: Variants = {
    initial: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    }),
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
        setDirection(isMusicMode ? -1 : 1);
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

    const games = [
        { name: 'Tetris', icon: '🧱', color: 'bg-cyan-500' },
        { name: 'Yılan', icon: '🐍', color: 'bg-green-500' },
        { name: 'Pacman', icon: '👻', color: 'bg-yellow-400' },
        { name: 'Kartlar', icon: '🃏', color: 'bg-red-500' },
        { name: '2048', icon: '🔢', color: 'bg-orange-500' },
        { name: 'Satranç', icon: '♟️', color: 'bg-neutral-600' },
        { name: 'Dama', icon: '⚪', color: 'bg-purple-500' },
        { name: 'Sudoku', icon: '📝', color: 'bg-blue-500' },
        { name: 'Pinball', icon: '🎱', color: 'bg-pink-500' },
    ];

    const songs = [
        { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', votes: 24 },
        { id: 2, title: 'Levitating', artist: 'Dua Lipa', votes: 18 },
        { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', votes: 15 },
        { id: 4, title: 'As It Was', artist: 'Harry Styles', votes: 12 },
        { id: 5, title: 'Flowers', artist: 'Miley Cyrus', votes: 9 },
    ];
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
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
                        className="w-full max-w-md grid grid-cols-2 gap-4 auto-rows-[minmax(100px,auto)]"
                    >
                        {/* KUTU A: Music Voting (Wide) - Grid Item or Placeholder */}
                        <div className="col-span-2 h-full min-h-[140px]">
                            {/* We keep the space occupied, but render the card conditionally for layoutId transition */}
                            {!isMusicMode && (
                                <motion.div
                                    layoutId="music-card"
                                    variants={itemVariants}
                                    initial="visible"
                                    animate="visible"
                                    onClick={toggleMusicMode}
                                    className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 relative overflow-hidden group cursor-pointer shadow-xl"
                                >
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                                    <div className="relative z-10 flex items-center justify-between h-full">
                                        <div>
                                            <motion.h3 layoutId="music-title" className="text-2xl font-bold text-white mb-1">Müzik Oylama</motion.h3>
                                            <p className="text-blue-100 text-sm">Sıradaki Şarkıyı Seç 🎵</p>
                                        </div>
                                        <Music className="w-12 h-12 text-white/90" />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* KUTU B: Game & Arcade (Tall) */}
                        {/* KUTU B: Game & Arcade (Tall) */}
                        <motion.div
                            variants={itemVariants}
                            className="row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl relative overflow-hidden flex flex-col pt-0 pb-0"
                        >
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                {!isGameMode ? (
                                    <motion.div
                                        key="default"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute inset-0 flex flex-col pt-6 px-6 cursor-pointer group"
                                        onClick={toggleGameMode}
                                    >
                                        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
                                            CANLI
                                        </div>

                                        <div className="flex flex-col h-full relative z-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Gamepad2 className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white leading-tight mb-2">Oyna &<br />Kazan</h3>
                                            <p className="text-orange-100 text-xs font-medium mb-4">Hedefi vur, birayı kap! 🍺</p>

                                            {/* Spacer to push marquee to bottom */}
                                            <div className="flex-1" />

                                            {/* Auto-Scrolling Marquee at Bottom */}
                                            <div className="relative w-[calc(100%+3rem)] -mx-6 h-16 overflow-hidden mt-2 bg-black/20 backdrop-blur-sm border-t border-white/10">
                                                <div className="absolute inset-0 flex items-center">
                                                    <motion.div
                                                        className="flex gap-3 pr-3"
                                                        animate={{ x: "-50%" }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                            duration: 10
                                                        }}
                                                    >
                                                        {[...Array(2)].map((_, setIndex) => (
                                                            <div key={setIndex} className="flex gap-3">
                                                                <GameIcon color="bg-green-500" icon="🎮" />
                                                                <GameIcon color="bg-blue-500" icon="👾" />
                                                                <GameIcon color="bg-red-500" icon="🎯" />
                                                                <GameIcon color="bg-yellow-400" icon="🎲" />
                                                                <GameIcon color="bg-purple-500" icon="🕹️" />
                                                                <GameIcon color="bg-pink-500" icon="🎰" />
                                                                <GameIcon color="bg-cyan-500" icon="🎳" />
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="games"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute inset-0 p-4 flex flex-col"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <button
                                                onClick={toggleGameMode}
                                                className="p-1.5 bg-black/20 rounded-full hover:bg-black/30 text-white transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <span className="text-white font-bold text-lg">Oyunlar</span>
                                        </div>

                                        {/* 3x3 Grid */}
                                        <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
                                            {games.map((game, index) => (
                                                <GameItem key={index} {...game} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* KUTU C: Video & Stage (Square) */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-green-500 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                        >
                            <Camera className="w-10 h-10 text-black mb-2 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-black font-bold text-lg text-center leading-none">Ekrana<br />Yansıt</h3>
                        </motion.div>

                        {/* KUTU D: Wallet & Deals (Square) */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-yellow-400 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rotate-45" />
                            <Gift className="w-10 h-10 text-black mb-2" />
                            <h3 className="text-black font-bold text-lg text-center leading-none">Benim<br />Kuponum</h3>
                            <span className="absolute top-2 right-2 text-[10px] bg-white px-1.5 py-0.5 rounded text-black font-bold transform rotate-6">
                                1 HEDİYE
                            </span>
                        </motion.div>

                        {/* KUTU E: Profile Stats (Square) */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral-900 border border-neutral-700 rounded-3xl p-4 flex flex-col justify-between group cursor-pointer hover:border-neutral-500 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-indigo-500/20 rounded-xl">
                                    <User className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div className="text-right">
                                    <h4 className="text-white font-bold text-lg">Pars</h4>
                                    <span className="text-neutral-400 text-xs">Müdavim</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white block">2,450</span>
                                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">Puan Kazanıldı</span>
                            </div>
                        </motion.div>

                        {/* KUTU F: Avatar & Store (Square) */}
                        <motion.div
                            variants={itemVariants}
                            onClick={onProfileClick}
                            className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] border border-white/10 rounded-3xl p-0 relative overflow-hidden group cursor-pointer"
                        >
                            {/* Avatar Visual */}
                            <div className="absolute inset-x-0 bottom-0 h-3/4 flex justify-center items-end group-hover:scale-110 transition-transform duration-300">
                                <svg viewBox="0 0 200 200" className="w-32 h-32 drop-shadow-2xl">
                                    <circle cx="100" cy="90" r="50" fill="#f3d0b2" />
                                    <rect x="60" y="140" width="80" height="60" rx="20" fill="#333" />
                                </svg>
                            </div>

                            {/* Text / CTA */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                                    Mağaza
                                </span>
                            </div>
                        </motion.div>

                        {/* Expanded Music Player Overlay */}
                        {isMusicMode && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                    onClick={toggleMusicMode}
                                />
                                <motion.div
                                    layoutId="music-card"
                                    className="fixed top-[15%] left-[5%] right-[5%] w-[90%] md:w-[70%] md:left-[15%] h-[70vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden z-50 flex flex-col shadow-2xl"
                                >
                                    {/* Expanded Header */}
                                    <div className="p-6 pb-2 flex items-center justify-between bg-gradient-to-b from-purple-900/50 to-transparent">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMusicMode();
                                                }}
                                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <div>
                                                <motion.h3 layoutId="music-title" className="text-2xl font-bold text-white leading-none">Müzik Oylama</motion.h3>
                                                <span className="text-sm text-blue-200">Mekanın DJ'i Sensin! 🎧</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Content - Song List */}
                                    <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-3">
                                        {songs.map((song) => (
                                            <SongItem key={song.id} {...song} />
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const GameItem = ({ icon, name, color }: { icon: string, name: string, color: string }) => (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xl mb-1 shadow-lg group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <span className="text-[10px] text-white font-medium text-center leading-tight">{name}</span>
    </div>
);

const SongItem = ({ title, artist, votes }: { title: string, artist: string, votes: number }) => {
    const [voted, setVoted] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                    <Music className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg leading-tight mb-1">{title}</h4>
                    <p className="text-white/50 text-sm">{artist}</p>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setVoted(!voted);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${voted ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                <span className="text-sm font-bold">{votes + (voted ? 1 : 0)}</span>
                <Heart className={`w-5 h-5 ${voted ? 'fill-current' : ''}`} />
            </button>
        </div>
    );
};

function GameIcon({ color, icon }: { color: string, icon: string }) {
    return (
        <div className={`w-10 h-10 rounded-full ${color} shadow-lg shadow-black/20 flex items-center justify-center border-2 border-white/20 relative overflow-hidden flex-shrink-0`}>
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full" />
            <span className="text-lg relative z-10 drop-shadow-md">{icon}</span>
        </div>
    );
}
