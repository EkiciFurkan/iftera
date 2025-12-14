'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Gamepad2, ChevronLeft, Users, User, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { games, GameCategory } from './data';

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

interface GameTileProps {
    isExpanded: boolean;
    onToggle: () => void;
    direction: number;
}

export default function GameTile({ isExpanded, onToggle }: GameTileProps) {
    const [view, setView] = useState<'cover' | 'categories' | 'games'>('cover');
    const [activeTab, setActiveTab] = useState<GameCategory>('Bireysel');
    const [slideDirection, setSlideDirection] = useState(0);

    // Filter games based on active tab
    const filteredGames = games.filter(g => g.category === activeTab);

    // Reset state when closed logic might be handled by parent, but here we manage internal view
    // Note: 'isExpanded' prop is less relevant now as we don't expand, but we might want to reset if parent closes menu

    const handleStart = () => {
        setSlideDirection(1);
        setView('categories');
    };

    const handleCategorySelect = (category: GameCategory) => {
        setSlideDirection(1);
        setActiveTab(category);
        setView('games');
    };

    const handleBackToCategories = () => {
        setSlideDirection(-1);
        setView('categories');
    };

    const handleBackToCover = () => {
        setSlideDirection(-1);
        setView('cover');
    };

    return (
        <motion.div
            layout
            className="col-span-2 row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl relative overflow-hidden flex flex-col pt-0 pb-0 min-h-[300px]"
        >
            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                {view === 'cover' ? (
                    <motion.div
                        key="cover"
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col pt-6 px-6 cursor-pointer group"
                        onClick={handleStart}
                    >
                        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
                            CANLI
                        </div>

                        <div className="flex flex-col h-full relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Gamepad2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white leading-tight mb-2">Oyunlar</h3>
                            <p className="text-orange-100 text-sm font-medium mb-4 max-w-[200px]">Hedefi vur, birayı kap! 🍺</p>

                            <div className="flex-1" />

                            <div className="relative w-[calc(100%+3rem)] -mx-6 h-20 overflow-hidden mt-2 bg-black/20 backdrop-blur-sm border-t border-white/10">
                                <div className="absolute inset-0 flex items-center">
                                    <motion.div
                                        className="flex gap-4 pr-4"
                                        animate={{ x: "-50%" }}
                                        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                                    >
                                        {[...Array(2)].map((_, setIndex) => (
                                            <div key={setIndex} className="flex gap-4">
                                                {games.slice(0, 8).map((g, i) => (
                                                    <GameIcon key={i} color={g.color} icon={g.icon} />
                                                ))}
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : view === 'categories' ? (
                    <motion.div
                        key="categories"
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col p-6"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={handleBackToCover}
                                className="p-2 bg-black/20 rounded-full hover:bg-black/30 text-white transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-white font-bold text-xl">Mod Seç</span>
                        </div>

                        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                            <SmallCategoryCard
                                title="Bireysel"
                                icon={<User className="w-6 h-6" />}
                                color="from-cyan-500 to-blue-600"
                                onClick={() => handleCategorySelect('Bireysel')}
                            />
                            <SmallCategoryCard
                                title="Ekip"
                                icon={<Users className="w-6 h-6" />}
                                color="from-purple-500 to-pink-600"
                                onClick={() => handleCategorySelect('Ekip')}
                            />
                            <SmallCategoryCard
                                title="IF Sokak Özel"
                                icon={<QrCode className="w-6 h-6" />}
                                color="from-orange-500 to-red-600"
                                onClick={() => handleCategorySelect('IF Sokak Özel')}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="games"
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex flex-col p-6"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={handleBackToCategories}
                                className="p-2 bg-black/20 rounded-full hover:bg-black/30 text-white transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-white font-bold text-xl">{activeTab}</span>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-1 custom-scrollbar pb-2">
                            {filteredGames.map((game, index) => (
                                <GameItem key={index} {...game} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const SmallCategoryCard = ({ title, icon, color, onClick }: any) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 bg-gradient-to-br ${color} shadow-lg w-full text-left`}
    >
        <div className="bg-white/20 p-2 rounded-xl text-white">
            {icon}
        </div>
        <span className="text-white font-bold text-lg">{title}</span>
        <ChevronLeft className="w-5 h-5 text-white/50 ml-auto rotate-180" />
    </motion.button>
);

const GameItem = ({ icon, name, color }: { icon: string, name: string, color: string }) => (
    <div className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl bg-black/20 hover:bg-black/30 transition-all cursor-pointer group hover:-translate-y-1">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-xl mb-1 shadow-lg group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <span className="text-[10px] text-white font-medium text-center leading-tight w-full truncate">{name}</span>
    </div>
);

function GameIcon({ color, icon }: { color: string, icon: string }) {
    return (
        <div className={`w-12 h-12 rounded-full ${color} shadow-lg shadow-black/20 flex items-center justify-center border-2 border-white/20 relative overflow-hidden flex-shrink-0`}>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full" />
            <span className="text-2xl relative z-10 drop-shadow-md">{icon}</span>
        </div>
    );
}
