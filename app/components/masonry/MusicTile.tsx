'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Music, ChevronLeft, Heart } from 'lucide-react';
import { useState } from 'react';
import { songs } from './data';

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

interface MusicTileProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export default function MusicTile({ isExpanded, onToggle }: MusicTileProps) {
    return (
        <>
            {/* Grid Item */}
            <div className="col-span-2 h-full min-h-[140px]">
                {!isExpanded && (
                    <motion.div
                        layoutId="music-card"
                        variants={itemVariants}
                        initial="visible"
                        animate="visible"
                        onClick={onToggle}
                        className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 relative overflow-hidden group cursor-pointer shadow-xl flex items-center justify-between"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-10">
                            <motion.h3 layoutId="music-title" className="text-2xl font-bold text-white mb-1">Müzik Oylama</motion.h3>
                            <p className="text-blue-100 text-sm">Sıradaki Şarkıyı Seç 🎵</p>
                        </div>
                        <div className="relative z-10">
                            <Music className="w-12 h-12 text-white/90" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Expanded Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={onToggle}
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
                                            onToggle();
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
                            <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-3 custom-scrollbar">
                                {songs.map((song) => (
                                    <SongItem key={song.id} {...song} />
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

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
