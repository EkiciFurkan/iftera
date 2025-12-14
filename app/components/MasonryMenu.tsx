'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Music, Gamepad2, Camera, Gift, User, X } from 'lucide-react';

interface MasonryMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const containerVariants = {
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

const itemVariants = {
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

export default function MasonryMenu({ isOpen, onClose }: MasonryMenuProps) {
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
                        {/* KUTU A: Music Voting (Wide) */}
                        <motion.div
                            variants={itemVariants}
                            className="col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10 flex items-center justify-between h-full">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Müzik Oylama</h3>
                                    <p className="text-blue-100 text-sm">Sıradaki Şarkıyı Seç 🎵</p>
                                </div>
                                <Music className="w-12 h-12 text-white/90" />
                            </div>
                        </motion.div>

                        {/* KUTU B: Game & Arcade (Tall) */}
                        <motion.div
                            variants={itemVariants}
                            className="row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                CANLI
                            </div>
                            <div className="mt-4">
                                <Gamepad2 className="w-12 h-12 text-white mb-4" />
                                <h3 className="text-xl font-bold text-white leading-tight">Oyna &<br />Kazan</h3>
                            </div>
                            <p className="text-orange-100 text-xs mt-2">Hedefi vur, birayı kap! 🍺</p>
                        </motion.div>

                        {/* KUTU C: Video & Stage (Square) */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-lime-500 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
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

                        {/* KUTU E: Profile (Small Horizontal) */}
                        <motion.div
                            variants={itemVariants}
                            className="col-span-2 bg-neutral-900 border border-neutral-700 rounded-2xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Pars</h4>
                                    <span className="text-neutral-400 text-xs">5. Seviye Müdavim</span>
                                </div>
                            </div>
                            <div className="h-2 w-20 bg-neutral-700 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-indigo-500" />
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
